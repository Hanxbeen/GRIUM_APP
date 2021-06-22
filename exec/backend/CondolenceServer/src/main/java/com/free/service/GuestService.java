package com.free.service;


import com.free.payload.request.guest.*;
import com.free.payload.response.guest.LikeCheckResponse;
import com.free.payload.response.guest.GuestCommentInfo;
import com.free.payload.response.guest.GuestImageInfo;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface GuestService {

    List<GuestImageInfo> getGuestImageList(String deadId, String userId);

    List<GuestCommentInfo> getGuestCommentList(String deadId, String userId);

    boolean deleteGuestImage(String userId, Long guestImageId) throws EntityNotFoundException;

    boolean deleteGuestComment(String userId, Long guestCommentId) throws EntityNotFoundException;

    GuestCommentInfo addGuestComment(GuestRequest guestRequest);

    GuestImageInfo addGuestImage(GuestImageRequest guestImageRequest);

    boolean updateGuestComment(GuestCommentRequest guestCommentRequest) throws EntityNotFoundException;

//    GuestImageInfo updateGuestImage(GuestImageUpdateRequest guestImageUpdateRequest) throws EntityNotFoundException;

    LikeCheckResponse addGuestCommentLike(GuestCommentLikeRequest guestCommentLikeRequest);

    LikeCheckResponse addGuestImageLike(GuestImageLikeRequest guestImageLikeRequest);

    LikeCheckResponse addGuestCommentReport(GuestCommentLikeRequest guestCommentReportRequest);

    LikeCheckResponse addGuestImageReport(GuestImageLikeRequest guestImageLikeRequest);
}
