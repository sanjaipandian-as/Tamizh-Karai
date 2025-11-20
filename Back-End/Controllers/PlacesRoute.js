import express from "express"
import Place from "../Models/Place.js"
import upload from "../config/multer.js"
import { isAuthenticatedUser } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add", isAuthenticatedUser, upload.single("image"), async (req, res) => {
  const place = await Place.create({
    user: "Tamizh Karai Admin",
    placeName: req.body.placeName,
    location: req.body.location,
    district: req.body.district,
    category: req.body.category,
    description: req.body.description,
    rating: req.body.rating,
    bestTime: req.body.bestTime,
    timeRequired: req.body.timeRequired,
    entryFee: req.body.entryFee,
    tags: req.body.tags,
    imageUrl: req.file?.path
  })
  res.status(201).json(place)
})

router.get("/all", async (req, res) => {
  const places = await Place.find().sort({ createdAt: -1 })
  res.json(places)
})

router.get("/famous", async (req, res) => {
  const places = await Place.find().sort({ views: -1, rating: -1 })
  res.json(places)
})

router.get("/:id", async (req, res) => {
  const place = await Place.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  )
  if (!place) return res.status(404).json({ message: "Place not found" })
  res.json(place)
})

router.put("/edit/:id", isAuthenticatedUser, upload.single("image"), async (req, res) => {
  const updateData = {
    placeName: req.body.placeName,
    location: req.body.location,
    district: req.body.district,
    category: req.body.category,
    description: req.body.description,
    rating: req.body.rating,
    bestTime: req.body.bestTime,
    timeRequired: req.body.timeRequired,
    entryFee: req.body.entryFee,
    tags: req.body.tags
  }
  if (req.file) updateData.imageUrl = req.file.path
  const updated = await Place.findByIdAndUpdate(req.params.id, updateData, { new: true })
  if (!updated) return res.status(404).json({ message: "Place not found" })
  res.json(updated)
})

router.delete("/:id", isAuthenticatedUser, async (req, res) => {
  const deleted = await Place.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Place not found or unauthorized" })
  res.json({ message: "Deleted successfully" })
})

export default router
