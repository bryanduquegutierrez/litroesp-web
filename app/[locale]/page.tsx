import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
