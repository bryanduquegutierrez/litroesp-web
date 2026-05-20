import { Banner } from "./components/Banner";
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
      <Stats />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
