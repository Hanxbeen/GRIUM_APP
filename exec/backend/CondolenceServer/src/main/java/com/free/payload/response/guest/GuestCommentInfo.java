package com.free.payload.response.guest;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestCommentInfo {

    private Long guestCommentId;

    private String userId;

    private String name; //방문록 쓴사람 이름

    private String contents;

    private String createdAt;

    private int report;

    private int likeCheck; // 방문록 좋아요

    private int reportCheck;

}
