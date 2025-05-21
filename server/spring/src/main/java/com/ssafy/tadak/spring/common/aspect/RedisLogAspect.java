package com.ssafy.tadak.spring.common.aspect;

import com.ssafy.tadak.spring.common.annotation.RedisLog;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Executor;

@Aspect
@Component
@RequiredArgsConstructor
public class RedisLogAspect {

    private final StringRedisTemplate redisTemplate;
    private final ReactiveStringRedisTemplate reactiveRedisTemplate;

    @Pointcut("@annotation(redisLog)")
    public void redisLogPointcut(RedisLog redisLog) {}

    @Async
    @AfterReturning(value = "redisLogPointcut(redisLog)", argNames = "joinPoint,redisLog")
    public void logAfterSuccess(JoinPoint joinPoint, RedisLog redisLog) {
        String productId = joinPoint.getArgs()[1].toString();

        LocalDateTime nowSeoul = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String log_key = "product_view:logs:" + nowSeoul.format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH"));

        String hit_key = "product:hits:" + productId;

        reactiveRedisTemplate.opsForValue().increment(hit_key)
                .subscribe();

        reactiveRedisTemplate.opsForList().leftPush(log_key, productId)
                .subscribe();
    }
}
