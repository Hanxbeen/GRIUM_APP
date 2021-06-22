package com.free.payload.response.dead;

import com.free.entity.Relation;
import com.free.payload.request.user.FamilyRelation;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeadInfo {

    private UUID deadId;
    private String name;
    private String imprintDate; // 발인일
    private String deceasedDate; // 별세일
    private boolean progressCheck;
    private String murmurName; // 빈소명
    private String murmurAddress;
    private String murmurLat;
    private String murmurLng;
    private String cemeteryName; //장지명
    private String cemeteryAddress;
    private String cemeteryLat;
    private String cemeteryLng;
    private String portraitUrl;
    private List<FamilyRelation> familyRelations;
    private String birthyear;
    private String birthday;
    private String commentForCondolence; // 유언
    private boolean condolenceCheck; // 애도해요 했는지 체크하는 변수
    private int condolenceCount;
    private int userImagesCount;
    private boolean relationCheck; // 관계가 있는지 없는지 확인 하는 변수
    private boolean isPublic;

}
