package com.free.transactionserver.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import com.free.transactionserver.entity.TransactionHistory;
import com.free.transactionserver.payload.transaction.ApprovalResponse;
import com.free.transactionserver.payload.transaction.StatisticsByGroup;
import com.free.transactionserver.payload.transaction.response.Relation;
import com.free.transactionserver.payload.transaction.response.RelationAllResponse;
import com.free.transactionserver.repository.TransactionHistoryRepository;
import com.free.transactionserver.utils.RestApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TransactionHistoryServiceImpl implements TransactionHistoryService {

    static final String CONDOLENCE_BASE_URL = "http://k4c104.p.ssafy.io:8001";

    @Autowired
    TransactionHistoryRepository thRepository;

    @Autowired
    RestApi api;

    @Override
    public List<TransactionHistory> getTransactionHistoryByDeadId(String dead_id) {
        List<TransactionHistory> THList = thRepository.findAllByDeadId(UUID.fromString(dead_id));
        // List<String> userList =
        // userList를 통해 rest api 호출

        return THList;
    }

    @Override
    public void testAdd() {
        TransactionHistory th = TransactionHistory.builder().tid("test")
                .deadId(UUID.fromString("cd1fa2ed-f8ae-4153-9a45-7e931be32e88"))
                .partnerUserId(UUID.fromString("30713462-1162-4cf6-8a47-6d09f603eac7")).partnerOrderId("김동생")
                .amountTotal(10000l).createdAt(new Date()).approvedAt(new Date()).isDeleted(false).build();

        thRepository.save(th);
    }

    @Override
    public void addTransactionHistory(ApprovalResponse approvalResponse, String deadId) {

        // approvalResponse에서 필요한거 뽑아서 써야함
        // todo
        TransactionHistory th = TransactionHistory.builder().tid(approvalResponse.getTid())
                .deadId(UUID.fromString(deadId)).partnerUserId(UUID.fromString(approvalResponse.getPartner_user_id()))
                .partnerOrderId(approvalResponse.getPartner_order_id())
                .amountTotal(approvalResponse.getAmount().getTotal().longValue())
                .createdAt(approvalResponse.getCreated_at()).approvedAt(approvalResponse.getApproved_at())
                .isDeleted(false).build();

        thRepository.save(th);
    }

    @Override
    public void deleteTransactionHistory(Long tid) {
        Optional<TransactionHistory> e = thRepository.findById(tid);

        if (e.isPresent()) {
            TransactionHistory th = e.get();
            th.setIsDeleted(true);
            thRepository.save(th);
        }
    }

    @Override
    public List<Map<String, Object>> getCondolenceStatistics(String dead_id) {
        List<Map<String, Object>> list = new LinkedList<>();
        List<Relation> responseList = new ArrayList<>();

        // 1. 해당 dead_id의 부조금 관리 명단을 받는다.
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<RelationAllResponse> response = restTemplate
                .getForEntity(CONDOLENCE_BASE_URL + "/relation/all/" + dead_id, RelationAllResponse.class);

        responseList = response.getBody().getResponse();
        for (Relation r : responseList) {
            Map<String, Object> map = new HashMap<>();
            map.put("name", r.getName());
            map.put("relationName", r.getRelationName());

            list.add(map);

            // System.out.println(r.getName() + " " + r.getRelationName());
        }
        // 2. 부조금 관리 명단의 각각의 select * from transaction_history where dead_id = ? and
        // partner_order_id = 명단 order by approved_at desc;
        for (Map<String, Object> relation : list) {
            List<TransactionHistory> thlist = thRepository.findAllByDeadIdAndPartnerOrderIdOrderByApprovedAtDesc(
                    UUID.fromString(dead_id), relation.get("name"));
            relation.put("thlist", thlist);
        }
        /*
         * 3. select partner_order_id, count(amount_total) as total from
         * transaction_history where dead_id = ? group by partner_order_id 날려서 각각에 총합을
         * 구한다.
         */
        List<StatisticsByGroup> groupList = thRepository.getCountByGroups(UUID.fromString(dead_id));
        for (Map<String, Object> relation : list) {
            for (StatisticsByGroup statistics : groupList) {
                if (relation.get("name").equals(statistics.getPartnerOrderId())) {
                    relation.put("total", statistics.getTotal());
                    break;
                }
            }
        }

        return list;
    }

}