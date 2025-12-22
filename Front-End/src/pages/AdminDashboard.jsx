import { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Hotel, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut, 
  Plus,
  TrendingUp,
  TrendingDown,
  Search,
  Upload,
  X,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPinned,
  Phone,
  Mail,
  Shield,
  Globe,
  Palette,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../componants/ui/Button';
import { Input } from '../componants/ui/Input';
import Label from '../componants/ui/Label';
import Textarea from '../componants/ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../componants/ui/Select';
import { Card } from '../componants/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from "../componants/ui/Avatar";
import { Badge } from '../componants/ui/Badge';
import Separator from '../componants/ui/Separator';
import { Switch } from '../componants/ui/Switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../componants/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../componants/ui/Tabs';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);

  const stats = [
    { 
      label: 'Total Places', 
      value: '156', 
      change: '+12%', 
      trend: 'up',
      icon: MapPin,
      color: 'from-orange-500 to-amber-500'
    },
    { 
      label: 'Total Hotels', 
      value: '89', 
      change: '+8%', 
      trend: 'up',
      icon: Hotel,
      color: 'from-amber-500 to-yellow-500'
    },
    { 
      label: 'Total Users', 
      value: '12.4K', 
      change: '+24%', 
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-green-500'
    },
    { 
      label: 'Active Guides', 
      value: '47', 
      change: '-3%', 
      trend: 'down',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'places', label: 'Manage Places', icon: MapPin },
    { id: 'hotels', label: 'Manage Hotels', icon: Hotel },
    { id: 'users', label: 'Users & Guides', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex ">
      <aside className="w-64 bg-neutral-900/50 backdrop-blur-xl gap-2 border-r border-neutral-800/50 flex flex-col">
        <div className="p-6 border-b border-neutral-800/50 ">
          <h1 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
            Tamizh Karai Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.15)]' 
                    : 'hover:bg-neutral-800/50 text-neutral-400 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800/50">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/30">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate font-semibold">Admin User</p>
              <p className="text-neutral-400 truncate text-xs">admin@exploreTN.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-neutral-900/50 backdrop-blur-xl border-b border-neutral-800/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input 
                  placeholder="Search places, hotels, users..." 
                  className="pl-10 bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-neutral-800/50 transition-colors">
                <Bell className="w-5 h-5 text-neutral-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>

              <Avatar className="w-9 h-9">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              <Button 
                variant="outline" 
                size="sm"
                className="border-neutral-700/50 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {activeSection === 'dashboard' && (
            <DashboardOverview 
              stats={stats}
              onAddPlace={() => setShowAddPlaceModal(true)}
              onAddHotel={() => setShowAddHotelModal(true)}
            />
          )}
          {activeSection === 'places' && (
            <ManagePlaces onAddPlace={() => setShowAddPlaceModal(true)} />
          )}
          {activeSection === 'hotels' && (
            <ManageHotels onAddHotel={() => setShowAddHotelModal(true)} />
          )}
          {activeSection === 'users' && <UsersAndGuides />}
          {activeSection === 'analytics' && <Analytics />}
          {activeSection === 'settings' && <SettingsPanel />}
        </main>
      </div>

      {showAddPlaceModal && (
        <AddPlaceModal onClose={() => setShowAddPlaceModal(false)} />
      )}

      {showAddHotelModal && (
        <AddHotelModal onClose={() => setShowAddHotelModal(false)} />
      )}
    </div>
  );
}

