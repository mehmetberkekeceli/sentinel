package com.sentinel.siem.services;


import com.sentinel.siem.models.BlockedIP;
import com.sentinel.siem.repositories.BlockedIPRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlockedIPService {

    private final BlockedIPRepository blockedIPRepository;

    public void blockIP(String ipAdrress, int durationMinutes) {
        if (!blockedIPRepository.existsByIpAddressAndActiveTrue(ipAdrress)) {
            BlockedIP blockedIP = BlockedIP.builder()
                    .ipAddress(ipAdrress)
                    .blockedAt(LocalDateTime.now())
                    .unblockAt(LocalDateTime.now().plusMinutes(durationMinutes))
                    .active(true)
                    .build();
            blockedIPRepository.save(blockedIP);
        }
    }

    public boolean isIPBlocked(String ipAddress) {
        Optional<BlockedIP> blockedIP = blockedIPRepository.findByIpAddress(ipAddress);
        return blockedIP.map(BlockedIP::isActive).orElse(false);
    }
}
