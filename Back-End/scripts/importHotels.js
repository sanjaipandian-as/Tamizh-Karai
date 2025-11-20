import mongoose from "mongoose"
import dotenv from "dotenv"
import Hotel from "../Models/Hotel.js"
import hotels from "../data/hotels.js"

dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) {
  console.error("MONGO_URI is missing in .env file")
  process.exit(1)
}

mongoose.connect(uri).then(async () => {
  await Hotel.insertMany(hotels)
  console.log("Hotels Uploaded Successfully ✅")
  process.exit()
})
