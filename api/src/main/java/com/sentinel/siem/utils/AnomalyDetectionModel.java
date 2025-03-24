package com.sentinel.siem.utils;

import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.DenseLayer;
import org.deeplearning4j.nn.conf.layers.OutputLayer;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.learning.config.Adam;
import org.nd4j.linalg.lossfunctions.LossFunctions;
import org.nd4j.linalg.ops.transforms.Transforms;
import org.springframework.stereotype.Component;

@Component
public class AnomalyDetectionModel {

    private final MultiLayerNetwork model;

    public AnomalyDetectionModel() {
        int inputSize = 4; // Loglardan çıkartılan feature sayısı

        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                .seed(123)
                .updater(new Adam(0.001)) // Öğrenme oranı için Adam optimizer
                .list()
                .layer(0, new DenseLayer.Builder()
                        .nIn(inputSize)
                        .nOut(3)
                        .activation(Activation.RELU)
                        .build())
                .layer(1, new DenseLayer.Builder()
                        .nIn(3)
                        .nOut(3)
                        .activation(Activation.RELU)
                        .build())
                .layer(2, new OutputLayer.Builder()
                        .nIn(3)
                        .nOut(inputSize)
                        .activation(Activation.IDENTITY)
                        .lossFunction(LossFunctions.LossFunction.MSE) // Mean Squared Error kullanarak hatayı ölç
                        .build())
                .build();

        this.model = new MultiLayerNetwork(conf);
        this.model.init();
    }

    /**
     * Belirli bir log kümesini alır ve anomali olup olmadığını kontrol eder.
     *
     * @param features Log'dan çıkarılan özellikler
     * @return Eğer hata oranı yüksekse (MSE threshold'u geçerse) true döner.
     */
    public boolean isAnomaly(INDArray features) {
        INDArray output = model.output(features);
        double mse = Transforms.pow(features.sub(output), 2).sumNumber().doubleValue(); // Hata (Mean Squared Error)
        return mse > 0.1; // Eğer hata eşiğini geçerse anomali olarak işaretle
    }
}
