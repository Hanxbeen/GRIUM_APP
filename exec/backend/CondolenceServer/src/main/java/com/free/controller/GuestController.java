package com.free.controller;

import com.free.payload.request.guest.*;
import com.free.payload.response.guest.*;
import com.free.service.GuestService;
import com.free.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@Tag(name = "Guest", description = "Guest API")
@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("guest")
@Slf4j
public class GuestController {

    private final GuestService guestService;

    private final S3Service s3Service;

    @Operation(summary = "guestImage 가져오기", description = "status 201 -> 성공, 204 -> 데이터 없음")
    @GetMapping("image/{deadId}/{userId}")
    public ResponseEntity<GuestImageInfoResponse> getGuestImageList(@PathVariable String deadId, @PathVariable String userId) {
        log.info("getGuestImageList methods Start");
        List<GuestImageInfo> data = guestService.getGuestImageList(deadId, userId);

        return CollectionUtils.isEmpty(data) ? noContent().build() : ok(GuestImageInfoResponse.builder()
                .data(data)
                .msg("success")
                .build());
    }

    @Operation(summary = "guestImage 등록", description = "status 201 -> 성공, 403 -> 권한없음(deadId 확인), 415 -> 오류(이미지 타입, 이름 확인)")
    @PostMapping("image")
    public ResponseEntity<GuestImageInfo> addGuestImage(@ModelAttribute @Valid GuestImageRequest guestImageRequest) {
        log.info("addGuestImage methods Start");
        final String prePath = "guestimage/" + guestImageRequest.getUserId() + "/";
        // 이미지를 안 올리는 경우 없음 최소 1개 이상
        try {
            String imageUrl = s3Service.upload(prePath, guestImageRequest.getFile());
            guestImageRequest.setImageUrl(imageUrl);
            GuestImageInfo data = guestService.addGuestImage(guestImageRequest);

            return ObjectUtils.isEmpty(data) ? status(HttpStatus.FORBIDDEN).build() : status(HttpStatus.CREATED).body(data);

        } catch (IOException e) {
            e.printStackTrace();
            return status(415).build();
        } catch (StringIndexOutOfBoundsException e) {
//            e.printStackTrace();
            log.error("이미지 없음.");
            return status(415).build();
        }

    }

//    @Operation(summary = "guestImage 수정 (사용안하는기능)", description = "이미지는 입력 삭제만 제공.")
//    @PutMapping("image")
//    public ResponseEntity<GuestImageInfo> updateGuestImage(@ModelAttribute @Valid GuestImageUpdateRequest guestImageUpdateRequest) {
//        log.info("updateGuestImage methods Start");
//        // 받아야할자료. userId, guestImageId (Long), contents, imageUrl (이미지는 안바꿀 때), image
//        GuestImageInfo data = null;
//        if (ObjectUtils.isEmpty(guestImageUpdateRequest.getFile())) {
//            // 널일 때 -> 이미지는 그대로 contents 만 바뀜.
//            try {
//                data = guestService.updateGuestImage(guestImageUpdateRequest);
//            } catch (EntityNotFoundException e) {
//                e.printStackTrace();
//                log.error("EntityNotFoundException");
//                return status(HttpStatus.NOT_FOUND).build();
//            }
//
//            return ObjectUtils.isEmpty(data) ?
//                    status(HttpStatus.FORBIDDEN).build() : status(HttpStatus.CREATED).body(data);
//        }
//        else {
//            // 아닐 때 -> 이미지 교체됨.
//            final String prePath = "guestimage/" + guestImageUpdateRequest.getUserId() + "/";
//
//            String imageUrl = null;
//
//            try {
//                imageUrl = s3Service.upload(prePath, guestImageUpdateRequest.getFile());
//                guestImageUpdateRequest.setImageUrl(imageUrl); // 이미지가 교체 됨.
//
//                data = guestService.updateGuestImage(guestImageUpdateRequest);
//
//                return ObjectUtils.isEmpty(data) ?
//                        status(HttpStatus.FORBIDDEN).build() : status(HttpStatus.CREATED).body(data);
//
//            } catch (IOException e) {
//                e.printStackTrace();
//                log.error("IOException");
//                return status(415).build();
//            } catch (StringIndexOutOfBoundsException e) {
//                e.printStackTrace();
//                log.error("StringIndexOutOfBoundsException");
//                return status(415).build();
//            } catch (EntityNotFoundException e) {
//                e.printStackTrace();
//                log.error("EntityNotFoundException");
//                return status(HttpStatus.NOT_FOUND).build();
//            }
//        }
//
//    }

