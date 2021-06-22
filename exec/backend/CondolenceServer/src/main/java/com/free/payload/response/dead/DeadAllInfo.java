package com.free.payload.response.dead;

import lombok.*;

import javax.persistence.Id;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeadAllInfo {

    private UUID deadId;
    private UUID userId;
    private String imprintDate; // 발인일
    private String deceasedDate; // 별세일
    private boolean isPublic;
    private boolean progressCheck;
    private String murmurName; // 빈소명
    private String murmurAddress;
    private String murmurLat;
    private String murmurLng;
    private String cemeteryName; //장지명
    private String cemeteryAddress;
    private String cemeteryLat;
    private String cemeteryLng;

}
