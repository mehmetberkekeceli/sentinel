package com.sentinel.siem.repositories;


import com.sentinel.siem.models.LogEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogEventRepository extends JpaRepository<LogEvent, Long> {
    List<LogEvent> findByIpAddressAndEventType(String ipAddress, String eventType);
}
