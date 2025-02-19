package com.sentinel.siem.services;

import com.sentinel.siem.models.Log;
import com.sentinel.siem.repositories.jpa.LogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogService {
    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    public List<Log> getLogsByLevel(String level) {
        return logRepository.findByLevel(level);
    }

    public Log createLog(String level, String message, String source, String userId) {
        Log log = new Log();
        log.setTimestamp(LocalDateTime.now());
        log.setLevel(level);
        log.setMessage(message);
        log.setSource(source);
        log.setUserId(userId);
        return logRepository.save(log);
    }
}
