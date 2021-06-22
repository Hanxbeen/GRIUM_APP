package com.free.authsvr.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.free.authsvr.payload.request.relation.RelationForAdd;
import com.free.authsvr.payload.response.relation.AvailUserResponse;
import com.free.authsvr.payload.response.relation.RelationForResponse;
import com.free.authsvr.payload.response.relation.RelationResponse;
import com.free.authsvr.payload.response.user.UserForApp;
import com.free.authsvr.service.RelationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Collections;
import java.util.List;
import java.util.UUID;


@RestController
@Tag(name="Relation Controller")
@RequestMapping("/relation")
@RequiredArgsConstructor
public class RelationController {

    private final RelationService relationService;

    @GetMapping("/family") // 현재 연결된 가족관계 리스트
    @Operation(summary = "유저의 가족관계 리스트", description = "현재 유저의 가족관계 리스트 리턴")
    public RelationResponse getMyFamilyList(@RequestParam String uid){
        List<RelationForResponse> familyList = relationService.getFamilyList(uid);
        return RelationResponse.builder()
                .data(familyList)
                .msg("success")
                .build()
                ;
    }

    @GetMapping("/friend")
    @Operation(summary = "유저의 친구관계 리스트", description = "현재 유저의 친구관계 리스트 리턴")
    public RelationResponse getMyFriendList(@RequestParam String uid){
        List<RelationForResponse> friendList = relationService.getFriendList(uid);
        return RelationResponse.builder()
                .data(friendList)
                .msg("success")
                .build()
                ;
    }
    public boolean addRelation(RelationForAdd req){
        return relationService.addRelation(req);
    }

    @GetMapping("/dead")
    @Operation(summary = "고인 등록할 수 있는 가족관계", description = "가족관계 중 고인 등록 할 수 있는 가족")
    public RelationResponse getMyAvailDead(@RequestParam String uid){
        List<RelationForResponse> familyList = relationService.getAvailDeadList(UUID.fromString(uid));
        return RelationResponse.builder()
                .data(familyList)
                .msg("success")
                .build()
                ;
    }

    @GetMapping("/available") // 친구 or 가족 관계 추가 가능한 유저
    @Operation(summary = "관계 추가 가능한 유저", description = "유저의 관계 추가 가능한 모든 카카오톡 친구")
    public AvailUserResponse getAvailProposeList(@RequestParam String uid) throws JsonProcessingException {
        try {
            List<UserForApp> userList = relationService.getAvailRelationList(uid);
            return AvailUserResponse.builder()
                    .data(userList)
                    .msg("success")
                    .build()
                    ;
        }catch(HttpClientErrorException ex){
            return AvailUserResponse.builder()
                    .data(Collections.EMPTY_LIST)
                    .msg("insufficient scopes.")
                    .build();
        }

    }

    @DeleteMapping
    @Operation(summary = "관계 삭제", description = "관계ID로 관계 끊기")
    public ResponseEntity<?> deleteRelation(@RequestParam String uid, @RequestParam String relationId){
            return (
                    relationService.deleteFamilyRelation(uid,relationId) ?
                        ResponseEntity.noContent().build()
                            :
                        ResponseEntity.badRequest().build()
            );
    }

}
