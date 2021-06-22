package com.free.repository;

import com.free.entity.Condolence;
import com.free.entity.key.CondolenceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface CondolenceRepository extends JpaRepository<Condolence, CondolenceId> {

    @Query(value = "select * from condolence where dead_id = :deadId",nativeQuery = true)
    List<Condolence> getCount(UUID deadId);

}
