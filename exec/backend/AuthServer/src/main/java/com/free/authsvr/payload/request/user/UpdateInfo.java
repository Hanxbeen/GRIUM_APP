package com.free.authsvr.payload.request.user;

import lombok.Getter;

import java.util.UUID;

@Getter
public class UpdateInfo {
    private UUID uid;
    private String birthday;
    private String birthyear;
    private String commentForCondolence;
}