function DashboardOverview({ 
  stats, 
  onAddPlace, 
  onAddHotel 
}) {
  return (
    <div className="space-y-8 mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
            Dashboard Overview
          </h2>
          <p className="text-neutral-400 mt-1 font-medium">Welcome back! Here's what's happening with Tamizh Karai.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onAddPlace}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-[0_0_20px_rgba(251,146,60,0.3)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Place
          </Button>
          <Button 
            onClick={onAddHotel}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 hover:border-orange-500/30 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-neutral-400 mb-2 font-medium text-sm uppercase tracking-wide">{stat.label}</p>
                    <p className="mb-2 text-3xl font-bold">{stat.value}</p>
                    <div className={`flex items-center gap-1 font-semibold ${
                      stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="text-sm">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-shadow`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 text-white gap-6">
        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <h3 className="mb-4 text-orange-400 font-bold text-lg">Recent Places</h3>
          <div className="space-y-4">
            {[
              { name: 'Meenakshi Temple', city: 'Madurai', status: 'Active' },
              { name: 'Marina Beach', city: 'Chennai', status: 'Active' },
              { name: 'Ooty Lake', city: 'Ooty', status: 'Pending' },
            ].map((place, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors">
                <div>
                  <p className="font-semibold text-white">{place.name}</p>
                  <p className="text-neutral-400 text-sm">{place.city}</p>
                </div>
                <Badge variant={place.status === 'Active' ? 'default' : 'secondary'}>
                  {place.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <h3 className="mb-4 text-amber-400 font-bold text-lg">Recent Hotels</h3>
          <div className="space-y-4">
            {[
              { name: 'The Taj Gateway', city: 'Chennai', rating: '4.8' },
              { name: 'Sterling Resort', city: 'Ooty', rating: '4.6' },
              { name: 'Heritage Madurai', city: 'Madurai', rating: '4.7' },
            ].map((hotel, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors">
                <div>
                  <p className="font-semibold text-white">{hotel.name}</p>
                  <p className="text-neutral-400 text-sm">{hotel.city}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <span>★</span>
                  <span>{hotel.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ManagePlaces({ onAddPlace }) {
  const places = [
    { id: 1, name: 'Meenakshi Temple', city: 'Madurai', category: 'Temple', rating: 4.8, visitors: '2.5M', status: 'Active' },
    { id: 2, name: 'Marina Beach', city: 'Chennai', category: 'Beach', rating: 4.5, visitors: '3.1M', status: 'Active' },
    { id: 3, name: 'Ooty Lake', city: 'Ooty', category: 'Hill Station', rating: 4.7, visitors: '1.8M', status: 'Active' },
    { id: 4, name: 'Brihadeeswarar Temple', city: 'Thanjavur', category: 'Temple', rating: 4.9, visitors: '1.2M', status: 'Active' },
    { id: 5, name: 'Kodaikanal Lake', city: 'Kodaikanal', category: 'Hill Station', rating: 4.6, visitors: '980K', status: 'Active' },
    { id: 6, name: 'Rameswaram Temple', city: 'Rameswaram', category: 'Temple', rating: 4.8, visitors: '2.1M', status: 'Pending' },
    { id: 7, name: 'Mahabalipuram Shore Temple', city: 'Mahabalipuram', category: 'Historical', rating: 4.7, visitors: '1.5M', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
            Manage Places
          </h2>
          <p className="text-neutral-400 mt-1 font-medium">Total {places.length} places registered</p>
        </div>
        <Button 
          onClick={onAddPlace}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Place
        </Button>
      </div>

      <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
              <TableHead className="text-neutral-400">Place Name</TableHead>
              <TableHead className="text-neutral-400">City</TableHead>
              <TableHead className="text-neutral-400">Category</TableHead>
              <TableHead className="text-neutral-400">Rating</TableHead>
              <TableHead className="text-neutral-400">Annual Visitors</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {places.map((place) => (
              <TableRow key={place.id} className="border-neutral-800 hover:bg-neutral-800/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{place.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-400">{place.city}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    {place.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-semibold">{place.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-400">{place.visitors}</TableCell>
                <TableCell>
                  <Badge variant={place.status === 'Active' ? 'default' : 'secondary'}>
                    {place.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="ghost" className="hover:bg-neutral-800">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-neutral-800 text-orange-400">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ManageHotels({ onAddHotel }) {
  const hotels = [
    { id: 1, name: 'The Taj Gateway', city: 'Chennai', category: 'Luxury', rating: 4.8, rooms: 120, price: '₹8,500', status: 'Active' },
    { id: 2, name: 'Sterling Resort', city: 'Ooty', category: 'Resort', rating: 4.6, rooms: 85, price: '₹6,200', status: 'Active' },
    { id: 3, name: 'Heritage Madurai', city: 'Madurai', category: 'Heritage', rating: 4.7, rooms: 95, price: '₹5,800', status: 'Active' },
    { id: 4, name: 'ITC Grand Chola', city: 'Chennai', category: 'Luxury', rating: 4.9, rooms: 600, price: '₹12,000', status: 'Active' },
    { id: 5, name: 'The Carlton', city: 'Kodaikanal', category: 'Premium', rating: 4.5, rooms: 110, price: '₹7,500', status: 'Active' },
    { id: 6, name: 'Hyatt Regency', city: 'Chennai', category: 'Luxury', rating: 4.8, rooms: 327, price: '₹9,800', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
            Manage Hotels
          </h2>
          <p className="text-neutral-400 mt-1 font-medium">Total {hotels.length} hotels partnered</p>
        </div>
        <Button 
          onClick={onAddHotel}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Hotel
        </Button>
      </div>

      <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
              <TableHead className="text-neutral-400">Hotel Name</TableHead>
              <TableHead className="text-neutral-400">City</TableHead>
              <TableHead className="text-neutral-400">Category</TableHead>
              <TableHead className="text-neutral-400">Rating</TableHead>
              <TableHead className="text-neutral-400">Rooms</TableHead>
              <TableHead className="text-neutral-400">Avg. Price</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id} className="border-neutral-800 hover:bg-neutral-800/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{hotel.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-400">{hotel.city}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    {hotel.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-400 font-medium">{hotel.rooms}</TableCell>
                <TableCell className="text-emerald-400 font-semibold">{hotel.price}</TableCell>
                <TableCell>
                  <Badge variant={hotel.status === 'Active' ? 'default' : 'secondary'}>
                    {hotel.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="ghost" className="hover:bg-neutral-800">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-neutral-800 text-amber-400">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function UsersAndGuides() {
  const users = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', type: 'User', joined: '2024-01-15', bookings: 12, status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya.s@gmail.com', type: 'User', joined: '2024-02-20', bookings: 8, status: 'Active' },
    { id: 3, name: 'Anand Ravi', email: 'anand.r@gmail.com', type: 'Guide', joined: '2023-11-10', tours: 45, status: 'Active' },
    { id: 4, name: 'Lakshmi Devi', email: 'lakshmi.d@gmail.com', type: 'Guide', joined: '2024-01-05', tours: 32, status: 'Active' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.s@gmail.com', type: 'User', joined: '2024-03-12', bookings: 5, status: 'Active' },
    { id: 6, name: 'Meena Krishnan', email: 'meena.k@gmail.com', type: 'Guide', joined: '2024-02-28', tours: 18, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
          Users & Guides
        </h2>
        <p className="text-neutral-400 mt-1 font-medium">Manage registered users and tour guides</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-neutral-800/50 border border-neutral-700/50">
          <TabsTrigger value="all">All ({users.length})</TabsTrigger>
          <TabsTrigger value="users">Users ({users.filter(u => u.type === 'User').length})</TabsTrigger>
          <TabsTrigger value="guides">Guides ({users.filter(u => u.type === 'Guide').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
                  <TableHead className="text-neutral-400">Name</TableHead>
                  <TableHead className="text-neutral-400">Email</TableHead>
                  <TableHead className="text-neutral-400">Type</TableHead>
                  <TableHead className="text-neutral-400">Joined</TableHead>
                  <TableHead className="text-neutral-400">Activity</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-neutral-800 hover:bg-neutral-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-400 text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={user.type === 'Guide' ? 'border-amber-500/30 text-amber-400 font-medium' : 'border-blue-500/30 text-blue-400 font-medium'}>
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-400 font-medium">{user.joined}</TableCell>
                    <TableCell className="text-neutral-400 font-medium">
                      {'bookings' in user ? `${user.bookings} bookings` : `${user.tours} tours`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-neutral-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-neutral-800 text-orange-400">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
                  <TableHead className="text-neutral-400">Name</TableHead>
                  <TableHead className="text-neutral-400">Email</TableHead>
                  <TableHead className="text-neutral-400">Joined</TableHead>
                  <TableHead className="text-neutral-400">Bookings</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(u => u.type === 'User').map((user) => (
                  <TableRow key={user.id} className="border-neutral-800 hover:bg-neutral-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-400">{user.email}</TableCell>
                    <TableCell className="text-neutral-400">{user.joined}</TableCell>
                    <TableCell className="text-neutral-400">{'bookings' in user && user.bookings}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-neutral-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
                  <TableHead className="text-neutral-400">Name</TableHead>
                  <TableHead className="text-neutral-400">Email</TableHead>
                  <TableHead className="text-neutral-400">Joined</TableHead>
                  <TableHead className="text-neutral-400">Tours</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(u => u.type === 'Guide').map((user) => (
                  <TableRow key={user.id} className="border-neutral-800 hover:bg-neutral-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-400">{user.email}</TableCell>
                    <TableCell className="text-neutral-400">{user.joined}</TableCell>
                    <TableCell className="text-neutral-400">{'tours' in user && user.tours}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-neutral-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Analytics() {
  const monthlyData = [
    { month: 'Jan', visitors: 24500, bookings: 1850, revenue: 2850000 },
    { month: 'Feb', visitors: 28900, bookings: 2100, revenue: 3240000 },
    { month: 'Mar', visitors: 32400, bookings: 2450, revenue: 3680000 },
    { month: 'Apr', visitors: 29800, bookings: 2200, revenue: 3320000 },
    { month: 'May', visitors: 35600, bookings: 2680, revenue: 4020000 },
    { month: 'Jun', visitors: 41200, bookings: 3100, revenue: 4650000 },
  ];

  const topPlaces = [
    { name: 'Meenakshi Temple', visits: 42500, revenue: '₹12.5L' },
    { name: 'Marina Beach', visits: 38200, revenue: '₹8.2L' },
    { name: 'Ooty Lake', visits: 31800, revenue: '₹15.8L' },
    { name: 'Brihadeeswarar Temple', visits: 28500, revenue: '₹9.4L' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
          Analytics
        </h2>
        <p className="text-neutral-400 mt-1 font-medium">Insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 font-medium uppercase tracking-wide text-sm">Total Revenue</h3>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="mb-1 text-3xl text-white font-bold">₹2.17 Cr</p>
          <p className="text-emerald-400 font-semibold text-sm">+18.2% from last month</p>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 font-medium uppercase tracking-wide text-sm">Total Bookings</h3>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="mb-1 text-3xl text-white font-bold">14,380</p>
          <p className="text-emerald-400 font-semibold text-sm">+22.5% from last month</p>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 font-medium uppercase tracking-wide text-sm">Avg. Rating</h3>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <p className="mb-1 text-3xl text-white font-bold">4.7 / 5.0</p>
          <p className="text-amber-400 font-semibold text-sm">Excellent performance</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <h3 className="mb-6 text-orange-400 font-bold text-lg">Monthly Visitors</h3>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400 font-medium">{data.month}</span>
                  <span className="font-semibold">{data.visitors.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    style={{ width: `${(data.visitors / 45000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <h3 className="mb-6 text-amber-400 font-bold text-lg">Top Performing Places</h3>
          <div className="space-y-4">
            {topPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold">
                    <span>{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-neutral-400 text-sm font-medium">{place.visits.toLocaleString()} visits</p>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold">
                  {place.revenue}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
        <h3 className="mb-6 text-orange-400 font-bold text-lg">Revenue Breakdown</h3>
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-800/30">
              <TableHead className="text-neutral-400">Month</TableHead>
              <TableHead className="text-neutral-400">Visitors</TableHead>
              <TableHead className="text-neutral-400">Bookings</TableHead>
              <TableHead className="text-neutral-400 text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.map((data, index) => (
              <TableRow key={index} className="border-neutral-800 hover:bg-neutral-800/30">
                <TableCell className="text-neutral-400">{data.month} 2024</TableCell>
                <TableCell className="text-neutral-400">{data.visitors.toLocaleString()}</TableCell>
                <TableCell className="text-neutral-400">{data.bookings.toLocaleString()}</TableCell>
                <TableCell className="text-right text-emerald-400">₹{(data.revenue / 100000).toFixed(1)}L</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
          Settings
        </h2>
        <p className="text-neutral-400 mt-1">Manage application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-orange-400">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Maintenance Mode</p>
                <p className="text-neutral-400">Temporarily disable the website</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Email Notifications</p>
                <p className="text-neutral-400">Send email updates to users</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Auto Approval</p>
                <p className="text-neutral-400">Auto-approve new places and hotels</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl text-white border-neutral-800/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-amber-400">Website Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                defaultValue="Tamizh Karai"
                className="mt-2 bg-neutral-800/50 border-neutral-700/50"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                defaultValue="Discover the beauty and culture of Tamil Nadu"
                className="mt-2 bg-neutral-800/50 border-neutral-700/50"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                defaultValue="info@exploreTN.com"
                className="mt-2 bg-neutral-800/50 border-neutral-700/50"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-blue-400">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Two-Factor Authentication</p>
                <p className="text-neutral-400">Add extra security layer</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Login Alerts</p>
                <p className="text-neutral-400">Get notified of new logins</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
              Change Password
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-purple-400">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Theme Color</Label>
              <div className="flex gap-3 mt-2">
                <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 ring-2 ring-orange-400 ring-offset-2 ring-offset-neutral-900" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-neutral-900 transition-all" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:ring-2 hover:ring-purple-400 hover:ring-offset-2 hover:ring-offset-neutral-900 transition-all" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:ring-2 hover:ring-green-400 hover:ring-offset-2 hover:ring-offset-neutral-900 transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Glassmorphism Effects</p>
                <p className="text-neutral-400">Enable blur effects</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30">
              <div>
                <p>Animations</p>
                <p className="text-neutral-400">Enable smooth transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800/50 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-emerald-400">Database Management</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-neutral-700/50 hover:bg-neutral-800 hover:border-emerald-500/50">
              Backup Database
            </Button>
            <Button variant="outline" className="border-neutral-700/50 hover:bg-neutral-800 hover:border-blue-500/50">
              Restore Database
            </Button>
            <Button variant="outline" className="border-neutral-700/50 hover:bg-neutral-800 hover:border-red-500/50 hover:text-red-400">
              Clear Cache
            </Button>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-neutral-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">Database Size</span>
              <span>2.4 GB</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">Last Backup</span>
              <span>2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Cache Size</span>
              <span>156 MB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AddPlaceModal({ onClose }) {
  const [formData, setFormData] = useState({
    placeName: '',
    city: '',
    description: '',
    category: '',
    coordinates: '',
    bestSeason: '',
    entryFee: '',
    rating: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Place data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(251,146,60,0.3)]"
      >
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <h3 className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Add New Place
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placeName">Place Name *</Label>
              <Input
                id="placeName"
                placeholder="e.g., Meenakshi Temple"
                value={formData.placeName}
                onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="e.g., Madurai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the place..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="hill-station">Hill Station</SelectItem>
                  <SelectItem value="historical">Historical Site</SelectItem>
                  <SelectItem value="wildlife">Wildlife Sanctuary</SelectItem>
                  <SelectItem value="cultural">Cultural Site</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bestSeason">Best Season to Visit</Label>
              <Input
                id="bestSeason"
                placeholder="e.g., October - March"
                value={formData.bestSeason}
                onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coordinates">Coordinates (Lat, Long)</Label>
              <Input
                id="coordinates"
                placeholder="e.g., 9.9252, 78.1198"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryFee">Entry Fee (₹)</Label>
              <Input
                id="entryFee"
                type="number"
                placeholder="e.g., 50"
                value={formData.entryFee}
                onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="e.g., 4.5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-orange-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image Upload</Label>
            <div className="border-2 border-dashed border-neutral-700/50 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-neutral-500" />
              <p className="text-neutral-400">Click to upload or drag and drop</p>
              <p className="text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
              <input type="file" className="hidden" id="image" accept="image/*" />
            </div>
          </div>

          <Separator className="bg-neutral-800" />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-700/50 hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-[0_0_20px_rgba(251,146,60,0.3)]"
            >
              Add Place
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AddHotelModal({ onClose }) {
  const [formData, setFormData] = useState({
    hotelName: '',
    city: '',
    address: '',
    contactNumber: '',
    category: '',
    amenities: '',
    roomTypes: '',
    coordinates: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hotel data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.3)]"
      >
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <h3 className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Add New Hotel
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name *</Label>
              <Input
                id="hotelName"
                placeholder="e.g., The Taj Gateway"
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelCity">City *</Label>
              <Input
                id="hotelCity"
                placeholder="e.g., Chennai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              placeholder="Complete address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="e.g., +91 9876543210"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelCategory">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="luxury">Luxury (5-Star)</SelectItem>
                  <SelectItem value="premium">Premium (4-Star)</SelectItem>
                  <SelectItem value="comfort">Comfort (3-Star)</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="heritage">Heritage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities</Label>
            <Textarea
              id="amenities"
              placeholder="e.g., WiFi, Swimming Pool, Spa, Restaurant, Gym"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomTypes">Room Types & Prices</Label>
            <Textarea
              id="roomTypes"
              placeholder="e.g., Deluxe Room: ₹3500/night, Suite: ₹7500/night"
              value={formData.roomTypes}
              onChange={(e) => setFormData({ ...formData, roomTypes: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelCoordinates">Map Coordinates (Lat, Long)</Label>
            <Input
              id="hotelCoordinates"
              placeholder="e.g., 13.0827, 80.2707"
              value={formData.coordinates}
              onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
              className="bg-neutral-800/50 border-neutral-700/50 focus:border-amber-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelImage">Image Upload</Label>
            <div className="border-2 border-dashed border-neutral-700/50 rounded-lg p-8 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-neutral-500" />
              <p className="text-neutral-400">Click to upload or drag and drop</p>
              <p className="text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
              <input type="file" className="hidden" id="hotelImage" accept="image/*" />
            </div>
          </div>

          <Separator className="bg-neutral-800" />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-700/5S0 hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              Add Hotel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}