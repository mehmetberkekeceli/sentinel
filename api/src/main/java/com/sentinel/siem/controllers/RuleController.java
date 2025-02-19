package com.sentinel.siem.controllers;

import com.sentinel.siem.models.LogEvent;
import com.sentinel.siem.services.RuleEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/rules")
public class RuleController {
    private final RuleEngineService ruleEngineService;

    public RuleController(RuleEngineService ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
    }

    @PostMapping("/log")
    public ResponseEntity<String> receiveLog(@RequestBody LogEvent logEvent) {
        logEvent.setTimestamp(LocalDateTime.now());
        ruleEngineService.processLog(logEvent);
        return ResponseEntity.ok("Log processed successfully");
    }
}
