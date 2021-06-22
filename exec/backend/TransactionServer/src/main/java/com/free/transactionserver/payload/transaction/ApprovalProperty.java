package com.free.transactionserver.payload.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApprovalProperty {
    String cid;
    String tid;
    String partner_order_id;
    String partner_user_id;
    String pg_token;
    int total_amount;
    String deadId;
}
