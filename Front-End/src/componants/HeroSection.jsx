import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1677935085672-997632c0d618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYW1pbCUyME5hZHUlMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMjMwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-500/20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <MapPin size={24} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-6 py-2 backdrop-blur-md border border-amber-500/20"
          >
            
            <span className="text-amber-500">Your Gateway to Southern India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 bg-gradient-to-r from-white via-amber-100 to-emerald-100 bg-clip-text text-transparent"
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: '1.1',
              fontWeight: '800'
            }}
          >
            Explore Tamil Nadu
            <br />
            <span className="text-shadow-glow">Like Never Before</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12 text-neutral-300 max-w-2xl mx-auto"
            style={{ fontSize: '1.125rem', lineHeight: '1.6' }}
          >
            Discover ancient temples, pristine beaches, misty mountains, and vibrant culture.
            Your perfect South Indian adventure starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 rounded-xl px-8 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
            >
              <Search className="mr-2" size={20} />
              Plan Your Trip
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10 text-white rounded-xl px-8"
            >
              <Calendar className="mr-2" size={20} />
              View Destinations
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-amber-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}