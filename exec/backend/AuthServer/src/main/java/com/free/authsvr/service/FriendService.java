package com.free.authsvr.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.free.authsvr.entity.User;
import com.free.authsvr.payload.response.relation.KakaoFriend;
import com.free.authsvr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RequiredArgsConstructor
@Service
public class FriendService {

    public final UserRepository userRepository;
    private static final String KAKAO_FRIENDS_URL = "https://kapi.kakao.com/v1/api/talk/friends";

    // 친구 추가 가능 목록
    public List<KakaoFriend> getAddableFriendList(UUID uid) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        if(!userRepository.findById(uid).isPresent()) // ## 없을 떄 응답 정해야함
            return null;

        User user = userRepository.findById(uid).orElse(null);
        assert user != null;
        headers.set("Authorization", "Bearer " + user.getAccessToken()); // accessToken 삽입

        // kakao friends list
        ResponseEntity<String> response = new RestTemplate().exchange(KAKAO_FRIENDS_URL, HttpMethod.GET, new HttpEntity<>(headers), String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        System.out.println(response.getBody());
        // 카카오 친구리스트 [] -> arrayList , objectMapper 단계에서 바로 List로 받는 방법 찾으면 좋을듯
        return new ArrayList<>(Arrays.asList(objectMapper.treeToValue(jsonNode.path("elements"), KakaoFriend[].class)));
    }

    // 친구 목록


    // 친구 신청
}
