import mongoose from "mongoose";

const OpinionSchema = new mongoose.Schema({
  opinion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Opinion ||
  mongoose.model("Opinion", OpinionSchema);
