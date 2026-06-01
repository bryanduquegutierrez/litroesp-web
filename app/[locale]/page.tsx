import { AboutUs } from "./components/AboutUs";
import { Banner } from "./components/Banner";
import { Charging } from "./components/Charging";
import { Contact } from "./components/Contact";
import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Stats } from "./components/Stats";
import { WorldHero } from "./components/WorldHero";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Banner />
      <WorldHero />
      <Features />
      <Charging />
      <Stats />
      <AboutUs />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
