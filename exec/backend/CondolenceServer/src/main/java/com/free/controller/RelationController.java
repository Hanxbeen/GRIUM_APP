package com.free.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.free.payload.request.relation.UnauthenticatedRelationRequest;
import com.free.service.RelationServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@Tag(name = "DeadRelation", description = "DeadRelation API")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RequestMapping("relation")
public class RelationController {
    
    @Autowired
    RelationServiceImpl relationService;

    @Operation(summary = "기억관리 관계자 리스트 받아오기", description = "dead_id를 통해 모든 관계의 list를 반환")
    @GetMapping("/all/{dead_id}")
    public ResponseEntity<Map<String, Object>> getAllRelationList(@PathVariable("dead_id") String deadId){
        System.out.println(deadId);
        try {
            List<Map<String, Object>> list = relationService.getAllRelationList(deadId);
            Map<String, Object> result = new HashMap<>();
            result.put("response", list);
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "인증되지 않은 관계자 추가", description = "인증되지 않는 관계자를 추가하기 위한 api")
    @PostMapping("/unauthenticated")
    public ResponseEntity<?> addUnauthenticatedRelation(@RequestBody UnauthenticatedRelationRequest unauthenticatedRelation){
        System.out.println(unauthenticatedRelation.toString());
        try {
            relationService.addUnauthenticatedRelation(unauthenticatedRelation);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
}
