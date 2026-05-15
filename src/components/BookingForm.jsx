import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { generateICS } from '../lib/ics.js';
import BookingCalendar from './BookingCalendar.jsx';
import Clock from './Clock.jsx';

const initialForm = {
  full_name: '',
  email: '',
  booking_type: 'simple',
  pickup_location: '',
  dropoff_location: '',
  additional_dropoffs: [''],
  pickup_date: '',
  pickup_time: '09:00',
  passengers: 1,
};

function BookingForm({ pickupLocation, dropoffLocation, onPickupChange, onDropoffChange }) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    booking_type: 'simple',
    pickup_location: pickupLocation,
    dropoff_location: dropoffLocation,
    additional_dropoffs: [''],
    pickup_date: '',
    pickup_time: '09:00',
    passengers: 1,
  });
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('taxiBooking');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.pickup_date === undefined && parsed.pickup_time?.includes('T')) {
        const [date, time] = parsed.pickup_time.split('T');
        parsed.pickup_date = date;
        parsed.pickup_time = time.substring(0, 5);
      }
      setForm((prev) => ({ ...prev, ...parsed }));
    }
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, pickup_location: pickupLocation }));
  }, [pickupLocation]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, dropoff_location: dropoffLocation }));
  }, [dropoffLocation]);

  const bookingTypeLabel = form.booking_type === 'simple' ? 'Simple dropoff' : 'Multiple drop points';
  const dropPointsCount = form.additional_dropoffs.filter(Boolean).length + 1;

  useEffect(() => {
    window.localStorage.setItem('taxiBooking', JSON.stringify(form));
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? Number(value) : value,
    }));
  };

  const handleAdditionalDropoffChange = (index, value) => {
    setForm((prev) => {
      const additional_dropoffs = [...prev.additional_dropoffs];
      additional_dropoffs[index] = value;
      return { ...prev, additional_dropoffs };
    });
  };

  const addDropoffPoint = () => {
    setForm((prev) => ({ ...prev, additional_dropoffs: [...prev.additional_dropoffs, ''] }));
  };

  const removeDropoffPoint = (index) => {
    setForm((prev) => {
      const additional_dropoffs = prev.additional_dropoffs.filter((_, i) => i !== index);
      return { ...prev, additional_dropoffs: additional_dropoffs.length ? additional_dropoffs : [''] };
    });
  };

  const calculateBookingMessage = () => {
    if (form.booking_type === 'simple') {
      return 'Simple dropoff with a default 30-minute buffer before the next booking.';
    }
    return 'Multiple drop points selected. More than 2 extras becomes a full-day booking.';
  };

  const buildRouteUrl = ({ provider }) => {
    if (!form.pickup_location || !form.dropoff_location) return '#';

    const origin = encodeURIComponent(form.pickup_location);
    const destination = encodeURIComponent(form.dropoff_location);
    const waypoints = form.additional_dropoffs.filter(Boolean).map(encodeURIComponent).join('%7C');

    if (provider === 'apple') {
      const base = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
      return waypoints ? `${base}&waypoints=${waypoints}` : base;
    }

    const googleBase = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    return waypoints ? `${googleBase}&waypoints=${waypoints}` : googleBase;
  };

  const googleRouteUrl = buildRouteUrl({ provider: 'google' });
  const appleRouteUrl = buildRouteUrl({ provider: 'apple' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.pickup_date || !form.pickup_time) {
      setStatus('Please choose a pickup date and time.');
      return;
    }

    if (form.booking_type === 'multiple' && form.additional_dropoffs.filter(Boolean).length < 1) {
      setStatus('Please add at least one additional dropoff point for a multiple drop booking.');
      return;
    }

    const pickupDateTime = `${form.pickup_date}T${form.pickup_time}`;
    const startDate = new Date(pickupDateTime);

    if (Number.isNaN(startDate.getTime())) {
      setStatus('Invalid booking time. Please choose a valid date and time.');
      return;
    }

    setSaving(true);
    setStatus('Saving booking...');

    const dropPointsCount = form.additional_dropoffs.filter(Boolean).length + 1;
    const isFullDay = form.booking_type === 'multiple' && dropPointsCount > 2;
    const bookingDuration = isFullDay ? 'full day' : form.booking_type === 'multiple' ? 'multi-stop' : '30 minutes';
    const bookingDescription = form.booking_type === 'multiple'
      ? `${isFullDay ? 'Full-day' : 'Multi-stop'} booking with ${dropPointsCount} drop points.`
      : 'Simple dropoff with default 30-minute gap before accepting another booking.';

    const { data, error } = await supabase.from('bookings').insert([
      {
        full_name: form.full_name,
        email: form.email,
        booking_type: form.booking_type,
        pickup_location: form.pickup_location,
        dropoff_location: form.dropoff_location,
        additional_dropoffs: form.additional_dropoffs.filter(Boolean).join(' | '),
        pickup_time: pickupDateTime,
        passengers: form.passengers,
        booking_duration: bookingDuration,
        notes: bookingDescription,
      },
    ]);

    if (error) {
      setStatus('Unable to save booking. Check your Supabase credentials and try again.');
      console.error(error);
      setSaving(false);
      return;
    }

    setStatus('Booking confirmed! Your calendar file is ready to download.');
    setSaving(false);
    generateICS({
      title: 'Taxi Pickup',
      description: `Taxi booking from ${form.pickup_location} to ${form.dropoff_location}`,
      start: startDate,
      durationMinutes: 45,
      location: `${form.pickup_location} → ${form.dropoff_location}`,
      filename: 'taxi-booking.ics',
    });

    setForm(initialForm);
    window.localStorage.removeItem('taxiBooking');
  };

  return (
    <section id="booking" className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-taxi">Book Your Ride</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Reserve a taxi in seconds</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Full Name
            <input
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Email Address
            <input
              type="email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-950/90 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Select booking type</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, booking_type: 'simple' }))}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                form.booking_type === 'simple'
                  ? 'bg-taxi text-slate-950'
                  : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-taxi'
              }`}
            >
              Simple dropoff
            </button>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, booking_type: 'multiple' }))}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                form.booking_type === 'multiple'
                  ? 'bg-taxi text-slate-950'
                  : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-taxi'
              }`}
            >
              Multiple drop points
            </button>
          </div>
          <p className="text-sm text-slate-400">{calculateBookingMessage()}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center justify-between gap-3">
            <label className="min-w-0 flex-1 space-y-2">
              Pickup Location
              <input
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
                name="pickup_location"
                value={form.pickup_location}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, pickup_location: e.target.value }));
                  onPickupChange?.(e.target.value);
                }}
                required
              />
            </label>
            <button
              type="button"
              onClick={() => {
                if (!navigator.geolocation) {
                  setStatus('Geolocation is not supported by your browser.');
                  return;
                }

                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const current = `${position.coords.latitude.toFixed(6)},${position.coords.longitude.toFixed(6)}`;
                    setForm((prev) => ({ ...prev, pickup_location: current }));
                    onPickupChange?.(current);
                    setStatus('Current location set as pickup. You can adjust it or open maps to refine.');
                  },
                  () => {
                    setStatus('Unable to access your location. Allow location access and try again.');
                  }
                );
              }}
              className="rounded-2xl border border-taxi bg-slate-950/90 px-4 py-3 text-sm font-semibold text-taxi transition hover:bg-taxi/10"
            >
              Use current location
            </button>
          </div>
        </div>
        <label className="space-y-2 text-sm text-slate-300">
          Dropoff Location
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
            name="dropoff_location"
            value={form.dropoff_location}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, dropoff_location: e.target.value }));
              onDropoffChange?.(e.target.value);
            }}
            required
          />
        </label>
        {form.booking_type === 'simple' && form.pickup_location && form.dropoff_location && (
          <div className="space-y-3 rounded-3xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Route preview</p>
            <p>Estimate travel time using Google Maps or Apple Maps before confirming.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={googleRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open in Google Maps
              </a>
              <a
                href={appleRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-taxi"
              >
                Open in Apple Maps
              </a>
            </div>
          </div>
        )}
        {form.booking_type === 'multiple' && (
          <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Additional drop points</p>
              <button
                type="button"
                onClick={addDropoffPoint}
                className="rounded-2xl bg-taxi px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-taxi/90"
              >
                Add point
              </button>
            </div>
            {form.additional_dropoffs.map((value, index) => (
              <div key={index} className="flex gap-3">
                <input
                  className="min-w-0 flex-1 rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
                  placeholder={`Drop point ${index + 2}`}
                  value={value}
                  onChange={(e) => handleAdditionalDropoffChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeDropoffPoint(index)}
                  className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <BookingCalendar selectedDate={form.pickup_date} onSelect={(date) => setForm((prev) => ({ ...prev, pickup_date: date }))} />
            <label className="space-y-2 text-sm text-slate-300">
              Pickup Time
              <input
                type="time"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-taxi"
                name="pickup_time"
                value={form.pickup_time}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="space-y-6 rounded-3xl border border-slate-700 bg-slate-950/90 p-6">
            <Clock />
            <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Booking summary</p>
              <p className="mt-3">Type: {form.booking_type === 'simple' ? 'Simple dropoff' : 'Multiple drop points'}</p>
              <p>Date: {form.pickup_date || 'Not selected'}</p>
              <p>Time: {form.pickup_time || 'Not selected'}</p>
              <p>Pickup: {form.pickup_location || 'Enter pickup'}</p>
              <p>Dropoff: {form.dropoff_location || 'Enter dropoff'}</p>
              {form.booking_type === 'multiple' && (
                <>
                  <p>Extra stops: {form.additional_dropoffs.filter(Boolean).length || 0}</p>
                  <p>{dropPointsCount > 2 ? 'This booking will be reserved as a full-day tour.' : 'This booking is a multi-stop trip.'}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-taxi px-6 py-4 text-base font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Booking...' : 'Confirm Booking'}
        </button>
        {status && <p className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">{status}</p>}
      </form>
    </section>
  );
}

export default BookingForm;
