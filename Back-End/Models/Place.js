const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  user: { type: String, default: "Tamizh Karai Admin" },
  placeName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 4 },
  bestTime: { type: String, required: true },
  timeRequired: { type: String, required: true },
  entryFee: { type: String, required: true },
  imageUrl: { type: String },
  
  tags: { 
    type: [String], 
    enum: ["Must Visit", "Hidden Gem", "Local Favorite", "Spiritual", "Nature", "Adventure", "Heritage", "Chill", "Family Friendly", "Couple Friendly", "Photogenic", "Educational", "Shopping"],
    default: [] 
  },
  
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);