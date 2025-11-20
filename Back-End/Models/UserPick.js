const mongoose = require("mongoose");

const userPickSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  placeName: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 4 },
  bestTime: { type: String, required: true },
  timeRequired: { type: String, required: true },
  entryFee: { type: String, required: true },
  imageUrl: { type: String },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("UserPick", userPickSchema);
