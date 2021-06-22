package com.free.authsvr.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.free.authsvr.entity.AuthProvider;
import com.free.authsvr.entity.RoleType;
import com.free.authsvr.payload.response.user.AllInfo;
import com.free.authsvr.payload.response.user.UserForApp;
import com.free.authsvr.security.TokenProvider;
import com.free.authsvr.entity.User;
import com.free.authsvr.payload.request.CreateDead;
import com.free.authsvr.payload.request.user.KakaoInfo;
import com.free.authsvr.payload.request.user.LoginInfo;
import com.free.authsvr.payload.request.user.UpdateInfo;
import com.free.authsvr.payload.response.user.SmallUser;
import com.free.authsvr.repository.UserImageRepository;
import com.free.authsvr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserImageRepository userImageRepository;
    private final TokenProvider tokenProvider;
    private final RelationService relationService;

    private static final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

    // 현재 유저 정보
    public UserForApp getCurrentUser(String id) {
        Optional<User> OptionalUser = userRepository.findById(UUID.fromString(id));
        return OptionalUser.map(this::UserToUserForApp).orElse(null);
    }

    // userList
    public List<User> getUserList(List<String> uidList) {
        return userRepository.findAllByIdIn(uidList.stream().map(UUID::fromString).collect(Collectors.toList()));
    }

    // 유저 관련 모든 정보 ( family 관계 , 이미지 사이즈 및 유저 정보 )
    public AllInfo getAllInfo(String uid) {
        UUID uidFromUUID = UUID.fromString(uid);
        Optional<User> user = userRepository.findById(uidFromUUID);
        return user.map(value -> AllInfo.builder()
                .userInfo(value)
                .familyRelationList(relationService.getFamilyList(uid))
                .friendRelationList(relationService.getFriendList(uid))
                .imageSize(userImageRepository.findAllByUid(uidFromUUID).size())
                .build()).orElse(null);
    }

    public UserForApp userLogin(LoginInfo info) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + info.getAccessToken());

        // kakao info
        ResponseEntity<String> response = new RestTemplate().exchange(KAKAO_USER_INFO_URL, HttpMethod.GET, new HttpEntity<>(headers), String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());

        System.out.println(response.getBody());
        String providerId = objectMapper.treeToValue(jsonNode.path("id"), String.class);
        System.out.println("ProviderId : " + providerId);

        KakaoInfo properties = objectMapper.treeToValue(jsonNode.path("properties"), KakaoInfo.class);
        System.out.println("Properties : " + properties.toString());

        // user 조회
        User user = userRepository.findByProviderId(providerId);
        boolean newUserFlag = false;
        if (user == null) { // 유저 등록 및 로그인
            newUserFlag = true;
            System.out.println("hi");
            user = User.builder()
                    .provider(AuthProvider.kakao)
                    .providerId(providerId)
                    .name(properties.getNickname())
                    .accessToken(info.getAccessToken())
                    .imageUrl(properties.getProfile_image())
                    .roleType(RoleType.USER)
                    .build();

        } else { // 유저 로그인 및 카카오 정보에서 정보업데이트
            user.setImageUrl(properties.getProfile_image());
            user.setAccessToken(info.getAccessToken());
        }
        user = userRepository.save(user); // uid 생성하기 위해서
        if (newUserFlag) {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> status = restTemplate.postForObject(
                    "http://k4c104.p.ssafy.io:8001/dead",
                    CreateDead.builder()
                            .deadId(user.getId().toString())
                            .build(),
                    ResponseEntity.class
            );

            if (status == null) {
                System.out.println("status is null");
            } else if (status.getStatusCode().equals(HttpStatus.OK)) {
                System.out.println("fail : " + user.getId().toString());
            }
        }
        String jwt = tokenProvider.createToken(user.getId().toString(), 0); // jwt 발급
        user.setJwt(jwt);

        userRepository.save(user);


        return UserToUserForApp(user);
    }

    public UserForApp UserToUserForApp(User user) {
        return UserForApp.builder()
                .uid(user.getId())
                .name(user.getName())
                .alarmSetting(user.getAlarmSetting())
                .backgroundMusic(user.getBackgroundMusic())
                .birthday(user.getBirthday())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .jwt(user.getJwt())
                .build();
    }

    public void updateUserInfo(UpdateInfo updateInfo) {
        Optional<User> optionalUser = userRepository.findById(updateInfo.getUid());
        optionalUser.ifPresent(user -> {
            user.setBirthday(updateInfo.getBirthday());
            user.setBirthyear(updateInfo.getBirthyear());
            user.setCommentForCondolence(updateInfo.getCommentForCondolence());

            userRepository.save(user);
        });
    }

    public List<SmallUser> findUserByName(String name) {
        return userRepository.findByNameContaining(name).stream().map(user ->
                SmallUser.builder()
                        .name(user.getName())
                        .id(user.getId())
                        .build()
        ).collect(Collectors.toList());
    }
}
