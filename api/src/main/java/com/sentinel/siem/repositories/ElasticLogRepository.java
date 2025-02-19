package com.sentinel.siem.repositories;

import com.sentinel.siem.models.LogEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElasticLogRepository extends ElasticsearchRepository<LogEvent, String> {
    List<LogEvent> findByEventTypeContaining(String eventType);
}
