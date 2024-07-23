import { Kafka } from "kafkajs";
import db from "./db.js";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "myGroup" });
  }

  async produce(topic, message) {
    try {
      await this.producer.connect();
      const messages = [
        {
          value: JSON.stringify(message),
        },
      ];

      await this.producer.send({
        topic: topic,
        messages: messages,
      });
    } catch (err) {
      console.log(err);
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = JSON.parse(message.value.toString());
          const tanggal_new = Array.isArray(value.tanggal)
            ? value.tanggal.join("-")
            : "Unknown";
          const jam_new = Array.isArray(value.jam)
            ? value.jam
                .slice(0, 3)
                .map((num) => num.toString().padStart(2, "0"))
                .join(":")
            : "Unknown";

          const dataToSave = new db.InfoLokomotif({
            kodeLoko: value.kodeLoko,
            namaLoko: value.namaLoko,
            dimensiLoko: value.dimensiLoko,
            status: value.status,
            tanggal: tanggal_new,
            jam: jam_new,
          });
          dataToSave
            .save()
            .then(() => {
              console.log("Data berhasil disimpan ke MongoDB");
            })
            .catch((err) => {
              console.error("Gagal menyimpan data ke MongoDB:", err);
            });
          callback(value);
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default KafkaConfig;
