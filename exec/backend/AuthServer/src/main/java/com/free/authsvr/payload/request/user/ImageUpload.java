package com.free.authsvr.payload.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageUpload {
    private String uid;
    private String contents;
    private String imageUrl;
}
