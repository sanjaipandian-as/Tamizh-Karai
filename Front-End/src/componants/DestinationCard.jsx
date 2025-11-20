import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { Badge } from './ui/Badge';
import ImageWithFallback from './figma/ImageWithFallback';

export function DestinationCard({
  image,
  title,
  location,
  description,
  rating,
  reviews,
  duration,
  category,
  price
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all"
    >
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white border-0">
            {category}
          </Badge>
        </div>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:border-amber-500 transition-all group/like">
          <Heart className="text-white group-hover/like:fill-white" size={18} />
        </button>

        {price && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10">
            <span className="text-amber-500">{price}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-white mb-2 group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
          <MapPin size={16} className="text-amber-500" />
          <span>{location}</span>
        </div>

        <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="text-amber-500 fill-amber-500" size={16} />
              <span className="text-white">{rating}</span>
              <span className="text-neutral-500 text-sm">({reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-400 text-sm">
              <Clock size={16} />
              <span>{duration}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
          >
            Explore
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}