package com.free.payload.response.guest;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestImageInfo {

    private Long guestImageId;

    private String userId; // 글쓴사람 아이디

    private String name; // 글쓴사람

    private String contents;

    private String createdAt;

    private String[] imageUrl;

    private int report;

    private int likeCheck; // 내가 좋아요 눌렀는지 안눌렀는지 확인. 정렬을 위해 int타입 1 true / 0 false

    private int reportCheck;
}
