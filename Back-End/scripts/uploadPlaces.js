import mongoose from "mongoose"
import dotenv from "dotenv"
import Place from "../Models/Place.js"
import places from "../data/Places.js"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err))

const uploadData = async () => {
  try {
    await Place.insertMany(places, { ordered: false })
    console.log(`✅ Successfully uploaded ${places.length} records!`)
  } catch (err) {
    console.error("⚠️ Some duplicates were skipped automatically.")
  } finally {
    mongoose.connection.close()
  }
}

uploadData()
