import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '../componants/ui/Button';
import { Input } from '../componants/ui/Input';
import Checkbox from '../componants/ui/Checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return alert("Password must be at least 8 characters long");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      await API.post("/api/auth/users/signup", { fullName, email, phone, password });
      alert("Signup Successful");
      navigate("/Login-page");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen pt-25 pb-12 flex items-center justify-center px-4 bg-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 mb-6">
              <Sparkles className="text-emerald-400" size={20} />
              <span className="text-emerald-400">Join Us Today</span>
            </div>
            <h1 className="text-white mb-2">Create Your Account</h1>
            <p className="text-neutral-400">Start your Tamil Nadu adventure</p>
          </div>

          <div className="bg-neutral-800/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 p-8">
            <form className="space-y-5 text-white" onSubmit={handleSubmit}>
              
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-500 text-white rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-500 rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-500 rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="pl-11 pr-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-500 rounded-xl h-12"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-500 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-11 pr-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-500 rounded-xl h-12"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-500 transition-colors">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl shadow-lg shadow-emerald-500/25">
                <UserPlus className="mr-2" size={20} />
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-400 text-sm">
                Already have an account?{' '}
                <button onClick={() => navigate("/Login-page")} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Sign In
                </button>
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-center text-neutral-400 text-xs">
              🎉 Join 50,000+ travelers exploring Tamil Nadu with us!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
