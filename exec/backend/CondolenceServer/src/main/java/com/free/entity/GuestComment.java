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
@Entity(name = "guest_comment")
public class GuestComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestCommentId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID deadId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID userId;

    private String contents;

    @Column(columnDefinition = "timestamp default now()")
    private Date createdAt;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;

    @Column(columnDefinition = "int default 0")
    private int report;

}
