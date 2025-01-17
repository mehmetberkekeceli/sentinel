package com.sentinel.siem.repositories;

import com.sentinel.siem.models.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    // Zaman aralığına göre uyarıları listele
    List<Alert> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    // Belirli bir şiddetteki uyarıları listele
    List<Alert> findBySeverity(String severity);
}
