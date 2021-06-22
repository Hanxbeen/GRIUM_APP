package com.free.authsvr.security.oauth2.user;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo{

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        properties = (Map<String, String>) attributes.get("properties");
        kakaoAccount = (Map<String, String>)attributes.get("kakao_account");
    }
    public Map<String, String> properties;
    public Map<String, String> kakaoAccount;

    @Override
    public String getId() {
        return Integer.toString((Integer)attributes.get("id"));
    }

    @Override
    public String getName() {
        return properties.get("nickname");
    }

    @Override
    public String getEmail() {
        return kakaoAccount.get("email");
    }

    @Override
    public String getImageUrl() {
        return properties.get("profile_image");
    }

    public String getBirthday() { return kakaoAccount.get("birthday"); }
}
