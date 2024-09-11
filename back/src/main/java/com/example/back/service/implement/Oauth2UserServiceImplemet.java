package com.example.back.service.implement;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.back.entity.CustomOauth2User;
import com.example.back.entity.UserEntity;
import com.example.back.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Oauth2UserServiceImplemet extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName();

        // try {
        //     System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        // } catch (Exception e) {
        //     e.printStackTrace();
        // }

        UserEntity userEntity = null;
        String userId = null;
        if(oauthClientName.equals("kakao")) {
            userId = "kakao_" + oAuth2User.getAttributes().get("id");
            userEntity = new UserEntity(userId,"kakao");
        }

        if(oauthClientName.equals("naver")) {
            Map<String, String> responseMap = (Map<String, String>)oAuth2User.getAttributes().get("response");
            userId = responseMap.get("id").substring(0, 14);
            userEntity = new UserEntity(userId, "naver");
        }

        userRepository.save(userEntity);

        return new CustomOauth2User(userId);
    }
}
