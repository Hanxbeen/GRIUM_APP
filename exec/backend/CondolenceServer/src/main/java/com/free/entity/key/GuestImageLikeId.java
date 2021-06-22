package com.free.entity.key;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Data
@EqualsAndHashCode
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GuestImageLikeId implements Serializable {


    @Column(columnDefinition = "BINARY(16)")
    private UUID userId;

    @Column
    private Long guestImageId;

}
