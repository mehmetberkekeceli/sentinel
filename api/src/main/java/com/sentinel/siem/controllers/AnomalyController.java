package com.sentinel.siem.controllers;

import com.sentinel.siem.services.LogAnomalyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/anomaly")
public class AnomalyController {

    private final LogAnomalyService logAnomalyService;

    public AnomalyController(LogAnomalyService logAnomalyService) {
        this.logAnomalyService = logAnomalyService;
    }

    @GetMapping("/detect")
    public ResponseEntity<String> detectedAnomalies() {
        // Logları getir
        if (logAnomalyService.logsAvailable()) {
            logAnomalyService.processLogs();
            return ResponseEntity.ok("Anomali Algılama Başladı!");
        } else {
            return ResponseEntity.status(404).body("Uyarı: Son 1 saat içinde analiz edilecek log bulunamadı!");
        }
    }
}
