import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/stazzy.jpg";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Blurred fill background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Hero blurred backdrop"
          className="w-full h-full object-cover scale-110 blur-2xl brightness-90"
          aria-hidden="true"
          draggable={false}
        />
      </div>
      {/* Sharp intrinsic image centered without upscaling */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <img
          src={heroImage}
          alt="Hero background"
          className="max-w-none h-auto"
          style={{
            /* Prevent upscaling: only shrink if larger than viewport */
            width: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
          draggable={false}
        />
      </div>
      {/* Gradient overlay for readability sits above blurred layer but below content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/60 z-20" />
      
  <div className="relative z-30 text-center text-white px-4 max-w-4xl mx-auto">
  <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000 drop-shadow-lg">
          From the streets to your feet
        </h1>
  <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in slide-in-from-bottom duration-1000 delay-200 drop-shadow">
          Simple. Clean. Stazzy.
        </p>
      </div>
    </section>
  );
}