package com.free.authsvr.service;


import com.free.authsvr.payload.request.user.ImageDelete;
import com.free.authsvr.payload.request.user.ImageUpload;
import com.free.authsvr.entity.UserImage;
import com.free.authsvr.payload.response.user.ImageForResponse;
import com.free.authsvr.repository.UserImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserImageService{

    private final UserImageRepository userImageRepository;

    public void saveImage(ImageUpload imageUpload) {
        userImageRepository.save(
                UserImage.builder()
                        .imageUrl(imageUpload.getImageUrl())
                        .contents(imageUpload.getContents())
                        .uid(UUID.fromString(imageUpload.getUid()))
                        .build()
        );
    }

    public List<ImageForResponse> getImages(String uid) {
        return userImageRepository.findAllByUid(UUID.fromString(uid))
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList())
                ;
    }

    public ImageForResponse convertToResponse(UserImage userImage){
        String[] timeList= userImage.getCreatedAt().toString().split(" ");
        StringBuilder time = new StringBuilder();
        time.append(timeList[0]);
        time.append(" ");
        time.append(timeList[1].split("\\.")[0]);

        return ImageForResponse.builder()
                .imageId(userImage.getImageId())
                .imageUrl(Arrays.asList(userImage.getImageUrl().split(",")))
                .createdAt(time.toString())
                .contents(userImage.getContents())
                .build();
    }

    public boolean deleteImage(ImageDelete req) {
        UserImage userImage = userImageRepository.findAllByImageIdAndUid(req.getImageId(), req.getUid());
        if(userImage == null)
            return false;
        else{
            userImageRepository.delete(userImage);
            return true;
        }
    }
}
