package com.free.authsvr.security.oauth2.user;


import com.free.authsvr.entity.AuthProvider;
import com.free.authsvr.exception.OAuth2AuthenticationProcessingException;
import com.free.authsvr.util.RandomStringGenerator;

import java.util.HashMap;
import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        attributes = NameNulltoRandomName(attributes); // username null => random string
        if(registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())){
            return new KakaoOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }

    public static Map<String, Object> NameNulltoRandomName(Map<String, Object> attributes){
        attributes.forEach((k, v)->{
            System.out.println(k + " : " + v);
        });
        if(attributes.get("name")==null){
            Map<String, Object> new_attributes = new HashMap<>(attributes); // attributes는 of로 만들어져서 불변인듯..
            new_attributes.replace("name", RandomStringGenerator.generateName());
            return new_attributes;
        }
        return attributes;
    }
}
