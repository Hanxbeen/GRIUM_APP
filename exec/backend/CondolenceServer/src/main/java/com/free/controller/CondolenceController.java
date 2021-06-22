package com.free.controller;


import com.free.payload.request.condolence.CondolenceRequest;
import com.free.payload.response.condolence.CondolenceInfoResponse;
import com.free.service.CondolenceService;
import com.free.service.DeadServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.status;

@Tag(name = "Condolence", description = "Condolence API")
@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("condolence")
@Slf4j
public class CondolenceController {

    private final CondolenceService condolenceService;

    private final DeadServiceImpl deadService;

    @Operation(summary = "애도해요", description = "status 404 -> 오류(deadId 확인), 201 성공.")
    @PostMapping
    public ResponseEntity<CondolenceInfoResponse> addCondolence(@RequestBody CondolenceRequest condolenceRequest) {
        log.info("addCondolence methods Start");

        // 유효성 검사
        if (ObjectUtils.isEmpty(deadService.getDeadAll(condolenceRequest.getDeadId())))
            return status(HttpStatus.NOT_FOUND).build();
        else
            return status(HttpStatus.CREATED).body(condolenceService.addCondolence(condolenceRequest));

    }

}
