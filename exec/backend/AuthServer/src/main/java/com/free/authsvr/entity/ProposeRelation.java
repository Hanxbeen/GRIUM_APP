package com.free.authsvr.entity;

import com.free.authsvr.entity.key.ProposeId;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity(name="propose_relation")
@NoArgsConstructor
@IdClass(ProposeId.class) //복합키
public class ProposeRelation {

    @Id
    @Column(name = "sender_uid", columnDefinition = "BINARY(16)")
    private UUID senderUid;
    @Id
    @Column(name = "receiver_uid", columnDefinition = "BINARY(16)")
    private UUID receiverUid;

    private String senderToReceiver;

    private String receiverToSender;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Builder
    public ProposeRelation(ProposeId ids, String senderToReceiver, String receiverToSender){
        this.senderUid = ids.getSenderUid();
        this.receiverUid = ids.getReceiverUid();
        this.senderToReceiver = senderToReceiver;
        this.receiverToSender = receiverToSender;
    }

}
