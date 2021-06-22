package com.free.authsvr.payload.response.relation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoFriend {
    private String profile_nickname;
    private String profile_thumbnail_image;
    private String id;
    private String uuid;
    private boolean favorite;
}
