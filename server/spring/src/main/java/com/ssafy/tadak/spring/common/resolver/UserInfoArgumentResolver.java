package com.ssafy.tadak.spring.common.resolver;

import com.ssafy.tadak.spring.auth.dto.UserInfo;
import com.ssafy.tadak.spring.common.annotation.AuthUser;
import com.ssafy.tadak.spring.common.exception.ErrorCode;
import com.ssafy.tadak.spring.common.exception.status.BadRequestException;
import com.ssafy.tadak.spring.common.exception.status.UnauthorizedException;
import com.ssafy.tadak.spring.product.exception.exception.ProductDetailNotFoundException;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class UserInfoArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthUser.class) &&
                parameter.getParameterType().equals(UserInfo.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) {
        String userId = webRequest.getHeader("X-User-Id");
        String nickname = webRequest.getHeader("X-User-Nickname");
        String role =  webRequest.getHeader("X-User-Type");

        if(userId == null){
            throw new UnauthorizedException(new ErrorCode("B4015", "인증되지 않은 요청입니다."));
        }

        return new UserInfo(Long.parseLong(userId), nickname, role);
    }
}
