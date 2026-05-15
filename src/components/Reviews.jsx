const reviews = [
  {
    name: 'Grace M.',
    quote: 'Fast pickup, clean car, and the driver knew the best route. Highly recommended!'
  },
  {
    name: 'Jordan K.',
    quote: 'The booking form was easy, and I loved that I could save my ride right away. Excellent service.'
  },
  {
    name: 'Amira S.',
    quote: 'On-time arrival and great communication. The map directions were super helpful.'
  }
];

function Reviews() {
  return (
    <section id="reviews" className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-taxi">Customer Reviews</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Loved by riders across the city</h2>
      </div>
      <div className="space-y-5">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/10">
            <p className="text-lg leading-8 text-slate-200">“{review.quote}”</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{review.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
