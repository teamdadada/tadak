package com.ssafy.tadak.spring.mattermost.interceptor;

import com.ssafy.tadak.spring.mattermost.infrastructure.MattermostNotifier;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MonitoringInterceptor implements HandlerInterceptor {

    private final MattermostNotifier mattermostNotifier;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws IOException {
        // Request 정보
        String method = request.getMethod();
        String endpoint = request.getRequestURI();
        String queryString = Optional.ofNullable(request.getQueryString()).orElse("N/A");

        // Header 포매팅 (가로 → 세로 정렬)
        String headers = Collections.list(request.getHeaderNames())
                .stream()
                .map(h -> String.format("%-15s: %s", h, request.getHeader(h))) // 키-값 정렬
                .collect(Collectors.joining("\n"));

        // Response 정보
        int status = response.getStatus();

        // 메시지 템플릿
        String msg = String.format("""
        :white_check_mark: **정상 요청**
        ### [%s] %s
        **Status**
        ```
        %s
        ```
        **Query**
        ```
        %s
        ```
        **Headers**
        ```
        %s
        ```
        """,
                method, endpoint,
                status,
                queryString,
                headers
        );

        mattermostNotifier.send(msg);
    }
}
