package com.free.service;

import com.free.payload.request.dead.DeadInfoRequest;
import com.free.payload.request.dead.DeadPortraitRequest;
import com.free.payload.request.dead.DeadStatusRequest;
import com.free.payload.request.user.UserInfo;
import com.free.payload.response.dead.*;

import java.util.List;

public interface DeadService {

    DeadAllInfo getDeadAll(String deadId);

    DeadInfo getDeadInfo(String deadId, String userId);

    UserInfo[] getPublicDeadList(String userId);

    List<DeadPrivateResponse> getPrivateDeadList(String userId);

    void addDeadInfo(String deadId);

    DeadInfo updateDeadInfo(DeadInfoRequest deadInfoRequest);

    List<DeadPrivateResponse> getSearchDead(String name);

    DeadStatusResponse updateDeadStatus(DeadStatusRequest deadStatusRequest);

    DeadPortraitResponse updateDeadPortrait(DeadPortraitRequest deadStatusRequest);

    List<DeadManageResponse> getManageDeadList(String userId);

    List<String> changeUserList(List<String> userIdList);
}
