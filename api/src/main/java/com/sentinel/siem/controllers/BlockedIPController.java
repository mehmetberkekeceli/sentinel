package com.sentinel.siem.controllers;

import com.sentinel.siem.models.BlockedIP;
import com.sentinel.siem.repositories.jpa.BlockedIPRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blocked-ips")
public class BlockedIPController {

    private final BlockedIPRepository blockedIPRepository;

    public BlockedIPController(BlockedIPRepository blockedIPRepository) {
        this.blockedIPRepository = blockedIPRepository;
    }

    @GetMapping
    public List<BlockedIP> getBlockedIPs() {
        return blockedIPRepository.findAll();
    }
}
