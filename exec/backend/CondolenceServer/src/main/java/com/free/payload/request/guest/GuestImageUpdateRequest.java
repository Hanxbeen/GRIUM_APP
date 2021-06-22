package com.free.payload.request.guest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class GuestImageUpdateRequest {

    @NotBlank
    private String userId;

    @NotBlank
    private Long guestImageId;

    private String imageUrl;

    @NotBlank
    private String contents;

    private MultipartFile[] file;

}
