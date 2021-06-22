package com.free.authsvr.payload.request.user;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ImageDelete {
    private UUID uid;
    private long imageId;

}
