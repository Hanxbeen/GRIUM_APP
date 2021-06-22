package com.free.payload.response.guest;

import com.free.payload.response.ApiResponse;
import lombok.Builder;

import java.util.List;

public class GuestImageInfoResponse extends ApiResponse<List<GuestImageInfo>> {

    @Builder
    public GuestImageInfoResponse(final String msg, final List<GuestImageInfo> data) {
        super(msg, data);
    }
}
