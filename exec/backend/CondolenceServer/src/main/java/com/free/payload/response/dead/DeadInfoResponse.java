package com.free.payload.response.dead;

import com.free.entity.Dead;
import com.free.payload.response.ApiResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class DeadInfoResponse extends ApiResponse<DeadInfo> {

    @Builder
    public DeadInfoResponse(@NonNull String msg, @NonNull DeadInfo data) {
        super(msg, data);
    }
}
