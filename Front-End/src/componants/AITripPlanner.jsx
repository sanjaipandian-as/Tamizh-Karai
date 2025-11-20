import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Wand2, MapPin, Clock, Users, Send, X } from "lucide-react"
import { Button } from "../componants/ui/Button"
import Textarea from "../componants/ui/TextArea"
import { Input } from "../componants/ui/Input"
import Slider from "../componants/ui/Slider"
import { Card } from "../componants/ui/Card"
import API from "../../API"

export default function AITripPlanner() {
  const [startLocation, setStartLocation] = useState("")
  const [days, setDays] = useState("")
  const [travelers, setTravelers] = useState("Solo Traveler")
  const [budget, setBudget] = useState([30000])
  const [tripDescription, setTripDescription] = useState("")
  const [interests, setInterests] = useState([])
  const [response, setResponse] = useState(["", "", ""])
  const [loading, setLoading] = useState(false)
  const [showItinerary, setShowItinerary] = useState(false)
  const leftRef = useRef(null)
  const [leftHeight, setLeftHeight] = useState("auto")

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight)
    }
  }, [startLocation, days, travelers, budget, tripDescription, interests, showItinerary])

  const interestTags = [
    "Temples & Heritage",
    "Beaches",
    "Mountains",
    "Food & Cuisine",
    "Adventure",
    "Wildlife",
    "Photography",
    "Shopping",
    "Wellness & Spa",
    "Water Sports"
  ]

  const toggleInterest = (tag) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag]
    )
  }

  const fetchAI = async () => {
    const prompt = `
[TRIP_SUMMARY]
Starting Point: ${startLocation}
Days: ${days}
Travelers: ${travelers}
Budget Per Person: ₹${budget}
Interests: ${interests.join(", ")}
Notes: ${tripDescription}

[COST_ESTIMATE]
Give realistic cost breakdown.

[ITINERARY]
Format each day with readable sections (not tables):
Time — Place
Spend Duration: X | Travel Time: Y | Entry Fee: Z
Short description
----------------------------------------
Food Break:
Restaurant Suggestion and Dish
Travel Tip of the Day:
`
    const resp = await API.post("/api/ai-trip", { prompt })
    let txt = resp.data.text || ""
    const summary = txt.split("[TRIP_SUMMARY]")[1]?.split("[COST_ESTIMATE]")[0]?.trim()
    const cost = txt.split("[COST_ESTIMATE]")[1]?.split("[ITINERARY]")[0]?.trim()
    const itinerary = txt.split("[ITINERARY]")[1]?.trim()
    setResponse([summary, cost, itinerary])
  }

  const generate = async () => {
    if (!startLocation || !days || !travelers) return
    setLoading(true)
    await fetchAI()
    setLoading(false)
    setShowItinerary(true)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden isolate flex flex-col justify-center bg-gradient-to-br from-amber-600/20 via-neutral-900 to-emerald-600/20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-600/20 via-neutral-900 to-emerald-600/25" />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="text-amber-400" size={20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-white text-4xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2">
            AI Trip Planner
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm">
            Personalized day-by-day travel planning instantly.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-6 flex flex-col lg:flex-row gap-5 z-10 items-stretch">
        <Card
          ref={leftRef}
          className="bg-neutral-900/60 border border-neutral-800 p-5 space-y-5 rounded-2xl flex-1 h-fit backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Wand2 className="text-white" size={24} />
            </div>
            <div className="text-white text-lg font-medium">Trip Details</div>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
            <Input
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="Starting Location"
              className="pl-11 h-12 bg-neutral-900/70 border-neutral-700 text-white rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Days"
                className="pl-11 h-12 bg-neutral-900/70 border-neutral-700 text-white rounded-xl"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-neutral-900/70 border border-neutral-700 text-white rounded-xl appearance-none"
              >
                <option>Solo Traveler</option>
                <option>2 People (Couple)</option>
                <option>3-4 People (Family)</option>
                <option>5+ People (Group)</option>
              </select>
            </div>
          </div>

          <Slider value={budget} onValueChange={setBudget} max={100000} step={5000} />
          <div className="text-amber-400 text-sm">Budget: ₹{budget}</div>

          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleInterest(tag)}
                className={`px-4 py-2 rounded-full text-sm ${
                  interests.includes(tag)
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-neutral-800 border border-neutral-700 text-neutral-300"
                }`}
              >
                {interests.includes(tag) && <X className="inline mr-1" size={14} />}
                {tag}
              </button>
            ))}
          </div>

          <Textarea
            value={tripDescription}
            onChange={(e) => setTripDescription(e.target.value)}
            placeholder="Preferences or notes"
            className="bg-neutral-900/70 border-neutral-700 text-white rounded-xl min-h-24"
          />

          <Button
            onClick={generate}
            className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? "Generating..." : "Create Itinerary"}
            <Send size={18} />
          </Button>
        </Card>

        <div
          className="flex-1 h-full flex flex-col"
          style={{ height: leftHeight === "auto" ? "auto" : `${leftHeight}px` }}
        >
          {!showItinerary && (
            <Card className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden flex-1 flex flex-col justify-center backdrop-blur-sm">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526779259212-939e64788e3b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15" />
              <div className="relative text-white space-y-4 bg-black/40 p-6 rounded-2xl">
                <h3 className="text-2xl font-medium text-amber-400 text-center">How It Works</h3>
                <p className="text-neutral-300 text-center text-sm">
                  Tell us your requirements and the AI builds the perfect travel plan instantly.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    ["10,000+ Trips"],
                    ["8,500+ Travelers"],
                    ["Under 2 Minutes"],
                    ["100+ Cities"]
                  ].map(([text], i) => (
                    <div
                      key={i}
                      className="bg-neutral-900/70 rounded-xl py-4 text-center text-neutral-200 border border-neutral-700"
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {showItinerary && (
            <div className="space-y-6 overflow-y-auto pr-2 flex-1 custom-scroll">
              <Card
                className="bg-neutral-900/60 border border-neutral-700 p-6 rounded-2xl text-white"
                dangerouslySetInnerHTML={{ __html: response[0] }}
              />
              <Card
                className="bg-neutral-900/60 border border-neutral-700 p-6 rounded-2xl text-white"
                dangerouslySetInnerHTML={{ __html: response[1] }}
              />
              {response[2]
                .split(/Day\s*\d+/i)
                .filter((d) => d.trim() !== "")
                .map((day, index) => (
                  <Card
                    key={index}
                    className="bg-neutral-900/60 border border-neutral-700 p-6 rounded-2xl text-white space-y-3"
                  >
                    <div className="text-amber-400 font-semibold mb-2">Day {index + 1}</div>
                    <div className="whitespace-pre-line leading-relaxed text-neutral-200">
                      {day}
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
