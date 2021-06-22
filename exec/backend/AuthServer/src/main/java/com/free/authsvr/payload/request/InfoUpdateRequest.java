package com.free.authsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class InfoUpdateRequest {

    private String name;
    private List<String> categoryList;
    private List<String> blogList;
    private List<String> youtubeList;
    private List<String> jobList;
}
