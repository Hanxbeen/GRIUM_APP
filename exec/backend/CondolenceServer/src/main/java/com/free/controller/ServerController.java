package com.free.controller;

import com.free.payload.request.dead.DeadRequest;
import com.free.payload.response.dead.DeadAllInfo;
import com.free.payload.response.dead.DeadAllInfoResponse;
import com.free.service.DeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Server Controller (서버 호출 함수)", description = "Server API")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RequestMapping("dead")
@Slf4j
public class ServerController {

    private final DeadService deadService;

    @Operation(summary = "서버 호출 함수", description = "회원가입 시 dead정보 생성")
    @PostMapping
    public ResponseEntity<?> addDeadInfo(@RequestBody DeadRequest deadRequest) {
        log.info("addDeadInfo methods Start");
        deadService.addDeadInfo(deadRequest.getDeadId());

        return ResponseEntity.status(200).build();
    }

    @Operation(summary = "서버호출함수 (dead table 정보)")
    @GetMapping("/info/{deadId}")
    public ResponseEntity<DeadAllInfoResponse> getDeadAll(@PathVariable String deadId) {
        log.info("getDeadAll methods Start");
        DeadAllInfo deadAllInfo = deadService.getDeadAll(deadId);

        return ObjectUtils.isEmpty(deadAllInfo) ? ResponseEntity.noContent().build() :
                ResponseEntity.ok(DeadAllInfoResponse.builder()
                        .msg("success")
                        .data(deadAllInfo)
                        .build());
    }

    @Operation(summary = "서버호출함수 (dead table 정보)")
    @PostMapping("/relation")
    public ResponseEntity<?> changeUserList(@RequestBody List<String> userIdList) {
        log.info("changeUserList methods Start");

        List<String> userList= deadService.changeUserList(userIdList);

        return ResponseEntity.ok(userList);
    }

}
