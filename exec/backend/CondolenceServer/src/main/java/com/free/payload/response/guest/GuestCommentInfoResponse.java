package com.free.payload.response.guest;

import com.free.payload.response.ApiResponse;
import lombok.Builder;

import java.util.List;

public class GuestCommentInfoResponse extends ApiResponse<List<GuestCommentInfo>> {

    @Builder
    public GuestCommentInfoResponse(final String msg, final List<GuestCommentInfo> data) {
        super(msg, data);
    }
}
