import express from "express"
import upload from "../config/multer.js"
import UserPick from "../Models/UserPick.js"
import { isAuthenticatedUser } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add", isAuthenticatedUser, upload.single("image"), async (req, res) => {
  const newPick = await UserPick.create({
    user: req.user._id,
    placeName: req.body.placeName,
    location: req.body.location,
    category: req.body.category,
    description: req.body.description,
    rating: req.body.rating,
    bestTime: req.body.bestTime,
    timeRequired: req.body.timeRequired,
    entryFee: req.body.entryFee,
    imageUrl: req.file?.path
  })
  res.status(201).json(newPick)
})

router.get("/mine", isAuthenticatedUser, async (req, res) => {
  const picks = await UserPick.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(picks)
})

router.get("/all", async (req, res) => {
  const picks = await UserPick.find().populate("user", "fullName email").sort({ createdAt: -1 })
  res.json(picks)
})

router.get("/details/:id", async (req, res) => {
  try {
    const pick = await UserPick.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("user", "fullName email")
    if (!pick) return res.status(404).json({ message: "Place not found" })
    res.json(pick)
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.put("/edit/:id", isAuthenticatedUser, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      placeName: req.body.placeName,
      location: req.body.location,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating,
      bestTime: req.body.bestTime,
      timeRequired: req.body.timeRequired,
      entryFee: req.body.entryFee
    }
    if (req.file) updateData.imageUrl = req.file.url
    const updated = await UserPick.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    console.log("FULL ERROR:", JSON.stringify(err, null, 2))
    console.log("MESSAGE:", err.message)
    console.log("STACK:", err.stack)
    return res.status(500).json({ error: err.message })
  }
})

router.delete("/delete/:id", isAuthenticatedUser, async (req, res) => {
  await UserPick.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  res.json({ message: "Deleted" })
})

export default router
