import { useEffect, useState } from 'react';

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const dateString = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-taxi">Current Time</p>
      <p className="mt-4 text-4xl font-semibold text-white">{timeString}</p>
      <p className="mt-2 text-sm text-slate-400">{dateString}</p>
    </div>
  );
}

export default Clock;
