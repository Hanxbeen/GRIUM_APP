package com.free.transactionserver.payload.transaction.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class RelationAllResponse {
    List<Relation> response;

    public RelationAllResponse(){

    }
}
