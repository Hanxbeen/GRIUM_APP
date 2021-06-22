package com.free.controller;

import com.free.payload.request.dead.DeadInfoRequest;
import com.free.payload.request.dead.DeadPortraitRequest;
import com.free.payload.request.dead.DeadStatusRequest;
import com.free.payload.request.user.UserInfo;
import com.free.payload.response.dead.*;
import com.free.service.DeadService;
import com.free.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.ResponseEntity.status;


@Tag(name = "Dead", description = "Dead API")
@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("dead")
@Slf4j
public class DeadController {

    private final DeadService deadService;

    private final S3Service s3Service;

    @Operation(summary = "개인공간 정보 ", description = "개인공간 정보 + 관계정보")
    @GetMapping("{deadId}/{userId}")
    public ResponseEntity<DeadInfoResponse> getDeadInfo(@PathVariable String deadId, @PathVariable String userId) {
        log.info("getDeadInfo methods Start");
        DeadInfo deadInfo = deadService.getDeadInfo(deadId, userId);

        return (deadInfo != null) ?
                ResponseEntity.ok(DeadInfoResponse.builder()
                        .msg("success")
                        .data(deadInfo)
                        .build()) : ResponseEntity.noContent().build();
    }

    @Operation(summary = "관리중인 기억공간 리스트 ", description = "개인공간 정보 + 관계정보")
    @GetMapping("manage/{userId}")
    public ResponseEntity<List<DeadManageResponse>> getManageDeadList(@PathVariable String userId) {
        log.info("getDeadInfo methods Start");

        List<DeadManageResponse> manageDeadList = deadService.getManageDeadList(userId);

        return CollectionUtils.isEmpty(manageDeadList) ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(manageDeadList);
    }

    @Operation(summary = "deadInfo 등록 및 수정", description = "userId에 고인등록하는 상주 ID 입력 해야 함.")
    @PutMapping
    public ResponseEntity<DeadInfoResponse> updateDeadInfo(@RequestBody DeadInfoRequest deadInfoRequest) {
        log.info("updateDeadInfo methods Start");

        DeadInfo deadInfo = null;

        try {
            deadInfo = deadService.updateDeadInfo(deadInfoRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException.");
            return status(HttpStatus.NOT_FOUND).build();
        }

        // null 일 경우가 없을 듯?
        return ObjectUtils.isEmpty(deadInfo) ? ResponseEntity.status(HttpStatus.FORBIDDEN).build()
                : ResponseEntity.ok(DeadInfoResponse.builder()
                .msg("success")
                .data(deadInfo)
                .build());
    }

    @Operation(summary = "public & private 수정", description = "userId에 현재 수정하는사람의 userId 입력. & 모든 데이터 다 입력해야함 빈칸x -> 본인/상주만 수정 가능")
    @PutMapping("status")
    public ResponseEntity<DeadStatusResponse> updateDeadStatus(@RequestBody @Valid DeadStatusRequest deadStatusRequest) {
        log.info("updateDeadStatus methods Start");

        DeadStatusResponse deadStatusResponse = null;

        try {
            deadStatusResponse = deadService.updateDeadStatus(deadStatusRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException.");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return ObjectUtils.isEmpty(deadStatusResponse) ? ResponseEntity.status(HttpStatus.FORBIDDEN).build()
                : ResponseEntity.ok(deadStatusResponse);
    }

    @Operation(summary = "portraitUrl 수정", description = "userId에 현재 수정하는사람의 userId 입력. & 모든 데이터 다 입력해야함 빈칸x -> 본인/상주만 수정 가능\n status 415 -> 에러(image확인)")
    @PutMapping("portrait")
    public ResponseEntity<DeadPortraitResponse> updateDeadPortrait(@ModelAttribute DeadPortraitRequest deadStatusRequest) {
        log.info("updateDeadPortrait methods Start");
        final String prePath = "deadimage/" + deadStatusRequest.getDeadId() + "/";

        DeadPortraitResponse deadPortraitResponse = null;
        try {
            String imageUrl = s3Service.upload(prePath, deadStatusRequest.getFile());
            deadStatusRequest.setImageUrl(imageUrl);
            deadPortraitResponse = deadService.updateDeadPortrait(deadStatusRequest);

        } catch (IOException e) {
            e.printStackTrace();
            log.error("이미지 오류.");
            return status(415).build();
        } catch (StringIndexOutOfBoundsException e) {
            e.printStackTrace();
            log.error("이미지 없음.");
            return status(415).build();
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException.");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return ObjectUtils.isEmpty(deadPortraitResponse) ? ResponseEntity.status(HttpStatus.FORBIDDEN).build()
                : ResponseEntity.ok(deadPortraitResponse);
    }

    @Operation(summary = "피드 공개", description = "status 204 -> 데이터 없음.")
    @GetMapping("public")
    public ResponseEntity<UserInfo[]> getPublicDeadList(@RequestParam String userId) {
        log.info("getPublicDeadList methods Start");

        UserInfo[] publicDeadList = deadService.getPublicDeadList(userId);

        return ObjectUtils.isEmpty(publicDeadList) ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(publicDeadList);
    }

    @Operation(summary = "피드 지인", description = "status 204 -> 데이터 없음.")
    @GetMapping("private")
    public ResponseEntity<List<DeadPrivateResponse>> getPrivateDeadList(@RequestParam String userId) {
        log.info("getPrivateDeadList methods Start");

        List<DeadPrivateResponse> privateDeadList = deadService.getPrivateDeadList(userId);

        return CollectionUtils.isEmpty(privateDeadList) ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(privateDeadList);
    }

    @GetMapping("search")
    public ResponseEntity<List<DeadPrivateResponse>> getSearchDead(@RequestParam String name) {
        log.info("getSearchDead methods Start");

        // 입력값 둘 다 null일 때
        if (ObjectUtils.isEmpty(name)) return ResponseEntity.badRequest().build();

        List<DeadPrivateResponse> searchDead = deadService.getSearchDead(name);

        return CollectionUtils.isEmpty(searchDead) ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(searchDead);
    }


}
