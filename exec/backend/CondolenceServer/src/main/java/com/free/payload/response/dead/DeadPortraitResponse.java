package com.free.payload.response.dead;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DeadPortraitResponse {

    private String portraitUrl;
}
