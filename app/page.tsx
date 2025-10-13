import Hero from "@/components/Hero/Hero";

import MonacoWrapper from "@/components/Monaco/MonacoWraper";

//move to 2nd page

export default function App() {
  return (
    <main className="min-w-[1440px]">
      <Hero />

      {/* move to second page */}
      <MonacoWrapper />
    </main>
  );
}
