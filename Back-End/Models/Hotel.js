import mongoose from "mongoose"

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    amenities: { type: [String], default: [] },
    description: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model("Hotel", HotelSchema)
