package com.free.authsvr.payload.response.user;

import com.free.authsvr.entity.User;
import com.free.authsvr.payload.response.relation.RelationForResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Builder
public class AllInfo {
    List<RelationForResponse> familyRelationList;
    List<RelationForResponse> friendRelationList;
    User userInfo;
    int imageSize;

}
