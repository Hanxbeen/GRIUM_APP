package com.free.authsvr.payload.response.relation;

import com.free.authsvr.payload.response.user.UserForApp;
import com.free.authsvr.payload.response.ApiResponse;
import lombok.Builder;
import lombok.NonNull;

import java.util.List;

public class AvailUserResponse extends ApiResponse<List<UserForApp>> {
    @Builder
    public AvailUserResponse(@NonNull String msg, @NonNull List<UserForApp> data) {
        super(msg, data);
    }
}
