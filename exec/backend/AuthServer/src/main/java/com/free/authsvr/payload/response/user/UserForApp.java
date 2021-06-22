package com.free.authsvr.payload.response.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class UserForApp {

    private UUID uid;
    private String name;
    private String email;
    private String imageUrl;
    private String birthday;
    private String backgroundMusic;
    private String alarmSetting;
    private String jwt;
}
