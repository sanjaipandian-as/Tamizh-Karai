import React from 'react';



const Facebook = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9-6.1 1.2-12.1 0-16.1-.7C2 9.7 4.1 4.5 9 3c.6.9 1.8 1.9 3 1.7 1.1.2 2.7-.5 3.7-1zM2 18c6.1.9 12.1 0 16.1.7 1.4 2.3 3.3 4.3 3.3 4.3-3.3-1.4-6.8-4-9.3-5.2-1.9-.9-3.3-1.4-4.3-1.4s-2.7.6-3.7 1.3c-.9.6-1.8 1.2-2.3 1.9C2 16.1 2 18 2 18z" />
  </svg>
);

const Instagram = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Mail = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Phone = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Send = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="m22 2-11 11" />
  </svg>
);

// --- UI Components (recreated) ---

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

const Button = React.forwardRef(({ className, size, ...props }, ref) => {
  const sizeClasses = size === 'icon' ? 'h-10 w-10' : 'h-10 px-4 py-2';
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium text-white ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});


export default function Footer({ onNavigate }) {
  const handleNavigate = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-black border-t border-neutral-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <h3 className="text-white bg-gradient-to-r from-amber-500 to-emerald-400 bg-clip-text text-transparent">
                Explore TN
              </h3>
            </div>
            <p className="text-neutral-400 mb-6 text-sm">
              Your gateway to discovering the rich culture, heritage, and natural beauty of Tamil Nadu.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                >
                  <social.icon className="text-neutral-400 group-hover:text-amber-500 transition-colors" size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => handleNavigate('about')} className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('home')} className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('hotels')} className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  Hotels
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('guides')} className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  Tour Guides
                </button>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  Travel Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Popular Places</h4>
            <ul className="space-y-3">
              {['Chennai', 'Madurai', 'Ooty', 'Kanyakumari', 'Kodaikanal', 'Rameswaram'].map((place) => (
                <li key={place}>
                  <a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors text-sm">
                    {place}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Stay Updated</h4>
            <p className="text-neutral-400 mb-4 text-sm">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="flex gap-2 mb-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-neutral-800/50 border-neutral-700 focus:border-amber-500 rounded-lg text-sm"
              />
              <Button 
                size="icon"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
            
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone size={16} className="text-amber-500" />
                <span>+91 44 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail size={16} className="text-emerald-400" />
                <span>info@exploretn.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © 2025 Explore TN. All rights reserved. | Tamil Nadu Tourism
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-neutral-500 hover:text-amber-500 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500" />
    </footer>
  );
}



// export default function App() {
//   const handleNavigation = (page) => {
//     console.log(`Navigating to: ${page}`);
//   };

//   return (
//     <div className="bg-black">
      
//       <Footer onNavigate={handleNavigation} />
//     </div>
//   );
// }