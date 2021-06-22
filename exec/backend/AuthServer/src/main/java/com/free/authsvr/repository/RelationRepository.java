package com.free.authsvr.repository;

import com.free.authsvr.entity.User;
import com.free.authsvr.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {

    List<Relation> findAllBySelfUid(User uid);
    Relation findBySelfUidAndConcernUid(User selfUid, User concernUid);
    List<Relation> findBySelfUidAndRelationName(User uid, String relationName);
    List<Relation> findBySelfUidAndRelationNameIsNot(User user, String relationName);
}
