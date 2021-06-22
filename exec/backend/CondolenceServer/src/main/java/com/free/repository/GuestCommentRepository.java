package com.free.repository;

import com.free.entity.GuestComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface GuestCommentRepository extends JpaRepository<GuestComment,Long> {

    List<GuestComment> findAllByDeadIdAndReportLessThan(UUID deadId,int size);

    @Query(value = "select guest_comment_id from guest_comment_like where user_Id = :userId",nativeQuery = true)
    Set<Long> getGuestCommentLikeContents(UUID userId);

    @Query(value = "select guest_comment_id from guest_comment_report where user_Id = :userId",nativeQuery = true)
    Set<Long> getGuestCommentReportContents(UUID userId);
}
