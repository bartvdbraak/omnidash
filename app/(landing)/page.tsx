import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Cta } from "@/components/landing/cta";

export default function Page() {
  return (
    <div className="overflow-x-hidden max-w-screen">
      <Hero />
      <Features />
      <Cta />
    </div>
  );
}
