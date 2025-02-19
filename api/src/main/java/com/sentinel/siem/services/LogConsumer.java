package com.sentinel.siem.services;

import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.repositories.ElasticLogRepository;
import com.sentinel.siem.repositories.LogEventRepository;
import com.sentinel.siem.repositories.LogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogConsumer {
    private final ElasticLogRepository elasticLogRepository;
    private final LogEventRepository logEventRepository;
    private final LogRepository logRepository;

    @RabbitListener(queues = "logs.queue")
    public void receiveLogEvent(LogEvent logEvent) {
        System.out.println("Received log event from RabbitMQ: " + logEvent);

        // save Elasticsearch
        elasticLogRepository.save(logEvent);

        //ClickHouse/SQLDB
        LogEvent savedEvent = new LogEvent();
        savedEvent.setIpAddress(logEvent.getIpAddress());
        savedEvent.setEventType(logEvent.getEventType());
        savedEvent.setTimestamp(logEvent.getTimestamp());
        logEventRepository.save(savedEvent);
    }
}
