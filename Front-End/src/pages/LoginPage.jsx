import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { Button } from '../componants/ui/Button';
import { Input } from '../componants/ui/Input';
import Checkbox from '../componants/ui/Checkbox';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen pt-25 flex items-center justify-center px-4 bg-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 mb-6">
              <Sparkles className="text-amber-500" size={20} />
              <span className="text-amber-500">Welcome Back</span>
            </div>
            <h1 className="text-white mb-2">Sign In to Explore TN</h1>
            <p className="text-neutral-400">Continue your journey through Tamil Nadu</p>
          </div>

          <div className="bg-neutral-800/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 p-8">
            <form className="space-y-6 text-white" onSubmit={handleLogin}>
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-amber-500 rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-11 pr-11 bg-neutral-900/50 border-neutral-700 focus:border-amber-500 rounded-xl h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-neutral-400 text-sm cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-amber-500 hover:text-amber-400 text-sm transition-colors">
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg shadow-amber-500/25">
                <LogIn className="mr-2" size={20} />
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-400 text-sm">
                Don't have an account?{' '}
                <button onClick={() => navigate("/Signup-page")} className="text-amber-500 hover:text-amber-400 transition-colors">
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-neutral-500 text-xs mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-amber-500 hover:text-amber-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-amber-500 hover:text-amber-400">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
