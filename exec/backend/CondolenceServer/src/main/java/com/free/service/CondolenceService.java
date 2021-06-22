package com.free.service;

import com.free.entity.key.CondolenceId;
import com.free.payload.request.condolence.CondolenceRequest;
import com.free.payload.response.condolence.CondolenceInfoResponse;

import java.util.UUID;

public interface CondolenceService {

    boolean checkCondolence(CondolenceId condolenceId);

    int getCondolenceCount(UUID deadId);

    CondolenceInfoResponse addCondolence(CondolenceRequest condolenceRequest);
}
