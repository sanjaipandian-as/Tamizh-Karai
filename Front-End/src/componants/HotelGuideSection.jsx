import { motion } from "framer-motion";
import { Hotel, User, Star, MapPin, Phone, Mail, Award } from 'lucide-react';
import { Badge } from "./ui/Badge";
import {Avatar, AvatarImage, AvatarFallback} from "./ui/Avatar.jsx"
import ImageWithFallback from "./figma/ImageWithFallback";

const hotels = [
  {
    id: 1,
    name: 'The Grand Chennai Palace',
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMTQ2MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 342,
    price: '₹8,500/night',
    amenities: ['Pool', 'Spa', 'Restaurant']
  },
  {
    id: 2,
    name: 'Coimbatore Hill Resort',
    location: 'Coimbatore',
    image: 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjIxMDgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 256,
    price: '₹6,200/night',
    amenities: ['View', 'Garden', 'Cafe']
  },
  {
    id: 3,
    name: 'Madurai Heritage Stay',
    location: 'Madurai',
    image: 'https://images.unsplash.com/photo-1677935085672-997632c0d618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYW1pbCUyME5hZHUlMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMjMwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 189,
    price: '₹5,800/night',
    amenities: ['Heritage', 'Local Cuisine', 'Tours']
  }
];

const guides = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    specialization: 'Temple & Heritage Tours',
    location: 'Madurai',
    experience: '12 years',
    rating: 4.9,
    tours: 450,
    languages: ['Tamil', 'English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1720983125268-b9359e77604d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjIzMDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    name: 'Priya Lakshmi',
    specialization: 'Adventure & Nature',
    location: 'Ooty',
    experience: '8 years',
    rating: 4.8,
    tours: 320,
    languages: ['Tamil', 'English'],
    image: 'https://images.unsplash.com/photo-1720983125268-b9359e77604d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjIzMDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    name: 'Arun Selvam',
    specialization: 'Food & Culture',
    location: 'Chennai',
    experience: '10 years',
    rating: 5.0,
    tours: 520,
    languages: ['Tamil', 'English', 'French'],
    image: 'https://images.unsplash.com/photo-1720983125268-b9359e77604d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjIzMDk4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export default function HotelGuideSection() {
  return (
    <div className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-4">
                <Hotel className="text-amber-500" size={20} />
                <span className="text-amber-500">Premium Stays</span>
              </div>
              <h2 className="text-white mb-2">Featured Hotels & Resorts</h2>
              <p className="text-neutral-400">Handpicked accommodations for your comfort</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-neutral-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-500/50 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10">
                    <span className="text-amber-500">{hotel.price}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                    <MapPin size={16} className="text-emerald-400" />
                    <span>{hotel.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500" size={16} />
                      <span className="text-white">{hotel.rating}</span>
                    </div>
                    <span className="text-neutral-500 text-sm">({hotel.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="border-neutral-700 text-neutral-300">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 mb-4">
                <User className="text-emerald-400" size={20} />
                <span className="text-emerald-400">Expert Guides</span>
              </div>
              <h2 className="text-white mb-2">Verified Local Guides</h2>
              <p className="text-neutral-400">Connect with experienced guides for authentic experiences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-neutral-800/40 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-emerald-500/50 p-6 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-emerald-500/50">
                    <AvatarImage src={guide.image} alt={guide.name} />
                    <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{guide.name}</h3>
                    <p className="text-emerald-400 text-sm mb-2">{guide.specialization}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-500 fill-amber-500" size={14} />
                        <span className="text-white text-sm">{guide.rating}</span>
                      </div>
                      <span className="text-neutral-500 text-xs">•</span>
                      <span className="text-neutral-400 text-xs">{guide.tours} tours</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <MapPin size={16} className="text-amber-500" />
                    <span>{guide.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Award size={16} className="text-emerald-400" />
                    <span>{guide.experience} experience</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-neutral-400 text-sm mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="border-neutral-700 text-neutral-300 text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm transition-all">
                    <Phone size={16} className="inline mr-2" />
                    Contact
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-white text-sm transition-all">
                    <Mail size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
