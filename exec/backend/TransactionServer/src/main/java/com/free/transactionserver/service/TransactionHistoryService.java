package com.free.transactionserver.service;

import java.util.List;
import java.util.Map;

import com.free.transactionserver.entity.TransactionHistory;
import com.free.transactionserver.payload.transaction.ApprovalResponse;

public interface TransactionHistoryService {

    List<TransactionHistory> getTransactionHistoryByDeadId(String dead_id);
    void addTransactionHistory(ApprovalResponse approvalResponse, String deadId);
    void deleteTransactionHistory(Long tid);
    List<Map<String, Object>> getCondolenceStatistics(String dead_id);
    void testAdd();
    
}
