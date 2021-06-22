package com.free.payload.request.guest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GuestRequest {

    @NotBlank
    private String deadId;

    @NotBlank
    private String userId;

    @NotBlank
    private String contents;

}
