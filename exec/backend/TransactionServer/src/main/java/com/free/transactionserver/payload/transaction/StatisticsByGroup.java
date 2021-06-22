package com.free.transactionserver.payload.transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public interface StatisticsByGroup {
    // private String partner_order_id;
    // private Long total;

    String getPartnerOrderId();

    Long getTotal();
}
