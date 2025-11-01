"use client";

export default function Hero() {
  return (
    <section className="min-h-screen relative p-8 max-w-[1600px] mx-auto">
      {/* Top Left - KOSMOS */}
      <div className="absolute top-8 left-8">
        <h1 className="font-display font-bold text-6xl mb-4">COSMOS</h1>
        <p className="font-display text-xl">Infinity in every direction</p>
      </div>

      {/* Top Right */}
      <div className="absolute top-8 right-8 text-right">
        <h2 className="font-display font-bold text-4xl mb-2">SOMETHING GREATER</h2>
        <h2 className="font-display font-bold text-4xl mb-2">SOMETHING UNKNOWN</h2>
        <p className="font-display text-xl">Yet so beautiful</p>
      </div>

      {/* Center - Rotating Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-lg h-128 border boder-red-500">

        </div>
      </div>

      {/* Bottom Left - Space */}
      <div className="absolute bottom-8 left-8">
        <h2 className="font-display font-bold text-5xl mb-2">Space</h2>
        <p className="font-display text-xl">Where imagination begins</p>
      </div>

      {/* Bottom Right - DISCOVER MORE */}
      <div className="absolute bottom-8 right-8 text-right">
        <h2 className="font-display font-bold text-6xl">DISCOVER MORE</h2>
      </div>
    </section>
  );
}
