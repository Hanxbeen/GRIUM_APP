package com.free.payload.request.user;

import lombok.Getter;

import java.util.List;

@Getter
public class UserAllInfoRequest {

    private List<FamilyRelation> familyRelationList;

    private List<FamilyRelation> friendRelationList;

    private UserRequest userInfo;

    private int imageSize;

}
