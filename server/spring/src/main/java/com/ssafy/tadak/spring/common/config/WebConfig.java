package com.ssafy.tadak.spring.common.config;

import com.ssafy.tadak.spring.common.resolver.UserInfoArgumentResolver;
import com.ssafy.tadak.spring.mattermost.interceptor.MonitoringInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final MonitoringInterceptor monitoringInterceptor;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers){
        resolvers.add(new UserInfoArgumentResolver());
    }

//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(monitoringInterceptor)
//                .addPathPatterns("/**"); // 모든 경로에 적용
//    }
}
