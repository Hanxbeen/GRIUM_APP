package com.free.payload.response.relation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAllInfo {
    List<UserRelationVO> familyRelationList;
    UserInfo userInfo;
}
