package com.sentinel.siem.services;

import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.repositories.jpa.LogEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RuleEngineService {
    private static final int FAILED_LOGIN_THRESHOLD = 3;
    private static final int BLOCK_DURATION_MINUTES = 30;
    private final LogEventRepository logEventRepository;
    private final BlockedIPService blockedIPService;

    public RuleEngineService(LogEventRepository logEventRepository, BlockedIPService blockedIPService) {
        this.logEventRepository = logEventRepository;
        this.blockedIPService = blockedIPService;
    }

    public void processLog(LogEvent logEvent) {
        if ("FAILED_LOGIN".equals(logEvent.getEventType())) {
            List<LogEvent> failedAttempts = logEventRepository.findByIpAddressAndEventType(logEvent.getIpAddress(), "FAILED_LOGIN");

            if (failedAttempts.size() >= FAILED_LOGIN_THRESHOLD) {
                blockedIPService.blockIP(logEvent.getIpAddress(), BLOCK_DURATION_MINUTES);
                System.out.println("IP Engellendi: " + logEvent.getIpAddress());
            }
        }
    }
}
