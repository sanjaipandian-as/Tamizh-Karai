import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../../API"
import ImageWithFallback from "../componants/figma/ImageWithFallback"
import { Star, MapPin, Clock, Share2, ArrowLeft, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function UserPickDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pick, setPick] = useState(null)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    API.get(`/api/picks/details/${id}`).then(res => setPick(res.data))
    API.get("/api/picks/all").then(res => setPlaces(res.data))
  }, [id])

  if (!pick) return <div className="text-center text-white py-20">Loading...</div>

  const similar = places.filter(
    (item) => item.category === pick.category && item._id !== pick._id
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-6 lg:px-10 pt-30">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-neutral-400 hover:text-white transition">
            <ArrowLeft size={18} /> Back
          </button>
          <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition">
            <Share2 size={18} /> Share
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">{pick.placeName}</h1>

            <div className="mb-3 inline-flex px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm text-emerald-400 text-sm font-medium">
              {pick.category}
            </div>

            <div className="mb-6 flex items-center gap-2 text-neutral-300">
              <MapPin className="text-amber-500" size={18} />
              <span className="text-lg">{pick.location}</span>
            </div>

            <p className="text-neutral-300 text-lg leading-relaxed mb-8">{pick.description}</p>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-neutral-200 text-lg">
                <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-xl border border-neutral-700">
                  <Star className="text-amber-500 fill-amber-500" size={18} />
                  <span>{pick.rating}.0</span>
                </div>

                <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-xl border border-neutral-700">
                  <Clock size={18} className="text-neutral-400" />
                  <span>{pick.timeRequired}</span>
                </div>

                <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-xl border border-neutral-700">
                  <span className="text-amber-500 font-semibold">{pick.entryFee}</span>
                </div>

                <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-xl border border-neutral-700">
                  <Eye className="text-neutral-400" size={18} />
                  <span>{pick.views} views</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-semibold">
                  {pick?.user?.fullName?.charAt(0)}
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Posted by</p>
                  <p className="text-white font-semibold">{pick.user.fullName}</p>
                  <p className="text-neutral-500 text-xs">{pick.user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[380px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(251,146,60,0.3)] border border-neutral-800"
          >
            <ImageWithFallback src={pick.imageUrl} alt={pick.placeName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
          </motion.div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6">Similar places in {pick.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similar.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/community-picks/${item._id}`)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback src={item.imageUrl} alt={item.placeName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">{item.placeName}</h3>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mt-2">
                      <MapPin size={14} className="text-amber-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <Star className="text-amber-500 fill-amber-500" size={14} />
                      <span className="text-white text-sm">{item.rating}.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
