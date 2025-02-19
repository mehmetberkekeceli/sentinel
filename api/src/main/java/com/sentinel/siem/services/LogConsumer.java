package com.sentinel.siem.services;

import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.repositories.elastic.ElasticLogRepository;
import com.sentinel.siem.repositories.jpa.LogEventRepository;
import com.sentinel.siem.repositories.jpa.LogRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class LogConsumer {
    private final ElasticLogRepository elasticLogRepository;
    private final LogEventRepository logEventRepository;
    private final LogRepository logRepository;

    public LogConsumer(ElasticLogRepository elasticLogRepository, LogEventRepository logEventRepository, LogRepository logRepository) {
        this.elasticLogRepository = elasticLogRepository;
        this.logEventRepository = logEventRepository;
        this.logRepository = logRepository;
    }

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
