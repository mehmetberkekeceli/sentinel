package com.sentinel.siem.utils;

import com.sentinel.siem.models.Log;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.factory.Nd4j;

import java.util.ArrayList;
import java.util.List;

public class LogFeatureExtractor {

    public static INDArray extractFeatures(List<Log> logs) {
        if (logs == null || logs.isEmpty()) {
            System.out.println("📢 Log listesi boş! Özellik çıkarma işlemi yapılmadı.");
            return null;
        }

        List<double[]> featureList = new ArrayList<>();

        for (Log log : logs) {
            double[] features = new double[]{
                    log.getTimestamp().getHour(), // Log'un saat bilgisi
                    log.getLevel().equals("ERROR") ? 1.0 : 0.0, // Hata log'u mu?
                    log.getLevel().equals("WARNING") ? 1.0 : 0.5, // Uyarı log'u mu?
                    log.getMessage().length() / 100.0 // Mesaj uzunluğu
            };
            featureList.add(features);
        }

        // 📌 Özellikleri bir matris haline getir
        INDArray featureMatrix = Nd4j.create(featureList.toArray(new double[0][]));

        // 📌 Eğer yalnızca tek bir satır varsa reshape (1,4) yap
        if (featureMatrix.rows() == 1) {
            featureMatrix = featureMatrix.reshape(1, 4);
        }

        return featureMatrix;
    }
}
