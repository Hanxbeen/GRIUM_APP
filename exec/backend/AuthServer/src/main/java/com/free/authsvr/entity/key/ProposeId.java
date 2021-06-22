package com.free.authsvr.entity.key;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProposeId implements Serializable { // 가족관계신청 복합키

    private UUID senderUid;
    private UUID receiverUid;

//    @Builder
//    public ProposeId(UUID sender, UUID receiver){
//        this.sender = sender;
//        this.receiver = receiver;
//    }
}
