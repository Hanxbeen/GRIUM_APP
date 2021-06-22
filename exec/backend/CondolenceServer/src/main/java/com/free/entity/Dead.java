package com.free.entity;


import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "dead")
public class Dead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID deadId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID userId;

    private String imprintDate; // 발인일

    private String deceasedDate; // 별세일

    @Column(columnDefinition = "boolean default false")
    private boolean isPublic;

    @Column(columnDefinition = "boolean default false")
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

    @Column(columnDefinition = "int default 0")
    private int viewCount;

}
