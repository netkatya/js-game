import Hero from "@/components/Hero/Hero";
import Legend from "@/components/Legend/Legend";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";

//move to 2nd page

export default function App() {
  return (
    <main>
      <ScrollToTopButton />
      <Hero />
      <Legend />
    </main>
  );
}
