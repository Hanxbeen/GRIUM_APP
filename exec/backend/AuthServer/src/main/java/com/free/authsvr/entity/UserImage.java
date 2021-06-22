package com.free.authsvr.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "user_image")
public class UserImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(name = "uid", columnDefinition = "BINARY(16)")
    private UUID uid;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private String contents;

    private boolean isDeleted;

    @Builder
    public UserImage(UUID uid, String imageUrl, String contents){
        this.uid = uid;
        this.imageUrl = imageUrl;
        this.contents = contents;
        this.isDeleted = false;
        this.createdAt = new Date();
    }
}
