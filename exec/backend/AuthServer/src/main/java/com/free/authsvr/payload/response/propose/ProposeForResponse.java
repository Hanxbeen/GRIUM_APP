package com.free.authsvr.payload.response.propose;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Builder
public class ProposeForResponse {

    private long relationId;
    private UUID senderUid;
    private String senderName;
    private String senderImageUrl;
    private String senderToReceiver; // 상대방이 나를 부르는 호칭
    private String receiverToSender; // 내가 상대방을 부르는 호칭
}
