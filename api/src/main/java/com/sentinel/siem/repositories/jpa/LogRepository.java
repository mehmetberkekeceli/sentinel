package com.sentinel.siem.repositories.jpa;

import com.sentinel.siem.models.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findByLevel(String level);

    @Query(value = "SELECT * FROM logs WHERE timestamp >= NOW() - INTERVAL '1 hour'", nativeQuery = true)
    List<Log> findLastHourLogs();
}
