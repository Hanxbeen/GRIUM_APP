package com.free.transactionserver.controller;

import java.util.List;
import java.util.Map;

import com.free.transactionserver.entity.TransactionHistory;
import com.free.transactionserver.payload.transaction.ApprovalProperty;
import com.free.transactionserver.payload.transaction.ApprovalResponse;
import com.free.transactionserver.payload.transaction.ReadyProperty;
import com.free.transactionserver.payload.transaction.ReadyResponse;
import com.free.transactionserver.service.TransactionHistoryService;
import com.free.transactionserver.utils.RestApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
@Tag(name = "transaction", description = "거래 기록 관리 API")
public class TransactionController {

    @Autowired
    private TransactionHistoryService thService;

    private static final String KAKAO_KEY = "0965decdec09143591096fa013f01a6b";

    private static final String BASE_URL = "https://grium.me";

    @Operation(summary = "거래 기록 조회", description = "dead_id를 이용하여 해당 기억공간의 모든 부조금 거래 내역을 조회한다.")
    @GetMapping("/{dead_id}")
    public ResponseEntity<?> getTransactionHistoryByDeadId(@PathVariable("dead_id") String dead_id) {
        HttpStatus hs;
        List<TransactionHistory> th;

        try {
            th = thService.getTransactionHistoryByDeadId(dead_id);
            hs = HttpStatus.OK;
        } catch (Exception e) {
            th = null;
            hs = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<List<TransactionHistory>>(th, hs);
    }

    @PostMapping
    public ResponseEntity<?> addTestTransactionHistory(@RequestBody TransactionHistory th) {
        HttpStatus hs;

        try {
            thService.testAdd();
            hs = HttpStatus.OK;
        } catch (Exception e) {
            hs = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(hs);
    }

    @DeleteMapping("/{tid}")
    public ResponseEntity<?> deleteTransactionHistory(@PathVariable("tid") Long tid) {
        HttpStatus hs = null;

        try {
            thService.deleteTransactionHistory(tid);
            hs = HttpStatus.OK;
        } catch (Exception e) {
            hs = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(hs);
    }

    @GetMapping("/statistics/{dead_id}")
    @Operation(summary = "기록 공간의 거래 통계 정보조회", description = "dead_id를 이용하여 해당 기억공간의 관련인원별로 받은 부조금의 합계를 조회한다.")
    public ResponseEntity<?> getCondolenceStatistics(@PathVariable String dead_id) {
        HttpStatus hs;
        List<Map<String, Object>> result = null;
        try {
            result = thService.getCondolenceStatistics(dead_id);
            hs = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            hs = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(result, hs);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        RestApi api = new RestApi();
        String strUrl = "http://localhost:8081/transaction/statistics/1";
        String result = null;
        result = api.get(strUrl);
        System.out.println("result :" + result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "카카오페이 결제 준비 api(현재 테스트 cid사용)", description = "카카오페이 결제를 시작하기 위해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(tid)를 받는 단계. 서버는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 redirectUrl을 제공")
    @PostMapping("/kakaopay/ready")
    public ResponseEntity<?> readyKakaopay(@RequestBody ReadyProperty readyProperty) {
        RestTemplate restTemplate = new RestTemplate();

        // item_name상품명, quantity상품 수량, total_amount상품 총액 받아야함, partner_order_id,
        // partner_user_id도 받아야함
        // tax_free_amount상품 바과세 금액

        readyProperty.setCid("TC0ONETIME");// cid는 가맹점 코드로 카카오페이에 연락해서 받아야함. 지금은 테스트용cid
        // 프론트 주소로 변경 해야함
        readyProperty.setTax_free_amount(0);
        readyProperty.setApproval_url(BASE_URL + "/redirect");
        readyProperty.setCancel_url(BASE_URL + "/redirect");
        readyProperty.setFail_url(BASE_URL + "/redirect");

        ReadyResponse readyResponse;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "KakaoAK " + KAKAO_KEY);
            headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

            MultiValueMap<String, Object> params = new LinkedMultiValueMap<String, Object>();
            params.add("cid", readyProperty.getCid());
            params.add("partner_order_id", readyProperty.getPartner_order_id());
            params.add("partner_user_id", readyProperty.getPartner_user_id());
            params.add("item_name", readyProperty.getItem_name());
            params.add("quantity", readyProperty.getQuantity());
            params.add("total_amount", readyProperty.getTotal_amount());
            params.add("tax_free_amount", readyProperty.getTax_free_amount());
            params.add("approval_url", readyProperty.getApproval_url());
            params.add("cancel_url", readyProperty.getCancel_url());
            params.add("fail_url", readyProperty.getFail_url());

            HttpEntity<MultiValueMap<String, Object>> body = new HttpEntity<MultiValueMap<String, Object>>(params,
                    headers);

            readyResponse = restTemplate.postForObject("https://kapi.kakao.com/v1/payment/ready", body,
                    ReadyResponse.class);

            return new ResponseEntity<ReadyResponse>(readyResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "카카오페이 성공", description = "카카오페이 성공시 백엔드로 정보 넘겨주기 위한 api")
    @PostMapping("/kakaopay/success")
    public ResponseEntity<?> kakaoPaySuccess(@RequestBody ApprovalProperty approvalProperty) {
        System.out.println("pg_token : " + approvalProperty.getPg_token());

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + KAKAO_KEY);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        approvalProperty.setCid("TC0ONETIME");

        MultiValueMap<String, Object> params = new LinkedMultiValueMap<String, Object>();
        params.add("cid", approvalProperty.getCid());
        params.add("tid", approvalProperty.getTid());
        params.add("partner_order_id", approvalProperty.getPartner_order_id());
        params.add("partner_user_id", approvalProperty.getPartner_user_id());
        params.add("pg_token", approvalProperty.getPg_token());
        params.add("total_amount", approvalProperty.getTotal_amount());

        HttpEntity<MultiValueMap<String, Object>> body = new HttpEntity<MultiValueMap<String, Object>>(params, headers);

        ApprovalResponse approvalResponse;
        try {
            approvalResponse = restTemplate.postForObject("https://kapi.kakao.com/v1/payment/approve", body,
                    ApprovalResponse.class);
            thService.addTransactionHistory(approvalResponse, approvalProperty.getDeadId());
            return new ResponseEntity<ApprovalResponse>(approvalResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    // @GetMapping("/kakaopay/cancel")
    // public ResponseEntity<?> kakaoPayCancel() {
    // return new ResponseEntity<String>("Cancel", HttpStatus.OK);
    // }

    // @GetMapping("/kakaopay/fail")
    // public ResponseEntity<?> kakaoPayFail() {
    // return new ResponseEntity<String>("Fail", HttpStatus.OK);
    // }

}
