package iot.kereta.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import iot.kereta.model.InfoLocomotive;

@Service
public class InfoLocomotiveService {
    private static final List<String> predefinedNames = List.of("Locomotive", "Kereta", "Loco", "KAI", "Kereta Api");
    private static final List<String> predefinedDimensions = List.of("200x300", "300x400", "400x500", "500x600",
            "600x700");
    private static final List<String> predefinedStatues = List.of("Active", "Inactive");

    private static final Logger LOGGER = LoggerFactory.getLogger(InfoLocomotiveService.class);

    private static ApiClientService apiClientService;

    public InfoLocomotiveService(ApiClientService apiClientService) {
        InfoLocomotiveService.apiClientService = apiClientService;
    }

    @Scheduled(fixedRate = 10000)
    public static InfoLocomotive generateDummyinfoLoco() {
        InfoLocomotive infoLoco = new InfoLocomotive();

        infoLoco.setKodeLoko(UUID.randomUUID());
        infoLoco.setNamaLoko(generateRandomName());
        infoLoco.setDimensiLoko(generateRandomDimension());
        infoLoco.setStatus(generateRandomStatus());
        infoLoco.setTanggal(LocalDate.now());
        infoLoco.setJam(LocalTime.now());

        // Call api post dari node js
        apiClientService.callAPI(infoLoco);

        LOGGER.info(String.format("Data => %s", infoLoco.toString()));
        return infoLoco;
    }

    public static String generateRandomName() {
        Random random = new Random();
        int randomIndex = random.nextInt(predefinedNames.size());

        return predefinedNames.get(randomIndex);
    }

    public static String generateRandomDimension() {
        Random random = new Random();
        int randomIndex = random.nextInt(predefinedDimensions.size());

        return predefinedDimensions.get(randomIndex);
    }

    public static String generateRandomStatus() {
        Random random = new Random();
        int randomIndex = random.nextInt(predefinedStatues.size());

        return predefinedStatues.get(randomIndex);
    }
}
