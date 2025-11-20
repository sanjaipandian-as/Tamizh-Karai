import { motion } from 'framer-motion';
import { DestinationCard } from './DestinationCard';
import { Compass } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    image: 'https://images.unsplash.com/photo-1677935085672-997632c0d618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Meenakshi Temple',
    location: 'Madurai',
    description: 'Ancient temple complex with stunning architecture and rich history spanning over 2000 years.',
    rating: 4.9,
    reviews: 1523,
    duration: '2-3 hours',
    category: 'Heritage',
    price: 'Free Entry'
  },
  {
    image: 'https://images.unsplash.com/photo-1680194019344-470fdf03a0c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Marina Beach',
    location: 'Chennai',
    description: 'One of the longest urban beaches in the world, perfect for evening walks and sunset views.',
    rating: 4.6,
    reviews: 2847,
    duration: 'Half day',
    category: 'Beach',
    price: 'Free'
  },
  {
    image: 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Ooty Hill Station',
    location: 'Nilgiris',
    description: 'Scenic hill station with tea gardens, lakes, and pleasant weather year-round.',
    rating: 4.8,
    reviews: 1965,
    duration: '2-3 days',
    category: 'Mountains',
    price: '₹3,500/day'
  },
  {
    image: 'https://images.unsplash.com/photo-1658859868445-11786a4999bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Thanjavur Palace',
    location: 'Thanjavur',
    description: 'Historical palace showcasing Chola dynasty architecture and art collections.',
    rating: 4.7,
    reviews: 982,
    duration: '3-4 hours',
    category: 'Heritage',
    price: '₹50/person'
  },
  {
    image: 'https://images.unsplash.com/photo-1582583088753-afb19907963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Courtallam Falls',
    location: 'Tenkasi',
    description: 'Cascading waterfalls known for their therapeutic properties and natural beauty.',
    rating: 4.5,
    reviews: 756,
    duration: 'Full day',
    category: 'Nature',
    price: 'Free Entry'
  },
  {
    image: 'https://images.unsplash.com/photo-1553337787-17961c0990db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Kodaikanal',
    location: 'Dindigul',
    description: 'Princess of Hill Stations with misty mountains, lakes, and pleasant climate.',
    rating: 4.9,
    reviews: 2134,
    duration: '2-3 days',
    category: 'Mountains',
    price: '₹4,200/day'
  }
];

export default function PopularDestinations() {
  const navigate = useNavigate();

  return (
    <div className="py-15 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-6">
            <Compass className="text-amber-500" size={20} />
            <span className="text-amber-500">Top Picks</span>
          </div>

          <h2 className="text-white mb-4 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
            Popular Destinations
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore the most loved destinations in Tamil Nadu, from ancient temples 
            to pristine beaches and misty mountains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DestinationCard {...destination} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/Places")}
            className="px-8 py-3 bg-amber-500 text-black rounded-xl font-semibold text-lg hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            View More
          </button>
        </div>

      </div>
    </div>
  );
}
