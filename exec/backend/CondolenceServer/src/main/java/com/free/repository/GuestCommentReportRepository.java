package com.free.repository;

import com.free.entity.GuestCommentReport;
import com.free.entity.key.GuestCommentReportId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestCommentReportRepository extends JpaRepository<GuestCommentReport, GuestCommentReportId> {
}
