package com.free.entity;

import com.free.entity.key.GuestCommentLikeId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Service
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "guest_comment_like")
public class GuestCommentLike {

    @EmbeddedId
    private GuestCommentLikeId guestCommentLikeId;

}
