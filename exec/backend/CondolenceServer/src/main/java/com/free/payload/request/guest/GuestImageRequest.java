package com.free.payload.request.guest;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
public class GuestImageRequest extends GuestRequest {

    private String imageUrl;

    private MultipartFile[] file;

}
