import { Banner } from "./components/Banner";
import { Contact } from "./components/Contact";
import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Banner />
      <Hero />
      <Features />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
