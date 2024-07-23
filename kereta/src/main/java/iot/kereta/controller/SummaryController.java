package iot.kereta.controller;

import org.springframework.web.bind.annotation.RestController;

import iot.kereta.model.SummaryLocomotive;
import iot.kereta.service.SummaryLocoService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
@RequestMapping("/summaries")
@Slf4j
public class SummaryController {
    private final SummaryLocoService summaryService;

    public SummaryController(SummaryLocoService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<SummaryLocomotive>> getAllSummaryAsStream() {
        log.info("Mendapatkan Summary");
        List<SummaryLocomotive> summaries = summaryService.getAllSummary();
        return ResponseEntity.ok(summaries);
    }
}
