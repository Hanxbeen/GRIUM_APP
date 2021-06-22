package com.free.payload.response.relation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRelationVO {
    private Long relationId;
    private String selfUid;
    private String concernUid;
    private String relationName;
    private String name;
}
