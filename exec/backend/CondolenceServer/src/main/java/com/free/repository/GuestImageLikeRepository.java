package com.free.repository;

import com.free.entity.GuestImageLike;
import com.free.entity.key.GuestImageLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestImageLikeRepository extends JpaRepository<GuestImageLike, GuestImageLikeId> {
}
