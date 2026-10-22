import { Hero } from "@/components/sections/Hero";
import { PopularCategories } from "@/components/sections/PopularCategories";
import { FreshPicks } from "@/components/sections/FreshPicks";
import { WeeklyBest } from "@/components/sections/WeeklyBest";
import { HomeAbout } from "@/components/sections/HomeAbout";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <PopularCategories />
      <FreshPicks />
      <WeeklyBest />
      <HomeAbout />
    </div>
  );
}
