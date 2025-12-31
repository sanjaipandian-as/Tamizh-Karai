import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from "lucide-react"
import { Button } from "../componants/ui/Button"
import { Input } from "../componants/ui/Input"
import Checkbox from "../componants/ui/Checkbox"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../API"
import { Helmet } from "react-helmet-async"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) navigate("/")
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return alert("Please fill all fields")

    setLoading(true)
    try {
      const res = await API.post("/api/auth/users/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Tamizh Karai</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-4 bg-black">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-24 right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-24 left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <section className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Sparkles className="text-amber-500" size={18} />
                <span className="text-amber-500">Welcome Back</span>
              </div>
              <h1 className="text-white text-2xl font-semibold mb-2">
                Sign in to Tamizh Karai
              </h1>
              <p className="text-neutral-400 text-sm">
                Continue exploring Tamil Nadu
              </p>
            </header>

            <div className="bg-neutral-800/40 rounded-2xl border border-neutral-700/50 p-8 backdrop-blur-xl">
              <form className="space-y-6" onSubmit={handleLogin}>
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
                  <label htmlFor="password" className="text-neutral-400 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-11 pr-11 h-12 bg-neutral-900/60 border-neutral-700 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-neutral-400 text-sm">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-amber-500 hover:text-amber-400 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold"
                >
                  <LogIn size={18} />
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-neutral-400 text-sm">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => navigate("/Signup-page")}
                    className="text-amber-500 hover:text-amber-400"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>

            <footer className="text-center text-neutral-500 text-xs mt-6">
              By signing in, you agree to our{" "}
              <span className="text-amber-500">Terms</span> and{" "}
              <span className="text-amber-500">Privacy Policy</span>
            </footer>
          </motion.div>
        </section>
      </main>
    </>
  )
}
