import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Star, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ImageWithFallback from './figma/ImageWithFallback';
import { useNavigate } from "react-router-dom";

const userPicks = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1582583088753-afb19907963a?...',
    title: 'Hogenakkal Falls',
    location: 'Dharmapuri District',
    submittedBy: 'Admin of Tamizh Karai',
    views: '2.4k',
    rating: 4.8
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1553337787-17961c0990db?...',
    title: 'Meghamalai Tea Estates',
    location: 'Theni District',
    submittedBy: 'Admin of Tamizh Karai',
    views: '1.8k',
    rating: 4.9
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1658859868445-11786a4999bb?...',
    title: 'Chettinad Heritage Village',
    location: 'Sivaganga District',
    submittedBy: 'Admin of Tamizh Karai',
    views: '3.1k',
    rating: 4.7
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1680194019344-470fdf03a0c2?...',
    title: 'Kanyakumari Sunrise Point',
    location: 'Kanyakumari District',
    submittedBy: 'Admin of Tamizh Karai',
    views: '5.2k',
    rating: 4.9
  }
];

export default function UserPicks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % userPicks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + userPicks.length) % userPicks.length);
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-transparent bg-black via-neutral-900/50 to-transparent">
      <div className="max-w-6xl mx-auto">

        {/* EXISTING CONTENT UNCHANGED */}

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {userPicks.map((pick) => (
                <div key={pick.id} className="min-w-full px-2">
                  {/* SAME CARD CONTENT */}
                  <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                    <ImageWithFallback
                      src={pick.image}
                      alt={pick.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30">
                            <Star className="text-amber-500 fill-amber-500" size={16} />
                            <span className="text-amber-500">{pick.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10">
                            <Eye className="text-neutral-400" size={16} />
                            <span className="text-neutral-400 text-sm">{pick.views} views</span>
                          </div>
                        </div>
                        <h3 className="text-white mb-2">{pick.title}</h3>
                        <div className="flex items-center gap-2 text-neutral-300 mb-4">
                          <MapPin size={18} className="text-emerald-400" />
                          <span>{pick.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                            {pick.submittedBy.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-neutral-400">Submitted by</p>
                            <p className="text-white">{pick.submittedBy}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:border-amber-500 transition-all">
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:border-amber-500 transition-all">
            <ChevronRight className="text-white" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {userPicks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>
        </div>

        
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/community-picks")}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 font-semibold hover:scale-105 transition-all"
          >
            View More
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
