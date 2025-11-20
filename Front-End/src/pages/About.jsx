import { motion } from 'framer-motion';
import { Target, Users, Heart, Award, TrendingUp, Globe, Shield, Zap } from 'lucide-react';
import { Card } from '../componants/ui/Card';
import ImageWithFallback from '../componants/figma/ImageWithFallback';
import Sanjaiwhite from "../assets/SANJAIWHITE.jpg"
const team = [
  {
    name: 'Sanjai Pandian A.S',
    role: 'Founder & CEO and the Developer',
    image: Sanjaiwhite
  }
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Tamil Nadu',
    description: 'We believe in showcasing the authentic beauty and rich cultural heritage of Tamil Nadu.',
    color: 'amber'
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Your safety is our priority. All our partners are verified and our services are insured.',
    color: 'emerald'
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'Leveraging AI and technology to make travel planning seamless and personalized.',
    color: 'blue'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Empowering local guides, hotels, and businesses while creating jobs.',
    color: 'purple'
  }
];

const stats = [
  { label: 'Happy Travelers', value: '50,000+', icon: Users },
  { label: 'Destinations', value: '100+', icon: Globe },
  { label: 'Partner Hotels', value: '500+', icon: Award },
  { label: 'Success Rate', value: '99%', icon: TrendingUp }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjIyMTIzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/80 to-neutral-900" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 mb-6">
              <Target className="text-amber-500" size={20} />
              <span className="text-amber-500">Our Story</span>
            </div>
            
            <h1 className="text-white mb-6 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              About Explore TN
            </h1>
            <p className="text-neutral-300 max-w-3xl mx-auto mb-4" style={{ fontSize: '1.125rem' }}>
              We're on a mission to make Tamil Nadu's incredible heritage, culture, and natural beauty 
              accessible to travelers worldwide through technology and authentic local experiences.
            </p>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Founded in 2020, we've grown from a small team of travel enthusiasts to Tamil Nadu's 
              leading digital tourism platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-neutral-800/40 backdrop-blur-xl border-neutral-700/50 p-6 text-center hover:border-amber-500/50 transition-all">
                  <Icon className="text-amber-500 mx-auto mb-3" size={32} />
                  <div className="text-white mb-1">{stat.value}</div>
                  <div className="text-neutral-400 text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border-amber-500/20 p-8 h-full">
              <Target className="text-amber-500 mb-4" size={40} />
              <h2 className="text-white mb-4">Our Mission</h2>
              <p className="text-neutral-300">
                To revolutionize how people discover and experience Tamil Nadu by combining cutting-edge 
                AI technology with authentic local insights. We aim to create unforgettable journeys that 
                celebrate Tamil culture, support local communities, and preserve our rich heritage for 
                future generations.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl border-emerald-500/20 p-8 h-full">
              <Globe className="text-emerald-400 mb-4" size={40} />
              <h2 className="text-white mb-4">Our Vision</h2>
              <p className="text-neutral-300">
                To become the world's most trusted and innovative tourism platform for Tamil Nadu, 
                showcasing our state as a premier destination for cultural tourism, adventure, and 
                sustainable travel. We envision a future where every traveler can experience the magic 
                of Tamil Nadu through personalized, responsible tourism.
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Our Values</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-neutral-800/40 backdrop-blur-sm border-neutral-700/50 hover:border-amber-500/50 p-6 h-full transition-all group">
                    <div className={`w-14 h-14 rounded-xl bg-${value.color}-500/10 border border-${value.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`text-${value.color}-500`} size={28} />
                    </div>
                    <h3 className="text-white mb-3">{value.title}</h3>
                    <p className="text-neutral-400 text-sm">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Meet Our Team</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Passionate professionals dedicated to showcasing Tamil Nadu to the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-neutral-800/40 backdrop-blur-sm border-neutral-700/50 hover:border-amber-500/50 overflow-hidden transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white mb-1">{member.name}</h3>
                    <p className="text-amber-500 text-sm">{member.role}</p>
                  </div>
                </Card>
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
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">What Makes Us Different</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Why travelers choose Explore TN for their Tamil Nadu adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI-Powered Planning',
                description: 'Our advanced AI creates personalized itineraries in seconds, considering your preferences, budget, and travel style.',
                icon: Zap
              },
              {
                title: 'Verified Local Partners',
                description: 'Every hotel, guide, and service provider is personally verified and rated by real travelers.',
                icon: Shield
              },
              {
                title: 'Authentic Experiences',
                description: 'Go beyond tourist spots. Discover hidden gems and authentic local experiences curated by Tamil Nadu natives.',
                icon: Heart
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-neutral-800/40 backdrop-blur-sm border-neutral-700/50 p-8 text-center h-full hover:border-amber-500/50 transition-all">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-white mb-3">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}