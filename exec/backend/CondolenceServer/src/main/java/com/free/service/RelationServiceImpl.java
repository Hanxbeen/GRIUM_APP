package com.free.service;

import java.util.*;

import com.free.entity.Dead;
import com.free.entity.UnauthenticatedRelation;
import com.free.payload.request.relation.UnauthenticatedRelationRequest;
import com.free.payload.response.dead.DeadAllInfo;
import com.free.payload.response.relation.UserAllInfo;
import com.free.payload.response.relation.UserRelationVO;
import com.free.repository.DeadRepository;
import com.free.repository.UnauthenticatedRelationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RelationServiceImpl implements RelationService {

    @Autowired
    UnauthenticatedRelationRepository unAuthenticatedRelationRepository;

    @Autowired
    DeadRepository deadRepository;
    private static final String AUTH_BASE_URL = "http://k4c104.p.ssafy.io:8443";

    @Override
    public List<Map<String, Object>> getAllRelationList(String deadId) {

        try {
            // userRelationVO가져오기
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<UserAllInfo> response = restTemplate
                    .getForEntity(AUTH_BASE_URL + "/user/allinfo?uid=" + deadId, UserAllInfo.class);
            List<UserRelationVO> userRelationList = response.getBody().getFamilyRelationList();
            System.out.println("실행1 size : " + userRelationList.size());
            for (UserRelationVO userRelationVO : userRelationList) {
                System.out.println(userRelationVO.toString());
            }

            // unauthenticatedRelation 가져오기
            Optional<Dead> dead = deadRepository.findByDeadId(UUID.fromString(deadId));
            List<UnauthenticatedRelation> unauthenticatedList = new LinkedList<>();
            if (dead.isPresent()) {
                unauthenticatedList = unAuthenticatedRelationRepository.findAllByDeadId(dead.get().getDeadId());
            }
            
            // 두 정보를 가공하여 하나의 맵 만들어 반환
            List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
            
            for (UserRelationVO urVO : userRelationList) {
                Map<String, Object> map = new HashMap<>();
                map.put("name", urVO.getName());
                map.put("relationName", urVO.getRelationName());
                list.add(map);
            }
            
            for (UnauthenticatedRelation unauthenticatedRelation : unauthenticatedList) {
                Map<String, Object> map = new HashMap<>();
                map.put("name", unauthenticatedRelation.getName());
                map.put("relationName", unauthenticatedRelation.getRelationName());
                list.add(map);
            }

            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void addUnauthenticatedRelation(UnauthenticatedRelationRequest unauthenticatedRelation) {
        UnauthenticatedRelation ur = UnauthenticatedRelation.builder()
                .deadId(UUID.fromString(unauthenticatedRelation.getDeadId())).name(unauthenticatedRelation.getName())
                .relationName(unauthenticatedRelation.getRelationName()).build();

        System.out.println(ur.toString());

        unAuthenticatedRelationRepository.save(ur);

    }

}
