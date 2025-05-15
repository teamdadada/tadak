package com.ssafy.tadak.spring.mattermost.infrastructure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MattermostNotifier {

    @Value("${mattermost.webhook-url}")
    private String MM_WEBHOOK_URL;

    public void send(String text) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String payload = "{\"text\": " + toJsonString(text) + "}";

        HttpEntity<String> request = new HttpEntity<>(payload, headers);
        restTemplate.postForEntity(MM_WEBHOOK_URL, request, String.class);
    }

    private String toJsonString(String text) {
        return "\"" + text.replace("\"", "\\\"") + "\"";
    }
}
