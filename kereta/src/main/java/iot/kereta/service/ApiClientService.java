package iot.kereta.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import iot.kereta.model.InfoLocomotive;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ApiClientService {
    private final RestTemplate restTemplate;

    public ApiClientService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void callAPI(InfoLocomotive infoLoko) {
        String apiUrl = "http://localhost:8080/api/send";

        // Membuat header untuk request POST
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Membuat entitas HTTP dengan data InfoLokomotif yang akan dikirimkan
        HttpEntity<InfoLocomotive> requestEntity = new HttpEntity<>(infoLoko, headers);

        // Request POST ke API
        String response = restTemplate.postForObject(apiUrl, requestEntity, String.class);
        log.info(response);
    }
}
