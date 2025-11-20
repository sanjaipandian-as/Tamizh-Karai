import { motion } from 'framer-motion';
import { Menu, X, MapPin, User, Heart, Search, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const menuItems = [
  { label: 'Destinations', page: '/', route: '/' },
  { label: 'Hotels', page: 'hotels', route: '/Hotels' },
  { label: 'Places', page: 'Places', route: '/Places' },
  { label: 'AI Planner', page: 'ai-planner', route: '/TamizhkaraiBot' },
  { label: 'About', page: 'about', route: '/About-us' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route) => {
    navigate(route);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 shadow-lg'
        : 'bg-neutral-900/5 backdrop-blur-md border-b border-neutral-800'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNavClick('/')} className="flex items-center gap-2 cursor-pointer">
            <img src={Logo} alt="TAMIZH KARAI" className="h-24 w-24" />
            <div>
              <span className="text-white block font-semibold">Tamizh Karai</span>
              <span className="text-xs text-neutral-400">Tamil Nadu Tourism</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.route)}
                className={`transition-colors relative inline-block group cursor-pointer ${currentPath === item.route ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-500'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all w-0 group-hover:w-full ${currentPath === item.route ? 'w-full' : ''}`} />
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-amber-500 hover:bg-amber-500/10 cursor-pointer">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer">
              <Heart size={20} />
            </Button>

            {token ? (
              <Button
                onClick={() => handleNavClick('/user-dashboard')}
                variant="outline"
                className="bg-transparent border-neutral-700 hover:border-orange-500 hover:bg-orange-500/10 text-white rounded-lg cursor-pointer"
              >
                <LayoutDashboard className="mr-2" size={18} />
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => handleNavClick('/Login-page')}
                variant="outline"
                className="bg-transparent border-neutral-700 hover:border-amber-500 hover:bg-amber-500/10 text-white rounded-lg cursor-pointer"
              >
                <User className="mr-2" size={18} />
                Sign In
              </Button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="lg:hidden bg-neutral-900/98 backdrop-blur-xl border-t border-neutral-800">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.route)}
                className={`block w-full text-left transition-colors py-2 cursor-pointer ${currentPath === item.route ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-500'}`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-neutral-800 space-y-3">
              {token ? (
                <Button
                  onClick={() => handleNavClick('/user-dashboard')}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg cursor-pointer"
                >
                  <LayoutDashboard className="mr-2" size={18} />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => handleNavClick('/Login-page')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg cursor-pointer"
                >
                  <User className="mr-2" size={18} />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
