package com.free.payload.response.dead;

import com.free.payload.response.ApiResponse;
import lombok.Builder;

public class DeadAllInfoResponse extends ApiResponse<DeadAllInfo> {

    @Builder
    public DeadAllInfoResponse(final String msg, final DeadAllInfo data) {
        super(msg, data);
    }
}
