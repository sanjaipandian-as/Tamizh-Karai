import { useState, useEffect } from 'react'
import { Heart, MapPin, Settings, LogOut, Plus, Star, Clock, Pencil, Trash } from 'lucide-react'
import { Button } from '../componants/ui/Button'
import { Input } from '../componants/ui/Input'
import Label from '../componants/ui/Label'
import { Card } from '../componants/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from "../componants/ui/Avatar"
import Separator from '../componants/ui/Separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../componants/ui/Tabs'
import { Badge } from '../componants/ui/Badge'
import ImageWithFallback from '../componants/figma/ImageWithFallback'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import API from '../../API'
import UserPickForm from './UserpickForm'
import Logo from "../assets/Logo.png"
import UserPickEditForm from './UserpPickEditForm'

export default function UserDashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [activeTab, setActiveTab] = useState('picks')
  const [showAddPickModal, setShowAddPickModal] = useState(false)
  const [showEditPickModal, setShowEditPickModal] = useState(false)
  const [editingPick, setEditingPick] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userPicks, setUserPicks] = useState([])

  useEffect(() => {
    if (!token) {
      navigate('/Login-page')
      return
    }
    API.get("/api/auth/users/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUserData(res.data)
      API.get("/api/picks/mine", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(picksRes => {
        setUserPicks(picksRes.data)
      })
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    navigate('/Login-page')
  }

  const openEdit = (pick) => {
    setEditingPick(pick)
    setShowEditPickModal(true)
  }

  const handleEditSubmit = async (values) => {
    const formData = new FormData()
    if (values.placeName !== undefined) formData.append('placeName', values.placeName)
    if (values.location !== undefined) formData.append('location', values.location)
    if (values.category !== undefined) formData.append('category', values.category)
    if (values.description !== undefined) formData.append('description', values.description)
    if (values.rating !== undefined) formData.append('rating', values.rating)
    if (values.bestTime !== undefined) formData.append('bestTime', values.bestTime)
    if (values.timeRequired !== undefined) formData.append('timeRequired', values.timeRequired)
    if (values.entryFee !== undefined) formData.append('entryFee', values.entryFee)
    if (values.image instanceof File) formData.append('image', values.image)
    const res = await API.put(`/api/picks/${editingPick._id}`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    })
    const updated = res.data
    setUserPicks(prev => prev.map(p => p._id === updated._id ? updated : p))
    setShowEditPickModal(false)
    setEditingPick(null)
  }

  const deletePick = async (id) => {
    await API.delete(`/api/picks/delete/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
})
    setUserPicks(prev => prev.filter(p => p._id !== id))
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5" />
      </div>
      <div className="relative z-10">
        <header className="bg-neutral-900/50 backdrop-blur-xl border-b border-neutral-800/50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')}>
                <h2 className="font-bold bg-gradient-to-r text-3xl from-orange-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-0">
                  <img src={Logo} alt="" className='w-24 h-24' />
                  Tamizh Karai
                </h2>
              </button>
              <Separator orientation="vertical" className="h-6 bg-neutral-700" />
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage />
                <AvatarFallback className="text-lg bg-black/30 text-white">
                  {userData?.fullName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-neutral-700/50 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {userData && (
            <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 mb-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage />
                  <AvatarFallback className="text-4xl text-white bg-black/30">
                    {userData.fullName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-1">{userData.fullName}</h1>
                  <p className="text-neutral-400 font-medium mb-2">{userData.email}</p>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-neutral-400 text-sm">Total Picks: </span>
                      <span className="font-bold text-orange-400">{userPicks.length}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setShowAddPickModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your Pick
                </Button>
              </div>
            </Card>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-neutral-800/50 border border-neutral-700/50">
              <TabsTrigger value="picks" className="font-medium">
                <Heart className="w-4 h-4 mr-2" />
                My Favorite Places
              </TabsTrigger>
              <TabsTrigger value="profile" className="font-medium">
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="picks" className="space-y-6">
              {userPicks.length === 0 && (
                <Card className="p-12 bg-neutral-900/30 backdrop-blur-xl border-neutral-800/50 text-center">
                  <MapPin className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No favorite places yet</h3>
                  <p className="text-neutral-400 mb-6">Start adding your favorite Tamil Nadu destinations!</p>
                  <Button
                    onClick={() => setShowAddPickModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Pick
                  </Button>
                </Card>
              )}
              {userPicks.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPicks.map(pick => (
                    <motion.div
                      key={pick._id}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group relative bg-neutral-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700/50 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <ImageWithFallback
                          src={pick.imageUrl}
                          alt={pick.placeName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white border-0">
                            {pick.category || "Place"}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <button className="p-2 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:border-amber-500 transition-all" onClick={() => openEdit(pick)}>
                            <Pencil size={18} className="text-white" />
                          </button>
                          <button className="p-2 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all" onClick={() => deletePick(pick._id)}>
                            <Trash size={18} className="text-white" />
                          </button>
                        </div>
                        {pick.entryFee && (
                          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10">
                            <span className="text-amber-500">{pick.entryFee}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {pick.placeName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                          <MapPin size={16} className="text-amber-500" />
                          <span>{pick.location}</span>
                        </div>
                        <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                          {pick.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="text-amber-500 fill-amber-500" size={16} />
                              <span className="text-white">{pick.rating || "4.5"}</span>
                              <span className="text-neutral-500 text-sm">({pick.reviews || "120"})</span>
                            </div>
                            <div className="flex items-center gap-1 text-neutral-400 text-sm">
                              <Clock size={16} />
                              <span>{pick.duration || "2-3 hrs"}</span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                          >
                            Explore
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="profile">
              {userData && (
                <Card className="p-8 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
                  <h3 className="text-xl font-bold mb-6 text-orange-400">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={userData.fullName} className="bg-neutral-800/50 border-neutral-700/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue={userData.email} className="bg-neutral-800/50 border-neutral-700/50" />
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {showAddPickModal && (
        <UserPickForm
          onClose={() => setShowAddPickModal(false)}
          onSubmit={(newPick) => {
            setUserPicks([...userPicks, newPick])
            setShowAddPickModal(false)
          }}
        />
      )}
      {showEditPickModal && editingPick && (
        <UserPickEditForm
          onClose={() => {
            setShowEditPickModal(false)
            setEditingPick(null)
          }}
          onSubmit={(updated) => {
            setUserPicks(prev => prev.map(p => p._id === updated._id ? updated : p))
            setShowEditPickModal(false)
            setEditingPick(null)
          }}
          editData={editingPick}
        />
      )}

    </div>
  )
}
