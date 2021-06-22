package com.free.authsvr.payload.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@AllArgsConstructor
@Getter
public class SmallUser {
    private UUID id;
    private String name;
}
