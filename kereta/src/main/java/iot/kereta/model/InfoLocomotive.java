package iot.kereta.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Id;
import lombok.Data;

@Data
@Document(collection = "info-lokomotif")
public class InfoLocomotive {
    @Id
    private UUID kodeLoko;
    private String namaLoko;
    private String dimensiLoko;
    private String status;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate tanggal;
    
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime jam;

    @Override
    public String toString() {
        return "InfoLocomotive{" +
                "kodeLoko=" + kodeLoko +
                ", namaLoko='" + namaLoko + '\'' +
                ", dimensiLoko='" + dimensiLoko + '\'' +
                ", status='" + status + '\'' +
                ", tanggal=" + tanggal +
                ", jam=" + jam +
                '}';
    }
}
