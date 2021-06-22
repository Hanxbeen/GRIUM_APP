package com.free.authsvr.payload.response.relation;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Builder
public class RelationForResponse {
    private long relationId;
    private UUID concernUid;
    private String name;
    private String relationName;
}
