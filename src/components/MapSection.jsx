import { useState } from 'react';

function MapSection({ pickupLocation = '', dropoffLocation = '', mapMode, onModeChange, onLocationSelect }) {
  const [provider, setProvider] = useState('google');

  const originLocation = pickupLocation?.trim() || 'Current Location';
  const googleMapsUrl = dropoffLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originLocation)}&destination=${encodeURIComponent(dropoffLocation)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(originLocation)}`;
  const appleMapsUrl = dropoffLocation
    ? `https://maps.apple.com/?saddr=${encodeURIComponent(originLocation)}&daddr=${encodeURIComponent(dropoffLocation)}`
    : `https://maps.apple.com/?q=${encodeURIComponent(originLocation)}`;

  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
      <div className="mb-6 space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-taxi">Route preview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">View your selected route</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setProvider('google')}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              provider === 'google'
                ? 'bg-taxi text-slate-950'
                : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-taxi'
            }`}
          >
            Google Maps
          </button>
          <button
            type="button"
            onClick={() => setProvider('apple')}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              provider === 'apple'
                ? 'bg-taxi text-slate-950'
                : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-taxi'
            }`}
          >
            Apple Maps
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-slate-400">
          Pickup: <span className="font-semibold text-white">{pickupLocation || 'Not selected'}</span>
        </p>
        <p className="text-sm text-slate-400">
          Dropoff: <span className="font-semibold text-white">{dropoffLocation || 'Not selected'}</span>
        </p>
      </div>
      <div className="h-80 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90">
        <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-300">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </div>
          <p className="mb-3 text-lg font-semibold text-white">Route Preview</p>
          <p className="text-sm text-slate-400 mb-4">
            {pickupLocation && dropoffLocation
              ? 'Your selected route will open in the chosen map application.'
              : 'Select pickup and dropoff locations to preview your route.'}
          </p>
          {(pickupLocation || dropoffLocation) && (
            <a
              href={provider === 'google' ? googleMapsUrl : appleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-taxi px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-taxi/90"
            >
              Open in {provider === 'google' ? 'Google Maps' : 'Apple Maps'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default MapSection;
