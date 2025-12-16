import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  user: { type: String, default: "Tamizh Karai Admin" },
  placeName: {
    type: String,
    required: [true, 'Place name is required'],
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['temple', 'beach', 'hill', 'museum', 'park', 'heritage', 'waterfall', 'fort', 'monument', 'other']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  rating: {
    type: Number,
    default: 4,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  bestTime: {
    type: String,
    required: [true, 'Best time to visit is required']
  },
  timeRequired: {
    type: String,
    required: [true, 'Time required is required']
  },
  entryFee: {
    type: String,
    required: [true, 'Entry fee information is required']
  },
  imageUrl: { type: String },

  tags: {
    type: [String],
    enum: [
      "Must Visit", "Hidden Gem", "Local Favorite", "Spiritual",
      "Nature", "Adventure", "Heritage", "Chill", "Family Friendly",
      "Couple Friendly", "Photogenic", "Educational", "Shopping"
    ],
    default: []
  },

  views: { type: Number, default: 0 },
}, { timestamps: true });

// Indexes for better query performance
// Note: placeName already has index from unique: true
placeSchema.index({ district: 1 });
placeSchema.index({ category: 1 });
placeSchema.index({ rating: -1 });
placeSchema.index({ views: -1 });
placeSchema.index({ createdAt: -1 });

// Text index for search functionality
placeSchema.index({
  placeName: 'text',
  location: 'text',
  description: 'text',
  district: 'text'
});

export default mongoose.model("Place", placeSchema);