    @Operation(summary = "image 삭제", description = "status 204 -> 성공, 403 -> 권한없음(userId확인), 404 -> 실패(guestCommentId 확인)")
    @DeleteMapping("image/{userId}/{guestImageId}")
    public ResponseEntity<?> deleteGuestImage(@PathVariable String userId, @PathVariable Long guestImageId) {
        log.info("getGuestImageList methods Start");

        try {
            return guestService.deleteGuestImage(userId, guestImageId) ?
                    noContent().build() : status(HttpStatus.FORBIDDEN).build();
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "comment 가져오기", description = "status 201 -> 성공, 204 -> 데이터 없음")
    @GetMapping("comment/{deadId}/{userId}")
    public ResponseEntity<GuestCommentInfoResponse> getGuestCommentList(@PathVariable String deadId, @PathVariable String userId) {
        log.info("getGuestCommentList methods Start");
        List<GuestCommentInfo> data = guestService.getGuestCommentList(deadId, userId);

        return CollectionUtils.isEmpty(data) ? noContent().build() : ok(GuestCommentInfoResponse.builder()
                .data(data)
                .msg("success")
                .build());
    }

    @Operation(summary = "comment 등록", description = "status 201 -> 성공, 403 -> 권한없음(deadId 확인)")
    @PostMapping("comment")
    public ResponseEntity<GuestCommentInfo> addGuestComment(@RequestBody @Valid GuestRequest guestRequest) {
        log.info("addGuestComment methods Start");
        GuestCommentInfo data = guestService.addGuestComment(guestRequest);

        return data != null ?
                ResponseEntity.status(HttpStatus.CREATED).body(data) : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @Operation(summary = "comment 수정", description = "status 201 -> 성공, 403 -> 권한없음(deadId 확인), 404 -> 실패(guestCommentId 확인)")
    @PutMapping("comment")
    public ResponseEntity<?> updateGuestComment(@RequestBody @Valid GuestCommentRequest guestCommentRequest) {
        log.info("addGuestComment methods Start");
        try {
            return guestService.updateGuestComment(guestCommentRequest) ?
                    status(HttpStatus.CREATED).build() : status(HttpStatus.FORBIDDEN).build();
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "comment 삭제", description = "status 204 -> 성공, 403 -> 권한없음(userId확인), 404 -> 실패(guestCommentId 확인)")
    @DeleteMapping("comment/{userId}/{guestCommentId}")
    public ResponseEntity<?> deleteGuestComment(@PathVariable String userId, @PathVariable Long guestCommentId) {
        log.info("deleteGuestComment methods Start");

        try {
            return guestService.deleteGuestComment(userId, guestCommentId) ?
                    noContent().build() : status(HttpStatus.FORBIDDEN).build();
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "comment 좋아요", description = "리턴값 true면 좋아요, false면 좋아요 취소, status : 404 -> commentId가 잘못 입력 됨.")
    @PostMapping("comment/like")
    public ResponseEntity<LikeCheckResponse> addGuestCommentLike(@RequestBody GuestCommentLikeRequest guestCommentLikeRequest) {
        log.info("addGuestCommentLike methods Start");

        LikeCheckResponse likeCheckResponse = null;
        try {
            likeCheckResponse = guestService.addGuestCommentLike(guestCommentLikeRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return status(HttpStatus.CREATED).body(likeCheckResponse);
    }

    @Operation(summary = "image 좋아요", description = "리턴값 true면 좋아요, false면 좋아요 취소, status : 404 -> imageId가 잘못 입력 됨.")
    @PostMapping("image/like")
    public ResponseEntity<LikeCheckResponse> addGuestImageLike(@RequestBody @Valid GuestImageLikeRequest guestImageLikeRequest) {
        log.info("addGuestImageLike methods Start");

        LikeCheckResponse likeCheckResponse = null;
        try {
            likeCheckResponse = guestService.addGuestImageLike(guestImageLikeRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return status(HttpStatus.CREATED).body(likeCheckResponse);
    }

    @Operation(summary = "comment 신고", description = "리턴값 true면 성공, false면 이미 한 번 클릭(중복), status : 404 -> commentId가 잘못 입력 됨.")
    @PostMapping("comment/report")
    public ResponseEntity<LikeCheckResponse> addGuestCommentReport(@RequestBody GuestCommentLikeRequest guestCommentReportRequest) {

        LikeCheckResponse likeCheckResponse = null;
        try {
            likeCheckResponse = guestService.addGuestCommentReport(guestCommentReportRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return ok(likeCheckResponse);
    }

    @Operation(summary = "guestImage 신고", description = "리턴값 true면 성공, false면 이미 한 번 클릭(중복), status : 404 -> imageId가 잘못 입력 됨.")
    @PostMapping("image/report")
    public ResponseEntity<LikeCheckResponse> addGuestImageReport(@RequestBody GuestImageLikeRequest guestImageLikeRequest) {
        LikeCheckResponse likeCheckResponse = null;
        try {
            likeCheckResponse = guestService.addGuestImageReport(guestImageLikeRequest);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            log.error("EntityNotFoundException");
            return status(HttpStatus.NOT_FOUND).build();
        }

        return ok(likeCheckResponse);
    }

}
