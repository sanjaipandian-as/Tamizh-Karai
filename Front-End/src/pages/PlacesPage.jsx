import { useEffect, useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import API from "../../API"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Star, MapPin, Clock, Heart, Search, X, ChevronDown, Map, SlidersHorizontal } from "lucide-react"
import ImageWithFallback from "./ImageWithFallback"
import { Badge } from "../componants/ui/Badge"

const DISPLAY_CATEGORIES = [
  "All", "Nature", "Spiritual", "Adventure", "Beach",
  "Heritage", "Chill", "Shopping", "Temple"
]

const TAG_ENUM = [
  "Must Visit", "Hidden Gem", "Local Favorite", "Spiritual",
  "Nature", "Adventure", "Heritage", "Chill",
  "Family Friendly", "Couple Friendly", "Photogenic", "Educational", "Shopping"
]

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const h = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(h)
  }, [value, delay])
  return debounced
}

function DestinationCard({
  image, title, location, district, description, rating,
  reviews, duration, category, price, tags
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative bg-neutral-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-60 overflow-hidden bg-neutral-900">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-black/60 backdrop-blur text-amber-400 border border-amber-500/30 uppercase text-[10px] tracking-wider">
            {category}
          </Badge>
        </div>
        <button className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 backdrop-blur border border-white/10 hover:bg-amber-500 hover:border-amber-500 text-white transition-all">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex items-center gap-1 text-white font-medium bg-black/50 backdrop-blur px-2 py-1 rounded-lg border border-white/10">
            <Star className="text-amber-500 fill-amber-500" size={14} />
            <span>{rating}</span>
            <span className="text-neutral-400 text-xs">({reviews})</span>
          </div>
          {price && (
            <div className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
              {price}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
          <MapPin size={14} className="text-amber-500" />
          <span className="truncate">{location}, {district}</span>
        </div>
        <p className="text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.slice(0, 3).map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800 mt-auto">
          <div className="flex items-center gap-2 text-neutral-400 text-xs">
            <Clock size={14} className="text-amber-500" />
            <span>{duration}</span>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Places() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDistrict, setSelectedDistrict] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 300)

  const url = useLocation()
  const params = new URLSearchParams(url.search)
  const urlLocation = params.get("location") || ""
  const urlCategory = params.get("category") || ""

  useEffect(() => {
    if (urlLocation) setSearchQuery(urlLocation)
    if (urlCategory) setSelectedCategory(urlCategory)
  }, [urlLocation, urlCategory])

  useEffect(() => {
    API.get("/api/places/all").then(res => {
      const mapped = res.data.map(p => ({
        id: p._id,
        image: p.imageUrl || null,
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
      setPlaces(mapped)
      setLoading(false)
    })
  }, [])

  const districts = useMemo(() => ["All", ...new Set(places.map(p => p.district).sort())], [places])
  const tagFilters = ["All", ...TAG_ENUM]

  const filteredPlaces = useMemo(() => {
    const filtered = places.filter(p => {
      const m1 =
        !debouncedQuery ||
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(debouncedQuery.toLowerCase())

      const m2 =
        selectedCategory === "All" ||
        p.category === selectedCategory ||
        p.tags.includes(selectedCategory)

      const m3 = selectedDistrict === "All" || p.district === selectedDistrict
      const m4 = selectedTag === "All" || p.tags.includes(selectedTag)

      return m1 && m2 && m3 && m4
    })

    return filtered.sort((a, b) => {
      const dist = a.district.localeCompare(b.district)
      if (dist !== 0) return dist
      return a.category.localeCompare(b.category)
    })
  }, [places, debouncedQuery, selectedCategory, selectedDistrict, selectedTag])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700 mb-6">
            <Compass className="text-amber-500" size={16} />
            <span className="text-xs text-neutral-300">TAMIL NADU TOURISM</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
            Discover the <br /><span className="text-amber-500">Unexplored</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">From the temples of Madurai to the hills of Ooty.</p>
        </div>
      </div>

      <div className="sticky top-0 z-40 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl p-5">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative w-full lg:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500 text-white"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl border transition-all ${
                    showFilters ? "bg-neutral-800 text-amber-500 border-amber-500/30" : "bg-black/40 text-neutral-400 border-neutral-800"
                  }`}
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                  {DISPLAY_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        selectedCategory === cat
                          ? "bg-amber-500 text-black border-amber-500"
                          : "bg-neutral-800/50 text-neutral-400 border-transparent hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/5 mt-5"
                >
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="appearance-none bg-neutral-800 text-neutral-200 pl-4 pr-10 py-2.5 rounded-lg text-sm border border-neutral-700"
                    >
                      {districts.map(d => (
                        <option key={d} value={d}>{d === "All" ? "All Districts" : d}</option>
                      ))}
                    </select>

                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="appearance-none bg-neutral-800 text-neutral-200 pl-4 pr-10 py-2.5 rounded-lg text-sm border border-neutral-700"
                    >
                      {tagFilters.map(t => (
                        <option key={t} value={t}>{t === "All" ? "All Tags" : t}</option>
                      ))}
                    </select>

                    {(selectedCategory !== "All" || selectedDistrict !== "All" || selectedTag !== "All" || searchQuery) && (
                      <button
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("All")
                          setSelectedDistrict("All")
                          setSelectedTag("All")
                        }}
                        className="ml-auto text-xs text-red-400 flex items-center gap-1"
                      >
                        <X size={14} /> Clear Filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4 text-neutral-500 text-sm px-2">
            Showing {filteredPlaces.length} destinations in Tamil Nadu
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredPlaces.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map(place => (
                <DestinationCard key={place.id} {...place} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center border border-neutral-800 rounded-3xl bg-neutral-900/30 border-dashed"
          >
            <div className="bg-neutral-800/50 p-6 rounded-full mb-4">
              <Map className="text-neutral-600" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No places found</h3>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedDistrict("All")
                setSelectedTag("All")
              }}
              className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
