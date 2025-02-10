package com.sentinel.siem.repositories;

import com.sentinel.siem.models.BlockedIP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlockedIPRepository extends JpaRepository<BlockedIP, Long> {
    Optional<BlockedIP> findByIpAddress(String ipAddress);

    boolean existsByIpAddressAndActiveTrue(String ipAddress);
}
