package com.sentinel.siem.utils;

import com.sentinel.siem.config.RabbitMQConfig;
import com.sentinel.siem.models.Log;
import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.repositories.jpa.LogRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LogProducer {
    private final RabbitTemplate rabbitTemplate;
    private final LogRepository logRepository;

    public LogProducer(RabbitTemplate rabbitTemplate, LogRepository logRepository) {
        this.rabbitTemplate = rabbitTemplate;
        this.logRepository = logRepository;
    }

    public void sendLog(String level, String message, String source, String userId) {
        Log log = new Log();
        log.setTimestamp(LocalDateTime.now());
        log.setLevel(level);
        log.setMessage(message);
        log.setSource(source);
        log.setUserId(userId);

        logRepository.save(log);

        LogEvent logEvent = new LogEvent();
        logEvent.setIpAddress(source);
        logEvent.setEventType(level);
        logEvent.setTimestamp(LocalDateTime.now());

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, logEvent);
        System.out.println("Log event sent to RabbitMQ: " + logEvent);
    }
}
