package com.free.authsvr.payload.response.relation;


import com.free.authsvr.payload.response.ApiResponse;
import lombok.Builder;
import lombok.NonNull;

import java.util.List;

public class RelationResponse extends ApiResponse<List<RelationForResponse>> {

    @Builder
    public RelationResponse(@NonNull String msg, @NonNull List<RelationForResponse> data) {
        super(msg, data);
    }

//    private UUID uid;
}
