package com.free.transactionserver;

import java.util.Date;
import java.util.UUID;

import com.free.transactionserver.entity.TransactionHistory;
import com.free.transactionserver.repository.TransactionHistoryRepository;
import com.free.transactionserver.utils.RestApi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TransactionServerApplicationTests {

    // @Autowired
    // TransactionHistoryRepository thRepository;

    // @Test
    // void contextLoads() {
    // }

    // @Test
    // void testRestApi(){
    //     RestApi api = new RestApi();
    //     String strUrl = "http://httpbon.org/get";
    //     String result = null;
    //     result = api.get(strUrl);
    //     System.out.println(result);
    // }

    // @Test
    // void testGetStatisticsByGroup(){
    //     UUID randomUuid1 = UUID.randomUUID();
    //     UUID randomUuid2 = UUID.randomUUID();
    //     UUID randomUuid3 = UUID.randomUUID();
    //     UUID randomUuid4 = UUID.randomUUID();
        
    //     //고인
    //     //상주

    //     TransactionHistory th = TransactionHistory.builder()
    //         .deadId(randomUuid1)
    //         .amountTotal(10000l)
    //         .approvedAt(new Date())
    //         .createdAt(new Date())
    //         .isDeleted(false)
    //         .partnerOrderId("둘리")
    //         .partnerUserId(randomUuid2)
    //         .build();

    //     thRepository.save(th);
    // }

}
