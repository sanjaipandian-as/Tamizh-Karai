import { useEffect, useState } from "react"
import API from "../../API"
import { motion } from "framer-motion"
import { Star, MapPin, Clock, Search, Eye } from "lucide-react"
import { Badge } from "../componants/ui/Badge"
import ImageWithFallback from "../componants/figma/ImageWithFallback"
import { useNavigate } from "react-router-dom"

export default function UserPickShowPage() {
    const [places, setPlaces] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [rating, setRating] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/api/picks/all").then(res => {
            setPlaces(res.data)
            setFiltered(res.data)
        })
    }, [])

    const applyFilters = () => {
        let result = places
        if (category !== "All") result = result.filter(p => p.category === category)
        if (rating) result = result.filter(p => Number(p.rating) >= Number(rating))
        if (search.trim() !== "") {
            const s = search.toLowerCase()
            result = result.filter(p =>
                p.placeName.toLowerCase().includes(s) ||
                p.location.toLowerCase().includes(s)
            )
        }
        setFiltered(result)
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white py-5 px-4 pt-25">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-9 h-fit sticky top-24">
                    <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                        Filters
                    </h3>

                    <div className="mb-6">
                        <p className="text-neutral-400 text-sm mb-3">Search</p>
                        <div className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search place"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white"
                            />
                            <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-neutral-400 text-sm mb-3">Category</p>
                        <div className="space-y-2 text-sm">
                            {["All", "Temple", "Beach", "Hill Station", "Historical", "Wildlife", "Cultural", "Adventure", "Others"].map((cat) => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        checked={category === cat}
                                        onChange={() => setCategory(cat)}
                                        className="accent-amber-500"
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-neutral-400 text-sm mb-3">Rating</p>
                        <div className="space-y-2 text-sm">
                            {[1, 2, 3, 4, 5].map((r) => (
                                <label key={r} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={r}
                                        checked={rating === r}
                                        onChange={() => setRating(r)}
                                        className="accent-amber-500"
                                    />
                                    <Star size={14} className="text-amber-500 fill-amber-500" /> {r}+ stars
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                    >
                        Apply Filters
                    </button>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {filtered.map((pick) => (
                        <motion.div
                            key={pick._id}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/50 flex flex-col h-[550px]"
                        >
                            <div className="relative h-84 overflow-hidden">
                                <ImageWithFallback
                                    src={pick.imageUrl}
                                    alt={pick.placeName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-emerald-500/90 text-white border-0 text-xs px-2 py-0.5">
                                        {pick.category}
                                    </Badge>
                                </div>
                                {pick.entryFee && (
                                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-amber-400">
                                        {pick.entryFee}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition">
                                        {pick.placeName}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                                        <MapPin size={16} className="text-amber-500" />
                                        <span>{pick.location}</span>
                                    </div>

                                    <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
                                        {pick.description}
                                    </p>

                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm">
                                            {pick?.user?.fullName?.charAt(0)}
                                        </div>
                                        <p className="text-neutral-400 text-sm">
                                            Posted by <span className="text-white font-medium">{pick?.user?.fullName}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                                    <div className="flex items-center gap-3 text-white text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-amber-500 fill-amber-500" />
                                            {pick.rating}
                                        </div>
                                        <div className="flex items-center gap-1 text-neutral-400 text-sm">
                                            <Eye size={16} />
                                            {pick.views ?? 0}
                                        </div>
                                        <div className="flex items-center gap-1 text-neutral-400 text-xs">
                                            <Clock size={14} />
                                            {pick.timeRequired}
                                        </div>
                                    </div>

                                    <motion.button
                                        onClick={() => navigate(`/community-picks/${pick._id}`)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                                    >
                                        Explore
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
