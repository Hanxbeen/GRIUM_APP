package com.free.transactionserver.payload.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReadyProperty {
    String cid;
    String partner_order_id;
    String partner_user_id;
    String item_name;
    int quantity;
    int total_amount;
    int tax_free_amount;
    String approval_url;
    String cancel_url;
    String fail_url;

}
