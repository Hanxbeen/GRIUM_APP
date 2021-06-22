package com.free.authsvr.repository;

import com.free.authsvr.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Long> {

    List<UserImage> findAllByUid(UUID uid);
    UserImage findAllByImageIdAndUid(Long imageId, UUID uid);
}
