import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, Sparkles } from "lucide-react"
import { Button } from "../componants/ui/Button"
import { Input } from "../componants/ui/Input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../API"
import { Helmet } from "react-helmet-async"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullName || !email || !phone || !password || !confirmPassword)
      return alert("Please fill all fields")

    if (password.length < 8)
      return alert("Password must be at least 8 characters")

    if (password !== confirmPassword)
      return alert("Passwords do not match")

    setLoading(true)
    try {
      await API.post("/api/auth/users/signup", {
        fullName,
        email,
        phone,
        password
      })
      alert("Signup successful")
      navigate("/Login-page")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | Tamizh Karai</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-4 bg-black">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-24 right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-24 left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <section className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Sparkles className="text-emerald-400" size={18} />
                <span className="text-emerald-400">Join Us Today</span>
              </div>
              <h1 className="text-white text-2xl font-semibold mb-2">
                Create your account
              </h1>
              <p className="text-neutral-400 text-sm">
                Start exploring Tamil Nadu with Tamizh Karai
              </p>
            </header>

            <div className="bg-neutral-800/40 rounded-2xl border border-neutral-700/50 p-8 backdrop-blur-xl">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="text-neutral-400 text-sm mb-2 block">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="pl-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-neutral-400 text-sm mb-2 block">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="text-neutral-400 text-sm mb-2 block">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="pl-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-neutral-400 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="pl-11 pr-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="text-neutral-400 text-sm mb-2 block">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-11 pr-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      aria-label="Toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-400"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-semibold"
                >
                  <UserPlus size={18} />
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-neutral-400 text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/Login-page")}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>

            <footer className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
              <p className="text-neutral-400 text-xs">
                🎉 Join thousands of travelers discovering Tamil Nadu with Tamizh Karai
              </p>
            </footer>
          </motion.div>
        </section>
      </main>
    </>
  )
}
