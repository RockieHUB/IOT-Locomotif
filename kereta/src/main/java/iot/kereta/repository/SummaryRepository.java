package iot.kereta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import iot.kereta.model.SummaryLocomotive;

public interface SummaryRepository extends JpaRepository<SummaryLocomotive, Long>{

}
