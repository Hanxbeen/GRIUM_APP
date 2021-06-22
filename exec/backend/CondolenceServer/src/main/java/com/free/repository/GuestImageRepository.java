package com.free.repository;

import com.free.entity.GuestImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface GuestImageRepository extends JpaRepository<GuestImage,Long> {

    List<GuestImage> findAllByDeadIdAndReportLessThan(UUID deadId,int size);

    @Query(value = "select guest_image_id from guest_image_like where user_Id = :userId",nativeQuery = true)
    Set<Long> getGuestImageLikeContents(UUID userId);

    @Query(value = "select guest_image_id from guest_image_report where user_Id = :userId",nativeQuery = true)
    Set<Long> getGuestImageReportContents(UUID userId);
}
