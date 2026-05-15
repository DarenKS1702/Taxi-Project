import { useState } from 'react';
import Hero from './components/Hero.jsx';
import Reviews from './components/Reviews.jsx';
import BookingForm from './components/BookingForm.jsx';
import MapSection from './components/MapSection.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [mapMode, setMapMode] = useState('pickup'); // 'pickup' or 'dropoff'

  const handleLocationSelect = (address) => {
    if (mapMode === 'pickup') {
      setPickupLocation(address);
    } else {
      setDropoffLocation(address);
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Hero />
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-10">
            <BookingForm
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
              onPickupChange={setPickupLocation}
              onDropoffChange={setDropoffLocation}
            />
            <MapSection
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
              mapMode={mapMode}
              onModeChange={setMapMode}
              onLocationSelect={handleLocationSelect}
            />
          </div>
          <Reviews />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
