import type { Metadata } from "next";
import { aboutPage } from "@/data/about";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.lead,
};

export default function AboutPage() {
  return <AboutView />;
}
