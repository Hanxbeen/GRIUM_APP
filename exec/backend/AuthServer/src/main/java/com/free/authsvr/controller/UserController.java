package com.free.authsvr.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.free.authsvr.payload.request.user.ImageDelete;
import com.free.authsvr.payload.response.user.ImageForResponse;
import com.free.authsvr.payload.response.user.TokenResponse;
import com.free.authsvr.payload.response.user.UserForApp;
import com.free.authsvr.payload.response.user.UserResponse;
import com.free.authsvr.payload.request.user.ImageUpload;
import com.free.authsvr.payload.request.user.LoginInfo;
import com.free.authsvr.payload.request.user.UpdateInfo;
import com.free.authsvr.security.CurrentUser;
import com.free.authsvr.security.TokenProvider;
import com.free.authsvr.security.UserPrincipal;
import com.free.authsvr.service.S3Service;
import com.free.authsvr.service.UserImageService;
import com.free.authsvr.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name="User Controller")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final S3Service s3Service;
    private final UserImageService userImageService;

    private final TokenProvider tokenProvider;

    private final String REFRESH_TOKEN_NAME = "RefreshToken";

    // feat 1. 로그인 성공 -> 리턴값 : nickName, profile, category, blogId, youtubeId, jobId

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "내 정보 가져오기 ( 2 )", description = "jwt 기반으로 내 정보 가져오기")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        logger.info("getCurrentUser Start : return User");

        UserResponse response =
                UserResponse.builder()
                    .msg("Success")
                    .user(userService.getCurrentUser(userPrincipal.getId()))
                    .build()
        ;

        logger.info("getCurrentUser End");

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @Operation(summary="유저 정보 수정", description = "유저의 생년월일, 유언 등의 정보 수정")
    public ResponseEntity<UpdateInfo> updateUserInfo(@RequestBody UpdateInfo updateInfo){
        try {
            userService.updateUserInfo(updateInfo);
        }catch(Exception e){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(updateInfo);
    }

    @PostMapping("/login")
    @Operation(summary = "유저 로그인 및 회원가입", description = "카카오 토큰 기반으로 로그인 처리 하거나 회원가입 처리 후 로그인 처리 함")
    public ResponseEntity<?> userLogin(@RequestBody LoginInfo info) throws JsonProcessingException {
        UserResponse response;
        try {
            UserForApp userInfo = userService.userLogin(info);
            response =
                    UserResponse.builder()
                            .msg("Success")
                            .user(userInfo)
                            .build()
                    ;
            return ResponseEntity.ok(response);
        }catch(HttpClientErrorException ex){
            return ResponseEntity.status(403).body(ex);
        }

    }

    @GetMapping("/refresh")
    @Operation(summary = "JWT 토큰 리프레시", description = "JWT Refresh 토큰으로 Access Token 재발급")
    public ResponseEntity<TokenResponse> refreshToken(@CookieValue(value = REFRESH_TOKEN_NAME) Cookie refreshTokenCookie) {
        String newToken = null;
        String refreshToken = refreshTokenCookie.getValue();
        logger.info("Refresh Token : " + refreshToken);

        if (tokenProvider.validateToken(refreshToken)) {
            String userId = tokenProvider.getUserIdFromToken(refreshToken);
            newToken = tokenProvider.createToken(userId, 0);
        }

        return newToken != null ?
                ResponseEntity.ok(
                        TokenResponse
                                .builder()
                                .msg("success")
                                .token(newToken)
                                .build()
                ) :
                ResponseEntity.status(403)
                        .body(
                                TokenResponse
                                        .builder()
                                        .msg("Invalid Token")
                                        .token("")
                                        .build()
                        )
                ;
    }

    @GetMapping("/logout")
    @Operation(summary = "로그아웃 처리", description = "로그아웃 처리로 리프레시 토큰 제거")
    public ResponseEntity<?> logout(@CookieValue(value = REFRESH_TOKEN_NAME) Cookie refreshTokenCookie, HttpServletResponse res) {
        String refreshToken = refreshTokenCookie.getValue();
        logger.info("Logout : " + refreshToken);

        boolean isLogout = tokenProvider.validateToken(refreshToken);
        if (isLogout) {
            Cookie refresh = new Cookie(REFRESH_TOKEN_NAME, null);
            refresh.setMaxAge(0);
            refresh.setPath("/");
            res.addCookie(refresh);
        }
        return (isLogout ?
                ResponseEntity.ok()
                        .body("success")
                :
                ResponseEntity.status(401)
                        .body("fail"))
                ;
    }

    @PostMapping("/image")
    @Operation(summary = "이미지 글 업로드", description = "유저 이미지 글 업로드 (다수 이미지 업로드 가능)")
    public ResponseEntity<String> imageUpload(@ModelAttribute ImageUpload imageUpload, MultipartFile[] file) throws IOException {
        final String prePath = "userimage/" + imageUpload.getUid() + "/";
        String imageUrl = s3Service.upload(prePath, file);
        imageUpload.setImageUrl(imageUrl);
        userImageService.saveImage(imageUpload);

        // IO Exception 발생 시 415
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/image")
    @Operation(summary = "유저의 이미지 가져오기", description = "생전 유저가 업로드한 이미지 글 가져오기")
    public ResponseEntity<List<ImageForResponse>> getImage(@RequestParam String uid){
        List<ImageForResponse> images = userImageService.getImages(uid);
        return ResponseEntity.ok(images);
    }

    @DeleteMapping("/image")
    @Operation(summary = "이미지 삭제", description = "유저가 올린 사진 삭제")
    public ResponseEntity<?> deleteImage(@RequestBody ImageDelete req){
        return userImageService.deleteImage(req) ?
                ResponseEntity.ok("success") :
                ResponseEntity.noContent().build();


    }



    // user/family
    // user/friend
    // user/propose
}
