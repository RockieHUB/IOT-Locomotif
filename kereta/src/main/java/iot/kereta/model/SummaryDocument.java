package iot.kereta.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document
@Data
public class SummaryDocument {
    @Id
    private String id;
    private String tanggal;
    private String status;
    private int jumlah;
}
