package com.free.entity;

import com.free.entity.key.GuestImageLikeId;
import com.free.entity.key.GuestImageReportId;
import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "guest_image_report")
public class GuestImageReport {

    @EmbeddedId
    private GuestImageReportId guestImageReportId;

}
