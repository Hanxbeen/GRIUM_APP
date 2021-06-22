package com.free.payload.response.condolence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Setter @Getter
@AllArgsConstructor
@Builder
public class CondolenceInfoResponse {

    private boolean condolenceCheck;

}
