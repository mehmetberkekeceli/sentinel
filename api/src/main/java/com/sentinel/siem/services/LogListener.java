package com.sentinel.siem.services;

import com.sentinel.siem.config.RabbitMQConfig;
import com.sentinel.siem.models.Log;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("rabbit-enabled")
public class LogListener {

    private final RealTimeMonitoringService realTimeMonitoringService;

    public LogListener(RealTimeMonitoringService realTimeMonitoringService) {
        this.realTimeMonitoringService = realTimeMonitoringService;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveLog(Log log) {
        System.out.println("Received log: " + log);

        //Gelen logu işlemek için servise gönderiyoruz.
        realTimeMonitoringService.processLog(log);
    }
}
