import { motion } from "framer-motion"
import { DestinationCard } from "./DestinationCard"
import { useNavigate } from "react-router-dom"

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1677935085672-997632c0d618?auto=format&fit=crop&q=80&w=1080",
    title: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    description: "Meenakshi Amman Temple is one of the most iconic heritage temples in Tamil Nadu, known for its towering gopurams, intricate carvings, and 2000+ years of history.",
    rating: 4.9,
    reviews: 1523,
    duration: "2–3 hours",
    category: "Heritage",
    price: "Free Entry"
  },
  {
    image: "https://images.unsplash.com/photo-1680194019344-470fdf03a0c2?auto=format&fit=crop&q=80&w=1080",
    title: "Marina Beach",
    location: "Chennai, Tamil Nadu",
    description: "Marina Beach is one of the longest urban beaches in the world, famous for sunrise views, evening walks, and vibrant local culture.",
    rating: 4.6,
    reviews: 2847,
    duration: "Half day",
    category: "Beach",
    price: "Free Entry"
  },
  {
    image: "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?auto=format&fit=crop&q=80&w=1080",
    title: "Ooty Hill Station",
    location: "Nilgiris, Tamil Nadu",
    description: "Ooty is a scenic hill station in Tamil Nadu known for tea plantations, cool climate, botanical gardens, and serene lakes.",
    rating: 4.8,
    reviews: 1965,
    duration: "2–3 days",
    category: "Hill Station",
    price: "₹3,500/day"
  },
  {
    image: "https://images.unsplash.com/photo-1658859868445-11786a4999bb?auto=format&fit=crop&q=80&w=1080",
    title: "Thanjavur Palace",
    location: "Thanjavur, Tamil Nadu",
    description: "Thanjavur Palace showcases the grandeur of the Chola dynasty with museums, ancient art collections, and royal architecture.",
    rating: 4.7,
    reviews: 982,
    duration: "3–4 hours",
    category: "Heritage",
    price: "₹50/person"
  },
  {
    image: "https://images.unsplash.com/photo-1582583088753-afb19907963a?auto=format&fit=crop&q=80&w=1080",
    title: "Courtallam Falls",
    location: "Tenkasi, Tamil Nadu",
    description: "Courtallam Falls is famous for its cascading waterfalls, seasonal monsoon beauty, and natural medicinal bathing experience.",
    rating: 4.5,
    reviews: 756,
    duration: "Full day",
    category: "Nature",
    price: "Free Entry"
  },
  {
    image: "https://images.unsplash.com/photo-1553337787-17961c0990db?auto=format&fit=crop&q=80&w=1080",
    title: "Kodaikanal",
    location: "Dindigul, Tamil Nadu",
    description: "Kodaikanal, the Princess of Hill Stations, offers misty mountains, lakes, waterfalls, and peaceful retreats in Tamil Nadu.",
    rating: 4.9,
    reviews: 2134,
    duration: "2–3 days",
    category: "Hill Station",
    price: "₹4,200/day"
  }
]

export default function PopularDestinations() {
  const navigate = useNavigate()

  return (
    <main className="py-16 px-4 bg-black relative overflow-hidden">
      <section className="sr-only">
        <h1>Popular Tourist Destinations in Tamil Nadu</h1>
        <p>
          Explore the most popular tourist destinations in Tamil Nadu including temples,
          beaches, hill stations, waterfalls, and heritage sites. Discover top places
          like Madurai, Chennai, Ooty, Kodaikanal, Thanjavur, and Courtallam.
        </p>
      </section>

      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-semibold text-white bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent mb-4">
            Popular Destinations in Tamil Nadu
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Discover Tamil Nadu’s top tourist attractions, from ancient temples and royal palaces
            to scenic hill stations, waterfalls, and world-famous beaches.
          </p>
        </motion.header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <DestinationCard
                {...destination}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </motion.article>
          ))}
        </section>

        <nav className="flex justify-center mt-14">
          <button
            aria-label="View all tourist places in Tamil Nadu"
            onClick={() => navigate("/Places")}
            className="px-8 py-3 bg-amber-500 text-black rounded-xl font-semibold text-lg hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            View All Places in Tamil Nadu
          </button>
        </nav>
      </div>
    </main>
  )
}
