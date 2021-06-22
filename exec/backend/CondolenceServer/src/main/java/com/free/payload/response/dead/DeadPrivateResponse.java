package com.free.payload.response.dead;

import lombok.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeadPrivateResponse {

    private String deadId;

    private String imageUrl;

    private String name;

    private boolean progressCheck;

}
