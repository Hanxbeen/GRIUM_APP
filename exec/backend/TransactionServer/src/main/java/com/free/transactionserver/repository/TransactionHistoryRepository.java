package com.free.transactionserver.repository;

import java.util.List;
import java.util.UUID;

import com.free.transactionserver.entity.TransactionHistory;
import com.free.transactionserver.payload.transaction.StatisticsByGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {

    List<TransactionHistory> findAllByDeadId(UUID dead_id);

    //com.free.transactionserver.payload.transaction.
    //new com.free.transactionserver.payload.transaction.StatisticsByGroup(th.partner_order_id as partner_order_id, count(th.amount_total) as total)
    @Query(value = "select th.partner_order_id as partnerOrderId, sum(th.amount_total) as total " +
            "from transaction_history th where th.dead_id = :dead_id group by th.partner_order_id", nativeQuery = true)
    List<StatisticsByGroup> getCountByGroups(@Param("dead_id") UUID dead_id);

    List<TransactionHistory> findAllByDeadIdAndPartnerOrderIdOrderByApprovedAtDesc(UUID fromString, Object object);
}
