package com.free.service;

import com.free.entity.*;
import com.free.entity.key.GuestCommentLikeId;
import com.free.entity.key.GuestCommentReportId;
import com.free.entity.key.GuestImageLikeId;
import com.free.entity.key.GuestImageReportId;
import com.free.payload.request.guest.*;
import com.free.payload.request.user.UserInfo;
import com.free.payload.response.guest.LikeCheckResponse;
import com.free.payload.response.guest.GuestCommentInfo;
import com.free.payload.response.guest.GuestImageInfo;
import com.free.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityNotFoundException;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestService {

    private final GuestImageRepository guestImageRepository;

    private final GuestCommentRepository guestCommentRepository;

    private final DeadService deadService;

    private final RestTemplateBuilder restTemplateBuilder;

    private final GuestCommentLikeRepository guestCommentLikeRepository;

    private final GuestImageLikeRepository guestImageLikeRepository;

    private final GuestCommentReportRepository guestCommentReportRepository;

    private final GuestImageReportRepository guestImageReportRepository;

    static final String url = "http://k4c104.p.ssafy.io:8443";

    @Override
    public List<GuestCommentInfo> getGuestCommentList(String deadId, String userId) {

        List<GuestComment> guestCommentList = guestCommentRepository.findAllByDeadIdAndReportLessThan(UUID.fromString(deadId), 5);

        // 2. 1번의 결과물에서 userId만 다 추출해서 resttemplate으로 보내 이름 다 얻어오기
        Set<UUID> userIdSet = guestCommentList.stream()
                .filter(guestComment -> !guestComment.isDeleted())
                .map(GuestComment::getUserId)
                .collect(Collectors.toSet());

        RestTemplate restTemplate = restTemplateBuilder.build();

        UserInfo[] userInfos = restTemplate.postForObject(url + "/user/list", userIdSet, UserInfo[].class);
        Map<String, UserInfo> collect = Arrays.stream(userInfos).collect(Collectors.toMap(
                userInfo -> userInfo.getId(),
                userInfo -> userInfo
        ));

        // 3. guest_comment_like 테이블에서 내 좋아요 목록 다 읽어와 1번의 결과물과 비교해 likeCheck값 + 1
        Set<Long> guestCommentLikeContents = guestCommentRepository.getGuestCommentLikeContents(UUID.fromString(userId));

        // 4. guest_comment_report 테이블에서 내 신고 목록 다 읽어와 1번의 결과물과 비교해 reportCheck값 +1
        Set<Long> guestCommentReportContents = guestCommentRepository.getGuestCommentReportContents(UUID.fromString(userId));

        // 5. 1,2,3을 합쳐서 guestImageInfo 리스트 형태로 가공 후 check 값에 따라 정렬.
        return guestCommentList.stream()
                .filter(guestComment -> !guestComment.isDeleted())
                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                .map(guestComment -> GuestCommentInfo.builder()
                        .userId(collect.get(guestComment.getUserId().toString()).getId())
                        .likeCheck(guestCommentLikeContents.contains(guestComment.getGuestCommentId()) ? 1 : 0)
                        .reportCheck(guestCommentReportContents.contains(guestComment.getGuestCommentId()) ? 1 : 0)
                        .contents(guestComment.getContents())
                        .createdAt(guestComment.getCreatedAt().toString().split("\\.")[0])
                        .guestCommentId(guestComment.getGuestCommentId())
                        .report(guestComment.getReport())
                        .name(collect.get(guestComment.getUserId().toString()).getName())
                        .build())
                .sorted(Comparator.comparingInt(GuestCommentInfo::getLikeCheck).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<GuestImageInfo> getGuestImageList(String deadId, String userId) {

        // 1. guestImagerepo 에서 finddeadId로 전부 다 셀렉
        List<GuestImage> guestImageList = guestImageRepository.findAllByDeadIdAndReportLessThan(UUID.fromString(deadId), 5);

        Set<UUID> userIdSet = guestImageList.stream()
                .filter(guestImage -> !guestImage.isDeleted())
                .map(GuestImage::getUserId)
                .collect(Collectors.toSet()); // rest로 보낼 데이터

        // 2. 1번의 결과물에서 userId만 다 추출해서 resttemplate으로 보내 이름 다 얻어오기
        RestTemplate restTemplate = restTemplateBuilder.build();

        UserInfo[] userInfos = restTemplate.postForObject(url + "/user/list", userIdSet, UserInfo[].class);

        Map<String, UserInfo> collect = Arrays.stream(userInfos).collect(Collectors.toMap(
                userInfo -> userInfo.getId(),
                userInfo -> userInfo
        ));

        // 3. guest_image_like 테이블에서 내 좋아요 목록 다 읽어와 1번의 결과물과 비교해 check값 + 1
        Set<Long> guestImageLikeContents = guestImageRepository.getGuestImageLikeContents(UUID.fromString(userId));
        Set<Long> guestImageReportContents = guestImageRepository.getGuestImageReportContents(UUID.fromString(userId));

        // 4. 1,2,3을 합쳐서 guestImageInfo 리스트 형태로 가공 후 check 값에 따라 정렬.
        return guestImageList.stream()
                .filter(guestImage -> !guestImage.isDeleted())
                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                .map(guestImage -> GuestImageInfo.builder()
                        .userId(collect.get(guestImage.getUserId().toString()).getId())
                        .likeCheck(guestImageLikeContents.contains(guestImage.getGuestImageId()) ? 1 : 0)
                        .reportCheck(guestImageReportContents.contains(guestImage.getGuestImageId()) ? 1 : 0)
                        .contents(guestImage.getContents())
                        .createdAt(guestImage.getCreatedAt().toString().split("\\.")[0])
                        .guestImageId(guestImage.getGuestImageId())
                        .imageUrl(guestImage.getImageUrl().split(","))
                        .report(guestImage.getReport())
                        .name(collect.get(guestImage.getUserId().toString()).getName())
                        .build())
                .sorted(Comparator.comparingInt(GuestImageInfo::getLikeCheck).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteGuestImage(String userId, Long guestImageId) throws EntityNotFoundException {
        GuestImage guestImage = guestImageRepository.getOne(guestImageId);
        if (guestImage.getUserId().equals(UUID.fromString(userId))) {
            guestImage.setDeleted(true);
            guestImageRepository.save(guestImage);
            return true;
        }
        return false;
    }

    @Override
    public GuestImageInfo addGuestImage(GuestImageRequest guestImageRequest) {
        // deadId 검증
        if (deadService.getDeadAll(guestImageRequest.getDeadId()) == null) return null;

        GuestImage guestImage = GuestImage.builder()
                .contents(guestImageRequest.getContents())
                .createdAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .deadId(UUID.fromString(guestImageRequest.getDeadId()))
                .imageUrl(guestImageRequest.getImageUrl())
                .userId(UUID.fromString(guestImageRequest.getUserId()))
                .build();

        GuestImage save = guestImageRepository.save(guestImage);

        return GuestImageInfo.builder()
                .report(save.getReport())
                .imageUrl(save.getImageUrl().split(","))
                .guestImageId(save.getGuestImageId())
                .createdAt(save.getCreatedAt().toString().split("\\.")[0])
                .contents(save.getContents())
                .build();
    }

    @Override
    public GuestCommentInfo addGuestComment(GuestRequest guestRequest) {
        // deadID검증
        if (ObjectUtils.isEmpty(deadService.getDeadAll(guestRequest.getDeadId()))) return null;

        GuestComment guestComment = GuestComment.builder()
                .deadId(UUID.fromString(guestRequest.getDeadId()))
                .userId(UUID.fromString(guestRequest.getUserId()))
                .contents(guestRequest.getContents())
                .createdAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .build();

        GuestComment save = guestCommentRepository.save(guestComment);
        return GuestCommentInfo.builder()
                .report(save.getReport())
                .guestCommentId(save.getGuestCommentId())
                .createdAt(save.getCreatedAt().toString().split("\\.")[0])
                .contents(save.getContents())
                .build();
    }

    @Override
    public boolean updateGuestComment(GuestCommentRequest guestCommentRequest) throws EntityNotFoundException {
        GuestComment guestComment = guestCommentRepository.getOne(guestCommentRequest.getGuestCommentId());
        if (guestComment.getUserId().equals(UUID.fromString(guestCommentRequest.getUserId()))) {
            guestComment.setContents(guestCommentRequest.getContents());
            guestCommentRepository.save(guestComment);
            return true;
        }
        return false;
    }

//    @Override
//    public GuestImageInfo updateGuestImage(GuestImageUpdateRequest guestImageUpdateRequest) throws EntityNotFoundException {
//        GuestImage guestImage = guestImageRepository.getOne(guestImageUpdateRequest.getGuestImageId());
//        if (guestImage.getUserId().equals(UUID.fromString(guestImageUpdateRequest.getUserId()))) {
//            guestImage.setContents(guestImageUpdateRequest.getContents());
//            guestImage.setImageUrl(guestImageUpdateRequest.getImageUrl()); // 동기화
//            GuestImage save = guestImageRepository.save(guestImage);
//
//            return GuestImageInfo.builder()
//                    .report(save.getReport())
//                    .imageUrl(save.getImageUrl().split(","))
//                    .guestImageId(save.getGuestImageId())
//                    .createdAt(save.getCreatedAt())
//                    .contents(save.getContents())
//                    .build();
//        }
//
//        return null;
//    }

    @Override
    public LikeCheckResponse addGuestCommentLike(GuestCommentLikeRequest guestCommentLikeRequest) {
        // guestCommentId 체크
        guestCommentRepository.findById(guestCommentLikeRequest.getGuestCommentId()).orElseThrow(EntityNotFoundException::new);

        // guestCommentLikeId 만들기
        GuestCommentLikeId guestCommentLikeId = GuestCommentLikeId.builder()
                .guestCommentId(guestCommentLikeRequest.getGuestCommentId())
                .userId(UUID.fromString(guestCommentLikeRequest.getUserId()))
                .build();

        // find
        // map -> 있으면 cancel
        // orElseGet -> 없으면 insert
        Boolean flag = guestCommentLikeRepository.findById(guestCommentLikeId)
                .map(guestCommentLike -> {
                    guestCommentLikeRepository.delete(guestCommentLike);
                    return false;
                })
                .orElseGet(() -> {
                    guestCommentLikeRepository.save(GuestCommentLike.builder()
                            .guestCommentLikeId(guestCommentLikeId)
                            .build());
                    return true;
                });

        return LikeCheckResponse.builder()
                .check(flag)
                .build();
    }

    @Override
    public LikeCheckResponse addGuestImageLike(GuestImageLikeRequest guestImageLikeRequest) {
        // guestImageId 체크
        guestImageRepository.findById(guestImageLikeRequest.getGuestImageId()).orElseThrow(EntityNotFoundException::new);

        // guestImageLikeId 만들기
        GuestImageLikeId guestImageLikeId = GuestImageLikeId.builder()
                .guestImageId(guestImageLikeRequest.getGuestImageId())
                .userId(UUID.fromString(guestImageLikeRequest.getUserId()))
                .build();

        // find
        // map -> 있으면 cancel
        // orElseGet -> 없으면 insert
        Boolean flag = guestImageLikeRepository.findById(guestImageLikeId)
                .map(guestImageLike -> {
                    guestImageLikeRepository.delete(guestImageLike);
                    return false;
                })
                .orElseGet(() -> {
                    guestImageLikeRepository.save(GuestImageLike.builder()
                            .guestImageLikeId(guestImageLikeId)
                            .build());
                    return true;
                });

        return LikeCheckResponse.builder()
                .check(flag)
                .build();
    }

    @Override
    public LikeCheckResponse addGuestCommentReport(GuestCommentLikeRequest guestCommentReportRequest) {
        //GuestCommentReportId 생성
        GuestCommentReportId guestCommentReportId = GuestCommentReportId.builder()
                .userId(UUID.fromString(guestCommentReportRequest.getUserId()))
                .guestCommentId(guestCommentReportRequest.getGuestCommentId())
                .build();

        // CommentId로 검색 : 있으면 report+1한 후 업데이트, 없으면 EntiEntityNotFoundException
        return guestCommentReportRepository.findById(guestCommentReportId).isPresent() ?
                LikeCheckResponse.builder().check(false).build() :
                guestCommentRepository.findById(guestCommentReportRequest.getGuestCommentId())
                        .map(guestComment -> {
                            guestComment.setReport(guestComment.getReport() + 1);
                            guestCommentRepository.save(guestComment);

                            // GuestCommentReport
                            guestCommentReportRepository.save(GuestCommentReport.builder()
                                    .guestCommentReportId(guestCommentReportId)
                                    .build());

                            return LikeCheckResponse.builder()
                                    .check(true)
                                    .build();
                        }).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public LikeCheckResponse addGuestImageReport(GuestImageLikeRequest guestImageReportRequest) {
        // GuestImageReportId 생성
        GuestImageReportId guestImageReportId = GuestImageReportId.builder()
                .userId(UUID.fromString(guestImageReportRequest.getUserId()))
                .guestImageId(guestImageReportRequest.getGuestImageId())
                .build();

        return guestImageReportRepository.findById(guestImageReportId).isPresent() ?
                LikeCheckResponse.builder().check(false).build() :
                guestImageRepository.findById(guestImageReportRequest.getGuestImageId())
                        .map(guestImage -> {
                            guestImage.setReport(guestImage.getReport() + 1);
                            guestImageRepository.save(guestImage);

                            // GuestImageReport
                            guestImageReportRepository.save(GuestImageReport.builder()
                                    .guestImageReportId(guestImageReportId)
                                    .build());

                            return LikeCheckResponse.builder()
                                    .check(true)
                                    .build();
                        })
                        .orElseThrow(EntityNotFoundException::new);
    }


    @Override
    public boolean deleteGuestComment(String userId, Long guestCommentId) throws EntityNotFoundException {
        GuestComment guestComment = guestCommentRepository.getOne(guestCommentId);
        if (guestComment.getUserId().equals(UUID.fromString(userId))) {
            guestComment.setDeleted(true);
            guestCommentRepository.save(guestComment);
            return true;
        }
        return false;
    }

}
