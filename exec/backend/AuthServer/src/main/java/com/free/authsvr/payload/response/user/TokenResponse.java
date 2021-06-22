package com.free.authsvr.payload.response.user;

import com.free.authsvr.payload.response.ApiResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenResponse extends ApiResponse<String> {

    @Builder
    public TokenResponse(String msg, String token) {
        super(msg, token);
    }
}
