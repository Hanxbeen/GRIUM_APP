package com.free.authsvr.payload.response.user;


import com.free.authsvr.payload.response.ApiResponse;
import lombok.Builder;

public class UserResponse extends ApiResponse<UserForApp> {

    @Builder
    public UserResponse(String msg, UserForApp user){
        super(msg, user);
    }
}
