package com.free.authsvr.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.free.authsvr.entity.User;
import com.free.authsvr.payload.response.user.UserForApp;
import com.free.authsvr.repository.ProposeRepository;
import com.free.authsvr.repository.UserRepository;
import com.free.authsvr.entity.ProposeRelation;
import com.free.authsvr.entity.Relation;
import com.free.authsvr.payload.request.relation.RelationForAdd;
import com.free.authsvr.payload.response.relation.RelationForResponse;
import com.free.authsvr.payload.response.relation.KakaoFriend;
import com.free.authsvr.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RelationService {

    private final RelationRepository relationRepository;
    private final ProposeService proposeService;
    private final UserRepository userRepository;
    private final FriendService friendService;
    private final ProposeRepository proposeRepository;

    private static final String DEAD_AVAILABLE_FAMILY = "http://k4c104.p.ssafy.io:8001/dead/relation";

    public boolean addRelation(RelationForAdd req) {


        ProposeRelation relationAtoB = proposeService.getProposeRelation(req.getSelfUid(), req.getConcernUid());
        ProposeRelation relationBtoA = proposeService.getProposeRelation(req.getConcernUid(), req.getSelfUid());

        Optional<User> sender = userRepository.findById(relationAtoB.getSenderUid());
        Optional<User> receiver = userRepository.findById(relationAtoB.getReceiverUid());

        if (!sender.isPresent() || !receiver.isPresent())
            return false;

        relationRepository.save( // A to B Relation
                Relation.builder()
                        .selfUid(sender.get()) // controller에서 유저값 체크 해서 여기선 안해도 될듯
                        .concernUid(receiver.get())
                        .relationName(relationAtoB.getSenderToReceiver())
                        .build()
        );
        relationRepository.save( // B to A Relation
                Relation.builder()
                        .selfUid(receiver.get())
                        .concernUid(sender.get())
                        .relationName(relationAtoB.getReceiverToSender())
                        .build()
        );

        proposeRepository.delete(relationAtoB);
        proposeRepository.delete(relationBtoA);

        return true;
    }

    public List<RelationForResponse> getFamilyList(String uid) {

        Optional<User> user = userRepository.findById(UUID.fromString(uid));
        if (!user.isPresent())
            return Collections.emptyList();

        List<Relation> familyList = relationRepository.findBySelfUidAndRelationNameIsNot(user.get(), "친구");
        return familyList.stream().map(this::convertToVo).collect(Collectors.toList());
    }

    public List<UserForApp> getAvailRelationList(String uid) throws JsonProcessingException {
        // 카카오 친구리스트 [] -> arrayList , objectMapper 단계에서 바로 List로 받는 방법 찾으면 좋을듯

        UUID uidByUUID = UUID.fromString(uid);
        List<KakaoFriend> friendList = friendService.getAddableFriendList(uidByUUID);
        List<String> providerIdList = friendList.stream().map(friend -> friend.getId()).collect(Collectors.toList());
        // 카카오 친구리스트 -> App User
        List<User> friendListAsUser = userRepository.findAllByProviderIdIn(providerIdList);
//        List<User> friendListAsUser =
//                friendList
//                        .stream()
//                        .map(friend -> userRepository.findAByProviderId(friend.getId()))
//
//                        .collect(Collectors.toList());

        // 유저의 가족관계 리스트

        Optional<User> selfUser = userRepository.findById(UUID.fromString(uid));
        if (!selfUser.isPresent())
            return Collections.emptyList();

        List<User> familyListAsUser =
                relationRepository
                        .findAllBySelfUid(selfUser.get())
                        .stream()
                        .map(Relation::getConcernUid)
                        .collect(Collectors.toList());

        List<User> proposeListAsUserByReceiver = proposeRepository.findAllByReceiverUid(uidByUUID)
                .stream()
                .map(propose -> userRepository.findById(propose.getSenderUid()).orElse(null))
                .collect(Collectors.toList());
        List<User> proposeListAsUserBySender = proposeRepository.findAllBySenderUid(uidByUUID)
                .stream().map(propose -> userRepository.findById(propose.getReceiverUid()).orElse(null))
                .collect(Collectors.toList());


        // 카카오톡 친구 리스트에서 기존 가족관계 리스트 차집합
        List<User> availableFamilyList =
                friendListAsUser.stream()
                        .filter(friend -> !familyListAsUser.contains(friend))
                        .filter(friend -> !proposeListAsUserByReceiver.contains(friend))
                        .filter(friend -> !proposeListAsUserBySender.contains(friend))
                        .collect(Collectors.toList());

//        availableFamilyList.forEach(user ->
//            System.out.println(user.getId().toString())
//        );
        if(availableFamilyList.size()==0){
            return Collections.EMPTY_LIST;
        }
        System.out.println(availableFamilyList.size());
        return availableFamilyList.stream().map(user ->
                UserForApp.builder()
                        .uid(user.getId())
                        .imageUrl(user.getImageUrl())
                        .name(user.getName())
                        .build()
        ).collect(Collectors.toList());
    }

    public boolean deleteFamilyRelation(String uid, String relationId) {
        if (!userRepository.findById(UUID.fromString(uid)).isPresent())
            return false;
        Optional<Relation> relationOptional = relationRepository.findById(Long.parseLong(relationId));
        if (relationOptional.isPresent()) {
            Relation relation = relationOptional.get();
            Relation relationAccros = relationRepository.findBySelfUidAndConcernUid(relation.getConcernUid(), relation.getSelfUid());

            relationRepository.delete(relationAccros);
            relationRepository.deleteById(Long.parseLong(relationId)); // 바로 delete 때려도 되는지 or 객체 찾고 나서 delete 해야하는지
        }
        return true;
    }

    // 친구 목록
    public List<RelationForResponse> getFriendList(String uid) {
        Optional<User> selfUser = userRepository.findById(UUID.fromString(uid));
        return selfUser
                .map(user -> relationRepository.findBySelfUidAndRelationName(user, "친구")
                        .stream().map(this::convertToVo)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    public RelationForResponse convertToVo(Relation relation) {
        return RelationForResponse.builder()
                .relationId(relation.getRelationId())
                .concernUid(relation.getConcernUid().getId())
                .name(relation.getConcernUid().getName())
                .relationName(relation.getRelationName())
                .build();
    }

    public List<RelationForResponse> getAvailDeadList(UUID uid) {
        Optional<User> userOptional = userRepository.findById(uid);
        if (!userOptional.isPresent())
            return null;

        Map<UUID, Relation> familyList =
                relationRepository.findBySelfUidAndRelationNameIsNot(userOptional.get(), "친구")
                        .stream().collect(Collectors.toMap(
                        family -> family.getConcernUid().getId(),
                        family -> family
                ));

        UUID[] uuidList = new RestTemplate().postForObject(DEAD_AVAILABLE_FAMILY, familyList.keySet(), UUID[].class);
        if(uuidList.length == 0){
            return Collections.emptyList();
        }
        return Arrays.stream(uuidList).map(uuid -> convertToVo(familyList.get(uuid))).collect(Collectors.toList());

    }
}
