package com.ssafy.tadak.spring.payment.controller;

import com.ssafy.tadak.spring.payment.dto.Item;
import com.ssafy.tadak.spring.payment.dto.PortOneSecret;
import com.ssafy.tadak.spring.payment.service.PaymentService;
import io.portone.sdk.server.common.Currency;
import io.portone.sdk.server.payment.PaymentClient;
import io.portone.sdk.server.webhook.WebhookVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pay")
@RequiredArgsConstructor
public class PaymentController {
    //아이템 임시 객체
    private static final Map<String, Item> items = Map.of("shoes", new Item("shoes", "신발", 1000, Currency.Krw.INSTANCE.getValue()));

//    private final PortOneSecret secret;
//    private final PaymentService paymentService;
//
//    private PaymentClient paymentClient = new PaymentClient(
//            secret.apiKey(), "https://api.portone.io", null
//    );
//    private WebhookVerifier webhookVerifier = new WebhookVerifier(secret.webhookKey());

    /**아이템 가져오기 (임시 엔드포인트)
     * 결제 테스트를 위한 임시 아이템을 가져옵니다.
     * 프론트와 연결 시 Item dto와 함깨 삭제되어야 합니다.
     * **/
    @GetMapping("/item")
    public Item getItem() {
        return items.get("shoes");
    }
}
