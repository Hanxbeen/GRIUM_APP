package com.free.payload.request.guest;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class GuestCommentLikeRequest {
    @NotBlank
    private String userId;

    @NotBlank
    private Long guestCommentId;

}
