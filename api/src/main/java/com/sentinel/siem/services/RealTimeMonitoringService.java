package com.sentinel.siem.services;

import com.sentinel.siem.models.Alert;
import com.sentinel.siem.models.Log;
import com.sentinel.siem.repositories.jpa.AlertRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RealTimeMonitoringService {

    private final AlertRepository alertRepository;

    public RealTimeMonitoringService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public void processLog(Log log) {
        // Kural 1: Çoklu başarısız giriş denemesi
        if ("ERROR".equals(log.getLevel()) && log.getMessage().contains("Failed login attempt")) {
            createAlert("Failed Login Attempt", "WARN", "Multiple failed login attempts detected from source: " + log.getSource(), log.getSource(), log.getTimestamp(), log.getUserId());
        }

        // Kural 2: Kritik sistem hatası
        if ("CRITICAL".equals(log.getLevel())) {
            createAlert("Critical System Error", "CRITICAL", "A critical error occurred: " + log.getMessage(), log.getSource(), log.getTimestamp(), log.getUserId());
        }
    }

    // Varsayılan Alert oluşturma metodu
    private void createAlert(String type, String severity, String message, String ipAddress, LocalDateTime timestamp, String userId) {
        Alert alert = new Alert();
        alert.setType(type);
        alert.setSeverity(severity);
        alert.setMessage(message);
        alert.setIpAddress(ipAddress);
        alert.setTimestamp(timestamp != null ? timestamp : LocalDateTime.now());
        alert.setUserId(userId);

        alertRepository.save(alert);

        System.out.println("📢 Yeni Uyarı Oluşturuldu: " + alert);
    }

    //IP Adresi ve Mesaj ile Alert oluşturma
    public void createAlert(String type, String severity, String message, String ipAddress) {
        createAlert(type, severity, message, ipAddress, LocalDateTime.now(), null);
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public List<Alert> getAlertsBySeverity(String severity) {
        return alertRepository.findBySeverity(severity);
    }
}
