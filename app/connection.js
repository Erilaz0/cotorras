import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    await mongoose.connect(process.env.MONGOURL);
    console.log("✅ MongoDB conectado");

    return mongoose.connection;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
}
