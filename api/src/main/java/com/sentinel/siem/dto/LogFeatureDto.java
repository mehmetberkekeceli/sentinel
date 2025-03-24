package com.sentinel.siem.dto;

public class LogFeatureDto {
    private double hour;
    private int isError;
    private int isWarning;
    private double messageLength;

    public double getMessageLength() {
        return messageLength;
    }

    public void setMessageLength(double messageLength) {
        this.messageLength = messageLength;
    }

    public int getIsWarning() {
        return isWarning;
    }

    public void setIsWarning(int isWarning) {
        this.isWarning = isWarning;
    }

    public int getIsError() {
        return isError;
    }

    public void setIsError(int isError) {
        this.isError = isError;
    }

    public double getHour() {
        return hour;
    }

    public void setHour(double hour) {
        this.hour = hour;
    }
}
