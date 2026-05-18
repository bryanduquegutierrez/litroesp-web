import { Banner } from "./components/Banner";
import { Contact } from "./components/Contact";
import { CTA } from "./components/CTA";
import { EuropeHero } from "./components/EuropeHero";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Banner />
      <EuropeHero />
      <Features />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
