package com.free.payload.request.dead;

import lombok.Getter;

@Getter
public class DeadInfoRequest {


    private String deadId;

    private String userId;

    private String imprintDate; // 발인일

    private String deceasedDate; // 별세일

    private String murmurName; // 빈소명

    private String murmurAddress;

    private String murmurLat;

    private String murmurLng;

    private String cemeteryName; //장지명

    private String cemeteryAddress;

    private String cemeteryLat;

    private String cemeteryLng;

    private String portraitUrl;

    private boolean isPublic;

    public boolean getIsPublic() {
        return isPublic;
    }
}
