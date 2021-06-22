package com.free.authsvr.security.oauth2;

import com.free.authsvr.entity.AuthProvider;
import com.free.authsvr.entity.RoleType;
import com.free.authsvr.entity.User;
import com.free.authsvr.exception.OAuth2AuthenticationProcessingException;
import com.free.authsvr.repository.UserRepository;
import com.free.authsvr.security.oauth2.user.OAuth2UserInfo;
import com.free.authsvr.security.oauth2.user.OAuth2UserInfoFactory;
import com.free.authsvr.security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@AllArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        // 이메일 방식으로 찾던 것을 id로 찾기 변경 ( 각 소셜별 이메일 겹칠확률 있음 )
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getId())) {
            throw new OAuth2AuthenticationProcessingException("Id not found from OAuth2 provider");
        }

        User user = userRepository.findByProviderId(oAuth2UserInfo.getId()); // providerId로 조

        if(user != null) {
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserRequest, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setRoleType(RoleType.USER); // 유저타입
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        user.setAccessToken(oAuth2UserRequest.getAccessToken().getTokenValue());

        user.setBirthday(oAuth2UserInfo.getBirthday());
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        existingUser.setAccessToken(oAuth2UserRequest.getAccessToken().getTokenValue());
        return userRepository.save(existingUser);
    }

}
