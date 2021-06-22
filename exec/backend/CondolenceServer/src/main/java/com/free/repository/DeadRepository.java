package com.free.repository;

import com.free.entity.Dead;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface DeadRepository extends JpaRepository<Dead, Long> {

    Optional<Dead> findByDeadId(UUID deadId);

    List<Dead> findAllByIsPublicAndUserIdIsNotNull(boolean status);

    List<Dead> findAllByDeadIdIn(List<UUID> uuidList);

    List<Dead> findAllByProgressCheckAndImprintDateLessThan(boolean status, String now);

    List<Dead> findAllByUserId(UUID userId);
}
