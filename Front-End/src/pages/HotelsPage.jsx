import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Hotel, Star, MapPin, Wifi, Coffee, Utensils, Car, Dumbbell, Wind, Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "../componants/ui/Badge"
import { Button } from "../componants/ui/Button"
import { Input } from "../componants/ui/Input"
import ImageWithFallback from "../componants/figma/ImageWithFallback"
import Slider from "../componants/ui/Slider"
import Checkbox from "../componants/ui/Checkbox"
import API from "../../API"

const amenityIcons = {
  Pool: Wind,
  Spa: Hotel,
  Restaurant: Utensils,
  WiFi: Wifi,
  Parking: Car,
  Gym: Dumbbell,
  Coffee: Coffee
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [filtered, setFiltered] = useState([])

  const [price, setPrice] = useState([0, 20000])
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState([])
  const [amenities, setAmenities] = useState([])

  useEffect(() => {
    API.get("/api/auth/hotels/all").then(res => {
      setHotels(res.data)
      setFiltered(res.data)
    })
  }, [])

  const toggleCategory = c => {
    setCategories(prev =>
      prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c]
    )
  }

  const toggleAmenity = a => {
    setAmenities(prev =>
      prev.includes(a) ? prev.filter(i => i !== a) : [...prev, a]
    )
  }

  const filterHotels = () => {
    let data = hotels

    data = data.filter(h => h.price >= price[0] && h.price <= price[1])

    if (categories.length > 0) {
      data = data.filter(h => categories.includes(h.category))
    }

    if (amenities.length > 0) {
      data = data.filter(h => amenities.every(a => h.amenities.includes(a)))
    }

    if (search.trim() !== "") {
      data = data.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.location.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(data)
  }

  useEffect(() => {
    filterHotels()
  }, [price, search, categories, amenities])

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://wallpaperaccess.com/full/2690784.jpg')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/70 to-neutral-900" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 mb-6">
              <Hotel className="text-amber-500" size={20} />
              <span className="text-amber-500">Premium Accommodations</span>
            </div>
            <h1 className="text-white mb-4 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">Hotels & Resorts</h1>
            <p className="text-neutral-300 max-w-2xl mx-auto">Discover handpicked hotels and resorts across Tamil Nadu.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-1">
            <div className="bg-neutral-800/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 p-6 sticky top-24 min-h-[750px] space-y-8">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-amber-500" />
                Filters
              </h3>

              <div className="mb-6">
                <label className="text-neutral-400 text-sm mb-3 block">Price Range (per night)</label>
                <Slider value={price} onValueChange={setPrice} max={20000} step={500} className="mb-2" />
                <div className="flex justify-between text-md text-neutral-500">
                  <span>₹{price[0]}</span>
                  <span>₹{price[1]}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-neutral-400 text-sm mb-3 block">Category</label>
                <div className="space-y-5">
                  {["Luxury", "Resort", "Heritage", "Beach Resort"].map(c => (
                    <div key={c} className="flex items-center gap-2">
                      <Checkbox checked={categories.includes(c)} onCheckedChange={() => toggleCategory(c)} />
                      <span className="text-neutral-300 text-md cursor-pointer">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-neutral-400 text-sm mb-3 block">Amenities</label>
                <div className="space-y-5">
                  {["Pool", "Spa", "Restaurant", "WiFi", "Parking", "Gym"].map(a => (
                    <div key={a} className="flex items-center gap-2">
                      <Checkbox checked={amenities.includes(a)} onCheckedChange={() => toggleAmenity(a)} />
                      <span className="text-neutral-300 text-md cursor-pointer">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white text-sm">You can't book the Hotels here. For booking Visit some other sites</p>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" size={20} />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hotels by name or location..." className="pl-12 bg-neutral-800/40 text-white backdrop-blur-xl border-neutral-700 focus:border-amber-500 rounded-xl h-14" />
              </div>
            </motion.div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-neutral-400">{filtered.length} hotels found</p>
            </div>

            <div className="space-y-6">
              {filtered.map((hotel, index) => (
                <motion.div key={hotel._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-neutral-800/40 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-amber-500/50 overflow-hidden transition-all group">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                        <ImageWithFallback src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <Badge className="absolute top-3 left-3 bg-emerald-500/90 text-white border-0">{hotel.category}</Badge>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-white mb-1 group-hover:text-amber-400 transition-colors">{hotel.name}</h3>
                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                              <MapPin size={16} className="text-amber-500" />
                              <span>{hotel.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-amber-500 mb-1">₹{hotel.price}</div>
                            <div className="text-neutral-500 text-xs">per night</div>
                          </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-4">{hotel.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map(a => {
                            const Icon = amenityIcons[a] || Hotel
                            return (
                              <div key={a} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900/50 border border-neutral-700 text-neutral-300 text-xs">
                                <Icon size={14} />
                                <span>{a}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl">
                          Book Now
                        </Button>
                        <Button variant="outline" className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800 hover:border-amber-500 rounded-xl">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
