import express from "express"
import Hotel from "../Models/Hotel.js"

const router = express.Router()

router.post("/add", async (req, res) => {
  const hotel = await Hotel.create(req.body)
  res.status(201).json(hotel)
})

router.get("/all", async (req, res) => {
  const hotels = await Hotel.find().sort({ createdAt: -1 })
  res.json(hotels)
})

router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
  res.json(hotel)
})

router.delete("/:id", async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

export default router
