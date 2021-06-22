package com.free.transactionserver.payload.transaction;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReadyResponse {
    String tid;
    String next_redirect_app_url;
    String next_redirect_mobile_url;
    String next_redirect_pc_url;
    String android_app_scheme;
    String ios_app_scheme;
    Date created_at;
}
