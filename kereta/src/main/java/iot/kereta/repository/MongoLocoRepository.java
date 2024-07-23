package iot.kereta.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import iot.kereta.model.InfoLocomotive;

public interface MongoLocoRepository extends MongoRepository<InfoLocomotive, UUID>{

}
