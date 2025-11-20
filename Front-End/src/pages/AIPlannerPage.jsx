import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Spline from '@splinetool/react-spline'
import { Sparkles, Wand2, MapPin, Clock, Users, Send, Volume2, StopCircle } from "lucide-react"
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
  
  // Speech State
  const [isReading, setIsReading] = useState(false)
  const [availableVoices, setAvailableVoices] = useState([]) // New State for Voices
  const speechRef = useRef(null)

  const leftRef = useRef(null)
  const [leftHeight, setLeftHeight] = useState("auto")

  // Sync height
  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight)
    }
  }, [startLocation, days, travelers, budget, tripDescription, interests, showItinerary, isReading])

  // --- FIX: Load Voices Asynchronously ---
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setAvailableVoices(voices)
      }
    }

    // Load immediately in case they are already ready
    loadVoices()

    // Listen for the browser event when voices are finally loaded
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const interestTags = [
    "Temples & Heritage", "Beaches", "Mountains", "Food & Cuisine",
    "Adventure", "Wildlife", "Photography", "Shopping",
    "Wellness & Spa", "Water Sports"
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
Format each day with readable sections.
`
    try {
      const resp = await API.post("/api/ai-trip", { prompt })
      let txt = resp.data.text || ""
      const summary = txt.split("[TRIP_SUMMARY]")[1]?.split("[COST_ESTIMATE]")[0]?.trim()
      const cost = txt.split("[COST_ESTIMATE]")[1]?.split("[ITINERARY]")[0]?.trim()
      const itinerary = txt.split("[ITINERARY]")[1]?.trim()
      setResponse([summary, cost, itinerary])
    } catch (e) {
      console.error(e)
    }
  }

  const generate = async () => {
    if (!startLocation || !days || !travelers) return
    setLoading(true)
    handleStop() // Ensure silence before new generation
    await fetchAI()
    setLoading(false)
    setShowItinerary(true)
  }

  // --- FIX: Robust Text to Speech Logic ---
  const handleRead = () => {
    if (!window.speechSynthesis) return alert("Browser does not support text-to-speech")

    // Stop any current speech first
    window.speechSynthesis.cancel()

    const stripHtml = (html) => {
       let tmp = document.createElement("DIV")
       tmp.innerHTML = html
       return tmp.textContent || tmp.innerText || ""
    }

    // Combine text for smooth reading
    const fullText = `Here is your trip plan. ${stripHtml(response[0])}. ${stripHtml(response[2])}`
    
    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    // Better Voice Selection Strategy
    let selectedVoice = availableVoices.find(v => v.name.includes("Google US English")) // Chrome Preferred
    if (!selectedVoice) {
        selectedVoice = availableVoices.find(v => v.name.includes("Samantha")) // Mac Preferred
    }
    if (!selectedVoice) {
        selectedVoice = availableVoices.find(v => v.lang.startsWith("en")) // Fallback to any English
    }

    if (selectedVoice) utterance.voice = selectedVoice

    // Events
    utterance.onstart = () => setIsReading(true)
    utterance.onend = () => setIsReading(false)
    utterance.onerror = (e) => {
        console.error("Speech Error:", e)
        setIsReading(false)
    }

    // Small timeout to ensure the browser is ready (fixes some Chrome bugs)
    setTimeout(() => {
        window.speechSynthesis.speak(utterance)
    }, 10)
    
    speechRef.current = utterance
  }

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsReading(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden isolate pt-20  flex flex-col justify-center bg-gradient-to-br from-amber-600/20 via-neutral-900 to-emerald-600/20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-600/10 via-neutral-950 to-emerald-600/10" />
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
              scale: 0.5
            }}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0.1, 0.5, 0.1],
              rotate: [0, 180, 360] 
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Sparkles className="text-amber-300/30" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-white text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
            AI Trip Planner
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base font-light">
            Your personal AI travel companion. Design your perfect journey in seconds.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-6 z-10 items-stretch w-full">
        
        {/* LEFT PANEL */}
        <Card
          ref={leftRef}
          className="bg-neutral-900/80 border border-neutral-800/50 p-6 space-y-6 rounded-3xl flex-1 h-fit backdrop-blur-xl shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20">
              <Wand2 className="text-white" size={24} />
            </div>
            <div>
              <div className="text-white text-xl font-semibold">Trip Details</div>
              <div className="text-neutral-400 text-xs">Tell us your plans</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
              <Input
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Where are you starting from?"
                className="pl-12 h-14 bg-neutral-950/50 border-neutral-800 text-white rounded-2xl focus:border-amber-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="Days"
                  className="pl-12 h-14 bg-neutral-950/50 border-neutral-800 text-white rounded-2xl focus:border-blue-500/50"
                />
              </div>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={20} />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-neutral-950/50 border border-neutral-800 text-white rounded-2xl appearance-none focus:border-purple-500/50 outline-none"
                >
                  <option>Solo Traveler</option>
                  <option>2 People (Couple)</option>
                  <option>3-4 People (Family)</option>
                  <option>5+ People (Group)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Budget Per Person</span>
              <span className="text-amber-400 font-medium">₹{budget.toLocaleString()}</span>
            </div>
           <Slider value={budget} onValueChange={setBudget} max={100000} step={100} className="py-2" />
          </div>

          <div className="space-y-2">
            <span className="text-neutral-400 text-sm">Interests</span>
            <div className="flex flex-wrap gap-2">
              {interestTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    interests.includes(tag)
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white scale-105"
                      : "bg-neutral-800/50 border border-neutral-700/50 text-neutral-400 hover:bg-neutral-800"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={tripDescription}
            onChange={(e) => setTripDescription(e.target.value)}
            placeholder="Any specific requirements? (e.g., 'Prefer vegan food')"
            className="bg-neutral-950/50 border-neutral-800 text-white rounded-2xl min-h-[100px]"
          />

          <Button
            onClick={generate}
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
               <span className="animate-pulse">Building Itinerary...</span>
            ) : (
              <>Create Itinerary <Send size={18} /></>
            )}
          </Button>
        </Card>

        {/* RIGHT PANEL */}
        <div
          className="flex-1 flex flex-col min-h-[600px] lg:min-h-0"
          style={{ height: leftHeight === "auto" ? "auto" : `${leftHeight}px` }}
        >
          <AnimatePresence mode="wait">
            {(!showItinerary || isReading) ? (
              // --- 3D ROBOT VIEW ---
              <motion.div
                key="robot"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Card className="relative w-full h-full rounded-3xl border border-neutral-800/50 bg-neutral-900/40 overflow-hidden flex flex-col backdrop-blur-sm group">
                  
                  {/* SPLINE 3D ROBOT */}
                  <div className="absolute inset-0 w-full h-full z-0">
                    <div className="w-full h-full scale-[1.2] lg:scale-100 transition-transform duration-700">
                      <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 pointer-events-none" />

                  {/* Content Overlay */}
                  <div className="relative z-20 mt-auto p-8 space-y-6 text-center">
                    
                    {isReading ? (
                      // READING MODE UI
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/30"
                      >
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" />
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-100" />
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-200" />
                        </div>
                        <div className="text-white font-semibold text-lg">
                            Explaining your trip...
                        </div>
                        <Button 
                            onClick={handleStop}
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 rounded-full px-6 py-2 flex items-center gap-2"
                        >
                            <StopCircle size={18} /> Stop Reading
                        </Button>
                      </motion.div>
                    ) : (
                      // IDLE UI
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pointer-events-none"
                      >
                        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                          AI Travel Agent
                        </h3>
                        <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                          I'm ready to plan your trip. Fill in the details on the left.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ) : (
              // --- ITINERARY VIEW ---
              <motion.div 
                key="itinerary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col space-y-4 overflow-y-auto pr-2 custom-scroll pb-4 relative"
              >
                <div className="sticky top-0 z-30 flex justify-between items-center mb-2 bg-neutral-900/95 backdrop-blur-xl p-4 rounded-2xl border border-neutral-800">
                   <h2 className="text-white font-semibold text-lg">Your Itinerary</h2>
                   {/* <Button
                      onClick={handleRead}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                   >
                      <Volume2 size={16} /> Read Aloud
                   </Button> */}
                </div>

                <Card
                  className="bg-neutral-900/90 border border-amber-500/20 p-6 rounded-3xl text-white shadow-xl"
                  dangerouslySetInnerHTML={{ __html: response[0] }}
                />
                <Card
                   className="bg-emerald-900/20 border border-emerald-500/20 p-5 rounded-2xl text-emerald-100 text-sm"
                   dangerouslySetInnerHTML={{ __html: response[1] }}
                 />
                
                {response[2]
                  .split(/Day\s*\d+/i)
                  .filter((d) => d.trim() !== "")
                  .map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-2xl text-white hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-lg font-bold text-sm border border-amber-500/20">
                             Day {index + 1}
                           </div>
                           <div className="h-px bg-neutral-800 flex-1" />
                        </div>
                        <div className="whitespace-pre-line leading-relaxed text-neutral-300 text-sm">
                          {day}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                  
                  <Button 
                    onClick={() => setShowItinerary(false)} 
                    className="bg-neutral-800 hover:bg-neutral-700 text-white mt-4 h-12 rounded-xl"
                  >
                    Plan Another Trip
                  </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}