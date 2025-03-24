package com.sentinel.siem.services;

import com.sentinel.siem.models.Log;
import com.sentinel.siem.repositories.jpa.LogRepository;
import com.sentinel.siem.utils.AnomalyDetectionModel;
import com.sentinel.siem.utils.LogFeatureExtractor;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogAnomalyService {

    private final LogRepository logRepository;
    private final BlockedIPService ipBlockService;
    private final AnomalyDetectionModel anomalyDetectionModel;
    private final RealTimeMonitoringService realTimeMonitoringService;

    public LogAnomalyService(LogRepository logRepository, BlockedIPService ipBlockService, AnomalyDetectionModel anomalyDetectionModel, RealTimeMonitoringService realTimeMonitoringService) {
        this.logRepository = logRepository;
        this.ipBlockService = ipBlockService;
        this.anomalyDetectionModel = anomalyDetectionModel;
        this.realTimeMonitoringService = realTimeMonitoringService;
    }

    @Scheduled(fixedRate = 60000)// Her 60 saniyede çalıştır.
    public void processLogs() {
        List<Log> logs = logRepository.findLastHourLogs();

        if (logs.isEmpty()) {
            System.out.println("Son 1 saat içinde analiz edilecek log bulunamadı.");
            return;
        }

        INDArray features = LogFeatureExtractor.extractFeatures(logs);

        if (features == null || features.length() == 0) {
            System.out.println("Özellik çıkarma işlemi sonucunda boş veri döndü. Anomali tespiti yapılmayacak.");
            return;
        }

        // 📌 Eğer satır sayısı 1 ise reshape (1, 4) yap
        if (features.rank() == 1) {
            features = features.reshape(1, 4);
        }

        if (anomalyDetectionModel.isAnomaly(features)) {
            String ipAddress = logs.get(0).getSource();
            ipBlockService.isIPBlocked(ipAddress);

            //Anomali algılanırsa, bir uyarı kaydı ekliyoruz
            realTimeMonitoringService.createAlert(
                    "Anomali Algılandı",
                    "HIGH",
                    "Şüpheli aktivite tespit edildi! IP: " + ipAddress,
                    ipAddress
            );
        }
    }

    public boolean logsAvailable() {
        return !logRepository.findLastHourLogs().isEmpty();
    }
}
