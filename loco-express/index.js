import bodyParser from "body-parser";
import express from "express";
import KafkaConfig from "./config.js";
import controllers from "./controller.js";
import DB from "./db.js";

const app = express();
const jsonParser = bodyParser.json();

//Connect to MongoDB
DB.connectToDatabase();

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

//api post data to kafka
app.post("/api/send", jsonParser, controllers.sendMessageToKafka);

// consume message from kafka
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("info-lokomotif", (value) => {
  console.log("Consume dari Kafka: " + value);
});
