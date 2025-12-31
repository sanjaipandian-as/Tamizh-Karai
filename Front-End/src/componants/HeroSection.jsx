import { motion } from "framer-motion"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "./ui/Button"
import Hero from "../assets/Hero.jpeg"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={Hero}
        alt="Explore Tamil Nadu travel destinations"
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        width="1920"
        height="1080"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900" />

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-500/20"
            initial={{
              x: Math.random() * 300,
              y: Math.random() * 300
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <MapPin size={20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-6 py-2 backdrop-blur-md border border-amber-500/20">
            <span className="text-amber-500">Your Gateway to Southern India</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-white via-amber-100 to-emerald-100 bg-clip-text text-transparent text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-tight">
            Explore Tamil Nadu
            <br />
            Like Never Before
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-neutral-300 text-lg leading-relaxed">
            Discover ancient temples, pristine beaches, misty mountains, and vibrant culture.
            Your perfect South Indian adventure starts here.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              aria-label="Plan your trip"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 rounded-xl px-8 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              <Search size={20} />
              Plan Your Trip
            </Button>

            <Button
              size="lg"
              variant="outline"
              aria-label="View destinations"
              className="bg-white/5 backdrop-blur-md border-white/20 text-white rounded-xl px-8"
            >
              <Calendar size={20} />
              View Destinations
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
