import { useEffect, useState, useMemo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import API from "../../API"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Star, MapPin, Clock, Heart, Search, X, Map, SlidersHorizontal } from "lucide-react"
import ImageWithFallback from "./ImageWithFallback"
import { Badge } from "../componants/ui/Badge"

const DISPLAY_CATEGORIES = [
  "All","Nature","Spiritual","Adventure","Beach","Heritage","Chill","Shopping","Temple"
]

const TAG_ENUM = [
  "Must Visit","Hidden Gem","Local Favorite","Spiritual","Nature","Adventure",
  "Heritage","Chill","Family Friendly","Couple Friendly","Photogenic","Educational","Shopping"
]

const DISTRICT_ORDER = [
  "Chennai","Chengalpattu","Kanchipuram","Tiruvallur",
  "Vellore","Ranipet","Tirupattur",
  "Salem","Erode","Coimbatore","Tiruppur",
  "Nilgiris","Dindigul","Madurai","Theni",
  "Virudhunagar","Ramanathapuram","Thoothukudi",
  "Tirunelveli","Tenkasi","Kanniyakumari",
  "Thanjavur","Tiruvarur","Nagapattinam",
  "Trichy","Ariyalur","Perambalur",
  "Cuddalore","Villupuram","Kallakurichi",
  "Dharmapuri","Krishnagiri"
]

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

function DestinationCard({
  image, title, location, district, description,
  rating, reviews, duration, category, price, tags
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className="group bg-neutral-900/60 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-neutral-900">
        <ImageWithFallback
          src={image}
          alt={`${title} in ${district}, Tamil Nadu`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/60 text-amber-400 border border-amber-500/30 text-[10px]">
            {category}
          </Badge>
        </div>
        <button
          aria-label={`Save ${title}`}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 border border-white/10 text-white"
        >
          <Heart size={16} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg">
          <Star className="text-amber-500 fill-amber-500" size={14} />
          <span className="text-white text-sm">{rating}</span>
          <span className="text-neutral-400 text-xs">({reviews})</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-neutral-400 mb-2">
          <MapPin size={14} className="text-amber-500" />
          <span>{location}, {district}</span>
        </div>
        <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.slice(0,3).map((t,i)=>(
            <span key={i} className="text-[10px] px-2 py-1 bg-neutral-800 border border-neutral-700 rounded">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-3">
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Clock size={14} className="text-amber-500" />
            {duration}
          </div>
          <button
            aria-label={`View details of ${title}`}
            className="px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Places() {
  const [places, setPlaces] = useState([])
  const [districtIndex, setDistrictIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")

  const debouncedQuery = useDebounce(searchQuery, 300)
  const url = useLocation()

  const fetchDistrict = useCallback(async (district) => {
    setLoading(true)
    const res = await API.get(`/api/places/by-district/${district}`)
    const mapped = res.data.map(p => ({
      id: p._id,
      image: p.imageUrl,
      title: p.placeName,
      location: p.location,
      district: p.district,
      description: p.description,
      rating: p.rating,
      reviews: p.views,
      duration: p.timeRequired,
      category: p.category,
      price: p.entryFee === "Free" ? "Free" : `₹${p.entryFee}`,
      tags: p.tags || []
    }))
    setPlaces(prev => [...prev, ...mapped])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDistrict(DISTRICT_ORDER[0])
  }, [fetchDistrict])

  const loadNextDistrict = async () => {
    const next = districtIndex + 1
    if (next < DISTRICT_ORDER.length) {
      setDistrictIndex(next)
      await fetchDistrict(DISTRICT_ORDER[next])
    }
  }

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      const q =
        !debouncedQuery ||
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(debouncedQuery.toLowerCase())
      const c =
        selectedCategory === "All" ||
        p.category === selectedCategory ||
        p.tags.includes(selectedCategory)
      const t = selectedTag === "All" || p.tags.includes(selectedTag)
      return q && c && t
    })
  }, [places, debouncedQuery, selectedCategory, selectedTag])

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="sr-only">
        <h1>Tourist Places in Tamil Nadu</h1>
        <p>Explore district wise tourist places in Tamil Nadu starting from Chennai and loading faster with smart pagination.</p>
      </section>

      <header className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Tourist Places in Tamil Nadu</h1>
        <p className="text-neutral-400">District-wise fast loading travel destinations</p>
      </header>

      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur px-4 py-4">
        <div className="max-w-7xl mx-auto flex gap-3 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              aria-label="Search tourist places in Tamil Nadu"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search places..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white"
            />
          </div>
          <div className="flex gap-2">
            {DISPLAY_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={()=>setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory===c ? "bg-amber-500 text-black" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPlaces.map(p => (
              <DestinationCard key={p.id} {...p} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mt-12">
          {districtIndex < DISTRICT_ORDER.length - 1 && (
            <button
              onClick={loadNextDistrict}
              disabled={loading}
              className="px-8 py-3 bg-amber-500 text-black rounded-xl font-semibold"
            >
              {loading ? "Loading..." : `Go to  ${DISTRICT_ORDER[districtIndex+1]} District Places`}
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
