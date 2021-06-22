package com.free.service;

import java.util.List;
import java.util.Map;

import com.free.payload.request.relation.UnauthenticatedRelationRequest;

public interface RelationService {

    List<Map<String, Object>> getAllRelationList(String deadId);
    void addUnauthenticatedRelation(UnauthenticatedRelationRequest unauthenticatedRelation);
}
