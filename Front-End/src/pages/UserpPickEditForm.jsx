import { useState, useRef, useEffect } from "react"
import { Star, Upload, X } from "lucide-react"
import { Button } from "../componants/ui/Button"
import { Input } from "../componants/ui/Input"
import Label from "../componants/ui/Label"
import Textarea from "../componants/ui/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../componants/ui/Select"
import Separator from "../componants/ui/Separator"
import API from "../../API"

function ToastMessage({ type, message }) {
  return (
    <div className={`px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md border shadow-lg
      ${type === "success" ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-red-500/20 border-red-500 text-red-300"}`}>
      {message}
    </div>
  )
}

export default function UserPickEditForm({ onClose, onSubmit, editData }) {
  const [toastMsg, setToastMsg] = useState(null)
  const [toastType, setToastType] = useState("success")

  const showToast = (type, msg) => {
    setToastType(type)
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2000)
  }

  const [formData, setFormData] = useState({
    placeName: "",
    location: "",
    category: "",
    description: "",
    rating: 4,
    bestTime: "",
    timeRequired: "",
    entryFee: "",
    image: null
  })

  const fileInputRef = useRef(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (editData) {
      setFormData({
        placeName: editData.placeName,
        location: editData.location,
        category: editData.category,
        description: editData.description,
        rating: editData.rating,
        bestTime: editData.bestTime,
        timeRequired: editData.timeRequired,
        entryFee: editData.entryFee,
        image: null
      })
      setImagePreview(editData.imageUrl || null)
    }
  }, [editData])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setFormData({ ...formData, image: null })
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const data = new FormData()
      data.append("placeName", formData.placeName)
      data.append("location", formData.location)
      data.append("category", formData.category)
      data.append("description", formData.description)
      data.append("rating", formData.rating)
      data.append("bestTime", formData.bestTime)
      data.append("timeRequired", formData.timeRequired)
      data.append("entryFee", formData.entryFee)
      if (formData.image instanceof File) data.append("image", formData.image)

      const res = await API.put(`/api/picks/edit/${editData._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })

      showToast("success", "Updated Successfully")
      onSubmit(res.data)
      onClose()
    } catch (err) {
      showToast("error", err?.response?.data?.error || "Failed to Update")
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000]">
          <ToastMessage type={toastType} message={toastMsg} />
        </div>
      )}

      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_0_40px_rgba(251,146,60,0.35)] max-h-[92vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Edit Place</h3>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto pr-2 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Place Name *</Label>
              <Input value={formData.placeName} onChange={(e) => setFormData({ ...formData, placeName: e.target.value })} className="bg-neutral-800/50 border-neutral-700/50" required />
            </div>
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-neutral-800/50 border-neutral-700/50" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border border-neutral-800 text-white z-[9999]">
                  <SelectItem value="Temple">Temple</SelectItem>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="Hill Station">Hill Station</SelectItem>
                  <SelectItem value="Historical">Historical Site</SelectItem>
                  <SelectItem value="Wildlife">Wildlife Sanctuary</SelectItem>
                  <SelectItem value="Cultural">Cultural Site</SelectItem>
                  <SelectItem value="Adventure">Adventure Spot</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Best Time *</Label>
              <Input value={formData.bestTime} onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })} className="bg-neutral-800/50 border-neutral-700/50" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time Required *</Label>
            <Select value={formData.timeRequired} onValueChange={(v) => setFormData({ ...formData, timeRequired: v })}>
              <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border border-neutral-800 text-white z-[9999]">
                <SelectItem value="1 hour or below">1 hour or below</SelectItem>
                <SelectItem value="1 - 3 hours">1 to 3 hours</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
                <SelectItem value="Full Day">Full Day</SelectItem>
                <SelectItem value="Above Full Day">Above Full Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Entry Fee *</Label>
            <Select value={formData.entryFee} onValueChange={(v) => setFormData({ ...formData, entryFee: v })}>
              <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white">
                <SelectValue placeholder="Select fee" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border border-neutral-800 text-white z-[9999]">
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="₹10/Person">₹10 Rs</SelectItem>
                <SelectItem value="₹20/Person">₹20 Rs</SelectItem>
                <SelectItem value="₹30/Person">₹30 Rs</SelectItem>
                <SelectItem value="Below ₹100/Person">Below ₹100 Rs</SelectItem>
                <SelectItem value="Below ₹200/Person">Below ₹200 Rs</SelectItem>
                <SelectItem value="Above ₹200/Person">Above ₹200 Rs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-neutral-800/50 border-neutral-700/50 min-h-[120px]" required />
          </div>

          <div className="space-y-2">
            <Label>Your Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button key={rating} type="button" onClick={() => setFormData({ ...formData, rating })}>
                  <Star className={`w-7 h-7 ${rating <= formData.rating ? "text-amber-400 fill-amber-400" : "text-neutral-600"}`} />
                </button>
              ))}
              <span className="ml-2 font-semibold text-amber-400">{formData.rating}.0</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Change Photo</Label>
            {imagePreview ? (
              <div className="relative w-40 h-40 mx-auto">
                <img src={imagePreview} className="w-full h-full rounded-xl object-cover border border-neutral-700" />
                <button onClick={removeImage} type="button" className="absolute -top-2 -right-2 p-1 bg-black/70 rounded-full">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current.click()} className="w-150 h-50 border-2 border-dashed border-neutral-700/50 rounded-xl flex flex-col items-center justify-center hover:border-orange-500/50 cursor-pointer mx-auto">
                <Upload className="w-10 h-10 text-neutral-500" />
                <p className="text-neutral-400 text-sm mt-1">Upload Image</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <Separator className="bg-neutral-800" />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="border-neutral-700/50">Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-amber-500 font-semibold">Update</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
