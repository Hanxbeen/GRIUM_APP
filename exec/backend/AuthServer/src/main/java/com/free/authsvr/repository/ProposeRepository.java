package com.free.authsvr.repository;

import com.free.authsvr.entity.ProposeRelation;
import com.free.authsvr.entity.key.ProposeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProposeRepository extends JpaRepository<ProposeRelation, ProposeId> {

    List<ProposeRelation> findAllBySenderUid(UUID senderUid);
    List<ProposeRelation> findAllByReceiverUid(UUID receiverUid);
}
