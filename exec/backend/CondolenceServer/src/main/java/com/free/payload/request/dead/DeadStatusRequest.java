package com.free.payload.request.dead;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class DeadStatusRequest {

    @NotBlank
    private String deadId;

    @NotBlank
    private String userId;

    @NotBlank
    private boolean status;
}
