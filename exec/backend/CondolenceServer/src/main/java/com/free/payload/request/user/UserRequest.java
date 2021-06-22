package com.free.payload.request.user;

import lombok.Getter;

@Getter
public class UserRequest {

    private String name;
    private String birthyear;
    private String birthday;
    private String commentForCondolence; // 유언
    private int imageSize;
}
