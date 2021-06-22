package com.free.payload.request.condolence;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CondolenceRequest {

    @NotBlank
    private String deadId;

    @NotBlank
    private String userId;

}
