package com.free.payload.response.guest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class LikeCheckResponse {

    private boolean check; // 좋아요 확인
}
