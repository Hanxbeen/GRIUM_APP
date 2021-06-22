package com.free.authsvr.payload.response.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class ImageForResponse {
    private long imageId;
    private List<String> imageUrl;
    private String createdAt;
    private String contents;
}
