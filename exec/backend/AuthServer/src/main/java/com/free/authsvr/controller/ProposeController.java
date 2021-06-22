package com.free.authsvr.controller;

import com.free.authsvr.payload.response.propose.ProposeForResponse;
import com.free.authsvr.service.ProposeService;
import com.free.authsvr.payload.request.relation.RelationForAdd;
import com.free.authsvr.payload.request.relation.RelationRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/propose")
@Tag(name="Propose Controller")
@RequiredArgsConstructor
public class ProposeController {

    private final ProposeService proposeService;
    private final RelationController relationController;


    @PostMapping
    @Operation(summary = "관계 신청", description = "유저에게 유저로 관계 추가")
    public ResponseEntity<String> addPropose(@RequestBody RelationRequest req){
        // case 1 : 신청 후 성공, 상호 관계 설정 성공
        // case 2 : 신청 후 성공, 상호 관계 설정 안됨
        // case 3 : 신청 실패
        System.out.println(req.getSenderId());
        if(proposeService.addPropose(req)){
            if (proposeService.checkCrossPropose(req.getSenderId(), req.getReceiverId())) { //case 1
                if(relationController.addRelation(RelationToFamilyRequest(req)))
                    return ResponseEntity.ok("Relation connect success");
                else
                    return ResponseEntity.ok("Relation connect fail");
            } else { // case 2
                return ResponseEntity.ok("add Propose success");
            }
        }else{ // case 3
            return ResponseEntity.ok("Fail add Propose");
        }
    }

    public RelationForAdd RelationToFamilyRequest(RelationRequest req){
        return RelationForAdd.builder()
                .selfUid(req.getSenderId())
                .concernUid(req.getReceiverId())
                .build();
    }

    // 신청 내역 가져오기
    @GetMapping
    @Operation(summary = "관계 신청 내역", description = "관계 신청 내역 보여줌 ( 이미 성사된 관계는 보여지지 않음 )")
    public ResponseEntity<List<ProposeForResponse>> getMyProposes(@RequestParam String receiverUid){
        List<ProposeForResponse> proposeList = proposeService.getProposes(UUID.fromString(receiverUid));
        return ResponseEntity.ok(proposeList);
    }
}
