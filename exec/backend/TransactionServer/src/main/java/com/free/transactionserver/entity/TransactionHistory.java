package com.free.transactionserver.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "거래 기록")
@Entity
public class TransactionHistory {

    @Id
    public String tid;

    @Column(columnDefinition = "BINARY(16)")
    public UUID deadId;

    @Column(columnDefinition = "BINARY(16)")
    public UUID partnerUserId;

    public String partnerOrderId;

    public Long amountTotal;
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    public Date approvedAt;
    public Boolean isDeleted;

    @Builder
    public TransactionHistory(String tid, UUID deadId, UUID partnerUserId, String partnerOrderId, Long amountTotal,
            Date createdAt, Date approvedAt, Boolean isDeleted) {
        this.tid = tid;
        this.deadId = deadId;
        this.partnerUserId = partnerUserId;
        this.partnerOrderId = partnerOrderId;
        this.amountTotal = amountTotal;
        this.createdAt = createdAt;
        this.approvedAt = approvedAt;
        this.isDeleted = isDeleted;
    }

}
