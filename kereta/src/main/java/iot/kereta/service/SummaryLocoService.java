package iot.kereta.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import iot.kereta.model.SummaryDocument;
import iot.kereta.model.SummaryLocomotive;
import iot.kereta.repository.MongoLocoRepository;
import iot.kereta.repository.SummaryRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SummaryLocoService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SummaryLocoService.class);
    private final SummaryRepository summaryRepository;
    private final MongoTemplate mongoTemplate;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.chat-id}")
    private String chatId;

    private final RestTemplate restTemplate;

    public SummaryLocoService(
            SummaryRepository summaryRepository,
            MongoLocoRepository mongoLocoRepository,
            MongoTemplate mongoTemplate,
            RestTemplate restTemplate) {
        this.summaryRepository = summaryRepository;
        this.mongoTemplate = mongoTemplate;
        this.restTemplate = restTemplate;
    }

    public List<SummaryDocument> getDailyCounts() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("tanggal", "status")
                        .count().as("jumlah"),
                Aggregation.project("jumlah")
                        .and("_id.tanggal").as("tanggal")
                        .and("_id.status").as("status"));

        AggregationResults<SummaryDocument> results = mongoTemplate.aggregate(aggregation, "info-lokomotifs",
                SummaryDocument.class);

        return results.getMappedResults();
    }

    @Scheduled(fixedRate = 300000)
    public void saveSummary() {
        try {
            log.info("Membuat Summary");
            List<SummaryDocument> summaries = getDailyCounts();
            if (summaries.isEmpty()) {
                log.info("Summaries dari mongodb kosong");
                log.info("Entries: " + summaries.toString());
            } else {
                log.info("Summaries ada");
            }
            LocalDate today = LocalDate.now();
            Map<String, Integer> result = new HashMap<>();
            for (SummaryDocument summary : summaries) {
                if (!LocalDate.parse(summary.getTanggal(), DateTimeFormatter.ofPattern("yyyy-M-d")).isEqual(today)) {
                    continue;
                }
                result.put(summary.getStatus(), summary.getJumlah());
                String tanggal = summary.getTanggal();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d");
                LocalDate formattedDate = LocalDate.parse(tanggal, formatter);

                SummaryLocomotive sum = new SummaryLocomotive();
                sum.setTanggal(formattedDate);
                sum.setStatus(summary.getStatus());
                sum.setJumlah(summary.getJumlah());

                // save to postgresql
                try {
                    summaryRepository.save(sum);
                    LOGGER.info(String.format("Successfully push data to postgresql -> %s", sum));
                } catch (DataAccessException e) {
                    LOGGER.error("Error saving to PostgreSQL:", e);
                }

            }
            // send to telegram
            try {
                // Build the Telegram message from the map
                StringBuilder messageBuilder = new StringBuilder(
                        "Locomotive Summary for today on " + today + ":\n\n");
                Integer total = 0;
                for (Map.Entry<String, Integer> entry : result.entrySet()) {
                    messageBuilder.append(entry.getKey()) // Status
                            .append(": ")
                            .append(entry.getValue()) // Count
                            .append("\n");
                    total += entry.getValue();
                }
                String apiUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatId
                        + "&text=" + messageBuilder + "Total: " + total;
                ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, null, String.class);
                LOGGER.info(String.format("Successfully send data to telegram -> %s", response));
            } catch (Exception e) {
                LOGGER.error("Error sending Telegram message:", e);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // digunakan untuk get all data pada api get
    public List<SummaryLocomotive> getAllSummary() {
        return summaryRepository.findAll();
    }
}
