package com.example.back.service.implement;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.back.entity.CustomOauth2User;
import com.example.back.entity.UserEntity;
import com.example.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Oauth2UserServiceImplemet extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName();

        System.out.println(oauthClientName);

        String userId = null;
        if (oauthClientName.equals("kakao")) {
            userId = "kakao_" + oAuth2User.getAttributes().get("id");
        } else if (oauthClientName.equals("naver")) {
            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
            userId = "naver_" + responseMap.get("id").substring(0, 14);
        } else if (oauthClientName.equals("Google")) {
            if (oAuth2User instanceof DefaultOidcUser) {
                DefaultOidcUser oidcUser = (DefaultOidcUser) oAuth2User;
                userId = "google_" + oidcUser.getSubject();
                System.out.println("Google User ID: " + userId);
            } else {
                userId = "google_" + oAuth2User.getName();
            }
        }

        if (userId == null) {
            throw new OAuth2AuthenticationException("User ID cannot be null");
        }

        UserEntity userEntity = userRepository.findByUserEmail(userId);

        if (userEntity == null) {
            userEntity = new UserEntity(userId, oauthClientName);
            userRepository.save(userEntity);
        }

        return new CustomOauth2User(userId);
    }
}
