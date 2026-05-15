function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/40 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/images/Balck%20axio.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/70" />

      <div className="relative z-10 space-y-8">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex rounded-full bg-taxi/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-taxi">
            Ride ready in minutes
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Taxi service for every trip — fast, safe, and reliable.
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Book your next pickup instantly. Professional drivers, live ETA updates, and seamless rides across the city.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#booking" className="inline-flex w-full items-center justify-center rounded-2xl bg-taxi px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-taxi/20 transition hover:-translate-y-0.5 sm:w-auto">
              Book Now
            </a>
            <a href="#reviews" className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:border-taxi/70 sm:w-auto">
              See reviews
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Quick booking', 'Airport transfers', '24/7 support', 'Trusted drivers'].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-sm shadow-slate-950/20 backdrop-blur-sm">
              <p className="text-sm uppercase text-slate-400">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
