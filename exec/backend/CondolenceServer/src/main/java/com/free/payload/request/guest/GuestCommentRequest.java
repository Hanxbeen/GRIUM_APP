package com.free.payload.request.guest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GuestCommentRequest {

    private String userId;
    private Long guestCommentId;
    private String contents;

}
