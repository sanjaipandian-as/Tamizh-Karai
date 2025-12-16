import mongoose from "mongoose";

const userPickSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User reference is required']
  },
  placeName: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
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
  views: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes for better query performance
userPickSchema.index({ user: 1 });
userPickSchema.index({ category: 1 });
userPickSchema.index({ rating: -1 });
userPickSchema.index({ createdAt: -1 });

// Text index for search
userPickSchema.index({
  placeName: 'text',
  location: 'text',
  description: 'text'
});

export default mongoose.model("UserPick", userPickSchema);

