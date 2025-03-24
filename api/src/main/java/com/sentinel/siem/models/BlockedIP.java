package com.sentinel.siem.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "blocked_ips")
public class BlockedIP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String ipAddress;

    @Column(nullable = false)
    private LocalDateTime blockedAt;

    @Column(nullable = false)
    private LocalDateTime unblockAt;

    private boolean active;

    public BlockedIP() {
    }

    public BlockedIP(String ipAddress, LocalDateTime blockedAt, LocalDateTime unblockAt, boolean active) {
        this.ipAddress = ipAddress;
        this.blockedAt = blockedAt;
        this.unblockAt = unblockAt;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public LocalDateTime getBlockedAt() {
        return blockedAt;
    }

    public void setBlockedAt(LocalDateTime blockedAt) {
        this.blockedAt = blockedAt;
    }

    public LocalDateTime getUnblockAt() {
        return unblockAt;
    }

    public void setUnblockAt(LocalDateTime unblockAt) {
        this.unblockAt = unblockAt;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}