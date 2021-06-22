package com.free.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "guest_image")
public class GuestImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestImageId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID deadId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID userId;

    private String contents;

    @Column(columnDefinition = "timestamp default now()")
    private Date createdAt;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;

    private int report;

}
