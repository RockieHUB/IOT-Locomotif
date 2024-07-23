import Mongoose from "mongoose";

const uri =
  "STRINGMONGOURI";
const clientOptions = { maxPoolSize: 10 };

async function connectToDatabase() {
  try {
    await Mongoose.connect(uri, clientOptions);
    await Mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    // You might want to handle the error more gracefully in production, e.g., by exiting the process.
  }
}

// Define the schema and model
const InfoLokomotifSchema = new Mongoose.Schema({
  kodeLoko: String,
  namaLoko: String,
  dimensiLoko: String,
  status: String,
  tanggal: String,
  jam: String,
});
const InfoLokomotif = Mongoose.model("info-lokomotif", InfoLokomotifSchema);

export default { connectToDatabase, InfoLokomotif };
