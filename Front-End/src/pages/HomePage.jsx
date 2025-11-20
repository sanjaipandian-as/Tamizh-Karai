import React from "react";
import HeroSection from "../componants/HeroSection";
import SearchBar from "../componants/SearchBar";
import PopularDestinations from "../componants/PopularDestinations";
import AITripPlanner from "../componants/AITripPlanner";
import UserPicks from "../componants/userPicks";
import HotelGuideSection from "../componants/HotelGuideSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="bg-[#0a0a0a] text-white">
        <SearchBar />
      </div>
      <PopularDestinations />
      <AITripPlanner />
      <UserPicks />
      <HotelGuideSection />
    </>
  );
}
