package com.free.entity;

import com.free.entity.key.GuestImageLikeId;
import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "guest_image_like")
public class GuestImageLike {

    @EmbeddedId
    private GuestImageLikeId guestImageLikeId;

}
