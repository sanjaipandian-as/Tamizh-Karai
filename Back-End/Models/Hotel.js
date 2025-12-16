import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    reviews: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['budget', 'mid-range', 'luxury', 'resort', 'homestay', 'other']
    },
    amenities: { type: [String], default: [] },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters']
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
HotelSchema.index({ location: 1 });
HotelSchema.index({ category: 1 });
HotelSchema.index({ rating: -1 });
HotelSchema.index({ price: 1 });
HotelSchema.index({ createdAt: -1 });

// Text index for search
HotelSchema.index({
  name: 'text',
  location: 'text',
  description: 'text'
});

export default mongoose.model("Hotel", HotelSchema);

