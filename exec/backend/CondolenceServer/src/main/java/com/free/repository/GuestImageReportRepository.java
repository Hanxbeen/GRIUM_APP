package com.free.repository;

import com.free.entity.GuestImageReport;
import com.free.entity.key.GuestImageReportId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestImageReportRepository extends JpaRepository<GuestImageReport, GuestImageReportId> {
}
