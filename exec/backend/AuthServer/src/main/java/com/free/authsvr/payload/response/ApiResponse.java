package com.free.authsvr.payload.response;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public abstract class ApiResponse<T> {
    @NonNull private String msg;
    @NonNull private T data;

}
