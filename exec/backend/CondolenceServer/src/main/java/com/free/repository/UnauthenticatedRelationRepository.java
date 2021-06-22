package com.free.repository;

import java.util.List;
import java.util.UUID;

import com.free.entity.UnauthenticatedRelation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UnauthenticatedRelationRepository extends JpaRepository<UnauthenticatedRelation, Long> {

//    List<UnauthenticatedRelation> findByDeadDeadId(String deadId);

    List<UnauthenticatedRelation> findAllByDeadId(UUID deadId);
}
