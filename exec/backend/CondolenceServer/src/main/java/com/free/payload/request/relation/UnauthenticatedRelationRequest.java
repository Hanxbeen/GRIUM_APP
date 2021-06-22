package com.free.payload.request.relation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnauthenticatedRelationRequest {
    private Long unauthRelationId;
    private String deadId;
    private String relationName;
    private String name;
}