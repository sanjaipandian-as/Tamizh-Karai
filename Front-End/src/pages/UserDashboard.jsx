import { useState, useEffect } from "react"
import { Heart, MapPin, Settings, LogOut, Plus, Star, Clock, Pencil, Trash } from "lucide-react"
import { Button } from "../componants/ui/Button"
import { Input } from "../componants/ui/Input"
import Label from "../componants/ui/Label"
import { Card } from "../componants/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../componants/ui/Avatar"
import Separator from "../componants/ui/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../componants/ui/Tabs"
import { Badge } from "../componants/ui/Badge"
import ImageWithFallback from "../componants/figma/ImageWithFallback"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import API from "../../API"
import UserPickForm from "./UserpickForm"
import UserPickEditForm from "./UserpPickEditForm"
import Logo from "../assets/Logo.png"
import { Helmet } from "react-helmet-async"

export default function UserDashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [activeTab, setActiveTab] = useState("picks")
  const [userData, setUserData] = useState(null)
  const [userPicks, setUserPicks] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAddPickModal, setShowAddPickModal] = useState(false)
  const [showEditPickModal, setShowEditPickModal] = useState(false)
  const [editingPick, setEditingPick] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate("/Login-page")
      return
    }

    const fetchData = async () => {
      try {
        const userRes = await API.get("/api/auth/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUserData(userRes.data)

        const picksRes = await API.get("/api/picks/mine", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUserPicks(picksRes.data)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, navigate])

  const logout = () => {
    localStorage.clear()
    navigate("/Login-page")
  }

  const openEdit = (pick) => {
    setEditingPick(pick)
    setShowEditPickModal(true)
  }

  const deletePick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pick?")) return
    try {
      await API.delete(`/api/picks/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserPicks(prev => prev.filter(p => p._id !== id))
    } catch {
      alert("Failed to delete pick")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading dashboard...
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>User Dashboard | Tamizh Karai</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="min-h-screen bg-neutral-950 text-white">
        <header className="bg-neutral-900/60 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => navigate("/")}>
              <img src={Logo} alt="Tamizh Karai" className="w-24" />
            </button>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{userData?.fullName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 py-8">
          <Card className="mb-8 p-6 bg-neutral-900/50">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
                <p className="text-neutral-400">{userData?.email}</p>
                <p className="text-sm mt-2">
                  Total Picks:{" "}
                  <span className="text-amber-400 font-semibold">
                    {userPicks.length}
                  </span>
                </p>
              </div>
              <Button onClick={() => setShowAddPickModal(true)}>
                <Plus size={16} className="mr-2" /> Add Pick
              </Button>
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="picks">
                <Heart size={16} className="mr-2" /> My Picks
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Settings size={16} className="mr-2" /> Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="picks" className="mt-6">
              {userPicks.length === 0 ? (
                <Card className="p-10 text-center bg-neutral-900/40">
                  <MapPin size={48} className="mx-auto mb-4 text-neutral-500" />
                  <p className="text-neutral-400 mb-4">
                    You haven’t added any places yet
                  </p>
                  <Button onClick={() => setShowAddPickModal(true)}>
                    Add Your First Pick
                  </Button>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPicks.map(pick => (
                    <motion.article
                      key={pick._id}
                      whileHover={{ y: -6 }}
                      className="bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800"
                    >
                      <ImageWithFallback
                        src={pick.imageUrl}
                        alt={pick.placeName}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{pick.placeName}</h3>
                        <p className="text-sm text-neutral-400 mb-3">
                          {pick.location}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(pick)}>
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => deletePick(pick._id)}>
                              <Trash size={16} />
                            </button>
                          </div>
                          <span className="text-sm text-amber-400">
                            {pick.entryFee}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card className="p-6 bg-neutral-900/50">
                <h3 className="text-xl font-semibold mb-4">Profile Info</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input defaultValue={userData?.fullName} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={userData?.email} />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {showAddPickModal && (
          <UserPickForm
            onClose={() => setShowAddPickModal(false)}
            onSubmit={(newPick) => {
              setUserPicks(prev => [...prev, newPick])
              setShowAddPickModal(false)
            }}
          />
        )}

        {showEditPickModal && editingPick && (
          <UserPickEditForm
            editData={editingPick}
            onClose={() => {
              setShowEditPickModal(false)
              setEditingPick(null)
            }}
            onSubmit={(updated) => {
              setUserPicks(prev =>
                prev.map(p => p._id === updated._id ? updated : p)
              )
              setShowEditPickModal(false)
              setEditingPick(null)
            }}
          />
        )}
      </main>
    </>
  )
}
