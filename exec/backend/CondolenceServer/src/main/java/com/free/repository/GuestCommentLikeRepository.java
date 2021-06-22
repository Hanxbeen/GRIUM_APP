package com.free.repository;

import com.free.entity.GuestCommentLike;
import com.free.entity.key.GuestCommentLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestCommentLikeRepository extends JpaRepository<GuestCommentLike, GuestCommentLikeId> {
}
