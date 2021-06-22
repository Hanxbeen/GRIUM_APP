package com.free.authsvr.payload.request.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class KakaoInfo {
    private String nickname;
    private String profile_image;
    private String thumbnail_image;
}
