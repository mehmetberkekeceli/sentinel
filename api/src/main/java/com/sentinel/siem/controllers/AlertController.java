package com.sentinel.siem.controllers;

import com.sentinel.siem.models.Alert;
import com.sentinel.siem.services.RealTimeMonitoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final RealTimeMonitoringService realTimeMonitoringService;

    public AlertController(RealTimeMonitoringService realTimeMonitoringService) {
        this.realTimeMonitoringService = realTimeMonitoringService;
    }

    @GetMapping
    public ResponseEntity<List<Alert>> getAllAlerts() {
        return ResponseEntity.ok(realTimeMonitoringService.getAllAlerts());
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<Alert>> getAlertsBySeverity(@PathVariable String severity) {
        return ResponseEntity.ok(realTimeMonitoringService.getAlertsBySeverity(severity));
    }

    @GetMapping("/severity-counts")
    public ResponseEntity<Map<String, Long>> getSeverityCounts() {
        List<Alert> alerts = realTimeMonitoringService.getAllAlerts();
        Map<String, Long> severityCounts = alerts.stream()
                .collect(Collectors.groupingBy(Alert::getSeverity, Collectors.counting()));

        return ResponseEntity.ok(severityCounts);
    }
}
