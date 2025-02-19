package com.sentinel.siem.services;


import com.sentinel.siem.models.BlockedIP;
import com.sentinel.siem.repositories.jpa.BlockedIPRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BlockedIPService {

    private final BlockedIPRepository blockedIPRepository;

    public BlockedIPService(BlockedIPRepository blockedIPRepository) {
        this.blockedIPRepository = blockedIPRepository;
    }

    public void blockIP(String ipAdrress, int durationMinutes) {
        if (!blockedIPRepository.existsByIpAddressAndActiveTrue(ipAdrress)) {
            BlockedIP blockedIP = new BlockedIP(
                    ipAdrress,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(durationMinutes),
                    true
            );
            blockedIPRepository.save(blockedIP);
        }
    }


    public boolean isIPBlocked(String ipAddress) {
        Optional<BlockedIP> blockedIP = blockedIPRepository.findByIpAddress(ipAddress);
        return blockedIP.map(BlockedIP::isActive).orElse(false);
    }
}
