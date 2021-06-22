package com.free.authsvr.payload.request.relation;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RelationRequest {

    private UUID senderId;
    private UUID receiverId;
    private String senderToReceiver;
    private String receiverToSender;

//    public UUID getSenderId(){
//        return UUID.fromString(senderId);
//    }

//    public UUID getReceiverId(){
//        return UUID.fromString(receiverId);
//    }
}
