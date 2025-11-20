import { useState } from "react";
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1 Person");
  const [category, setCategory] = useState("");

  const quickCategories = ["Temples", "Beaches", "Hill Stations", "Heritage Sites", "Adventure"];

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (location) query.append("location", location);
    if (category) query.append("category", category);
    if (date) query.append("date", date);
    if (travelers) query.append("travelers", travelers);

    navigate(`/places?${query.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-neutral-800/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm text-neutral-400 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where to?"
                  className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-amber-500 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm text-neutral-400 mb-2">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-11 bg-neutral-900/50 border-neutral-700 focus:border-emerald-400 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm text-neutral-400 mb-2">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full pl-11 pr-4 bg-neutral-900/50 border border-neutral-700 focus:border-blue-400 rounded-xl h-12 text-white appearance-none cursor-pointer"
                >
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3-5 People</option>
                  <option>6+ People</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800 hover:border-amber-500 rounded-full"
            >
              <SlidersHorizontal className="mr-2" size={16} />
              Filters
            </Button>

            <div className="flex gap-2 flex-wrap">
              {quickCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                    category === cat
                      ? "bg-amber-500/20 border border-amber-500 text-amber-400"
                      : "bg-neutral-900/30 border border-neutral-700 hover:border-amber-500 hover:bg-amber-500/10 text-neutral-300 hover:text-amber-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
