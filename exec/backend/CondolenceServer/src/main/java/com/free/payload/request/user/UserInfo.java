package com.free.payload.request.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInfo {

    private String id;

    private String name;

    private String imageUrl;

    private boolean progressCheck;

}
