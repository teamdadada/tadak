package com.ssafy.tadak.spring.payment.service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.tadak.spring.payment.dto.PaymentCustomData;
import com.ssafy.tadak.spring.payment.dto.request.PaymentRequest;
import io.portone.sdk.server.payment.PaidPayment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private final ObjectMapper objectMapper;

    public void preparePayment(PaymentRequest paymentRequest) {
        // todo: 결제창 열리면 PENDING 상태로 결제 내역 저장
    }

    /** 결제 상태를 DB에 동기화하는 메소드입니다.
     * **/
    public void syncPayment(String paymentId){
        return;
    }

    /** 결제 승인 정보와 결제 항목이 일치하는지 체크하는 메소드입니다.
     * 결제 항목 id인 item 필드을 저장하고 서버의 결제 항목 정보와 일치하는지 확인합니다.
     * **/
    private boolean verifyPayment(PaidPayment payment) {
        String customData = payment.getCustomData();
        if(customData == null || customData.isEmpty()){
            return false;
        }
        PaymentCustomData customDataDecoded;

        try{
            customDataDecoded = objectMapper.readValue(customData, PaymentCustomData.class);
        }catch(JsonProcessingException e){
            log.warn(e.getMessage());
            return false;
        }

        // todo: product 레포지토리에서 아이템들이 있는지 확인
        Object item = null;
        if(item == null){
            return false;
        }

        // todo: 가져온 아이템들의 값과 비교
        return payment.getOrderName().equals(item) &&
                payment.getAmount().equals(item) &&
                payment.getCurrency().getValue().equals(item);
    }
}
