package com.free.payload.response.dead;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class DeadManageResponse {

    private String deadId;

    private String imageUrl;

    private String name;

    private String relationName;

}
