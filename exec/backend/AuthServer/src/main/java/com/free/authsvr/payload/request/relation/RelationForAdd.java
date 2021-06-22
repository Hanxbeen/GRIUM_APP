package com.free.authsvr.payload.request.relation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RelationForAdd {

    private UUID selfUid;
    private UUID concernUid;
    private String relationName;
}
