package com.sentinel.siem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.sentinel.siem.repositories.jpa")
@EnableElasticsearchRepositories(basePackages = "com.sentinel.siem.repositories.elastic")
public class SentinelSiemApplication {
    public static void main(String[] args) {
        SpringApplication.run(SentinelSiemApplication.class, args);
    }
}
