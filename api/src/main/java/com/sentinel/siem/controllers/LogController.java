package com.sentinel.siem.controllers;

import com.sentinel.siem.models.Log;
import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.repositories.elastic.ElasticLogRepository;
import com.sentinel.siem.services.LogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    private final LogService logService;
    private final ElasticLogRepository elasticLogRepository;

    public LogController(LogService logService, ElasticLogRepository elasticLogRepository) {
        this.logService = logService;
        this.elasticLogRepository = elasticLogRepository;
    }

    @GetMapping
    public ResponseEntity<List<Log>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    @GetMapping("/{id}")
    public Optional<LogEvent> getLogById(@PathVariable String id) {
        return elasticLogRepository.findById(id);
    }

    @GetMapping("/search")
    public Iterable<LogEvent> searchLogs(@RequestParam String message) {
        return elasticLogRepository.findByEventTypeContaining(message);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Log>> getLogsByLevel(@PathVariable String level) {
        return ResponseEntity.ok(logService.getLogsByLevel(level));
    }

    @PostMapping
    public ResponseEntity<Log> createLog(@RequestBody Log log) {
        Log createdLog = logService.createLog(log.getLevel(), log.getMessage(), log.getSource(), log.getUserId());
        return ResponseEntity.ok(createdLog);
    }
}
