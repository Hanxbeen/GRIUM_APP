package com.free.entity;

import com.free.entity.key.GuestCommentReportId;
import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "guest_comment_report")
public class GuestCommentReport {

    @EmbeddedId
    private GuestCommentReportId guestCommentReportId;

}