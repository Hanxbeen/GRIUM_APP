package com.free.authsvr.payload.response.user;

import com.free.authsvr.payload.response.ApiResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LogoutResponse extends ApiResponse<String> {

    @Builder
    public LogoutResponse(String msg, String data){
        super(msg,data);
    }

}
