package com.free.payload.request.dead;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class DeadPortraitRequest {


    @NotBlank
    private String deadId;

    @NotBlank
    private String userId;

    @NotBlank
    private String imageUrl;

    private MultipartFile[] file;
}
