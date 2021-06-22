package com.free.payload.request.guest;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class GuestImageLikeRequest {

    @NotBlank
    private String userId;

    @NotBlank
    private Long guestImageId;
}
