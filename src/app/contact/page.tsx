import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: site.contactPage.title,
  description: site.contactPage.text,
};

export default function ContactPage() {
  return <ContactView />;
}
