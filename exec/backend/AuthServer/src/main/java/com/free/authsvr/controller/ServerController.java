package com.free.authsvr.controller;

import com.free.authsvr.payload.response.user.AllInfo;
import com.free.authsvr.payload.response.user.SmallUser;
import com.free.authsvr.service.UserService;
import com.free.authsvr.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name="Server Controller ( 서버 호출 함수 )")
@RequiredArgsConstructor
public class ServerController {
    private final UserService userService;

    @PostMapping("/list") // 구현 해
    @Operation(summary = "Uid List에 대한 정보 리스트 리턴", description = "유저 스트링 리스트를 유저 정보 리스트로 변환해 리턴")
    public List<User> userList(@RequestBody List<String> uidList){
        return userService.getUserList(uidList);
    }

    @GetMapping("/allinfo")
    @Operation(summary = "하나의 Uid에 대한 모든 정보", description = "UID 입력 시 해당 유저의 정보, 가족 및 친구 관계, 이미지 사이즈 리턴")
    public AllInfo getAllInfo(@RequestParam String uid){
        return userService.getAllInfo(uid);
    }

    @GetMapping("/find")
    @Operation(summary = "유저 이름으로 검색된 모든 유저", description = "유저 이름 입력 시 해당 이름을 포함하는 모든 유저 리턴")
    public List<SmallUser> userList(@RequestParam String name){
        return userService.findUserByName(name);
    }
}
