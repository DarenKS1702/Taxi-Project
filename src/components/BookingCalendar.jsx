const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function pad(number) {
  return String(number).padStart(2, '0');
}

function BookingCalendar({ selectedDate, onSelect }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-taxi">Pickup Calendar</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{now.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className="rounded-2xl bg-slate-900 px-3 py-2 text-sm text-slate-300">Today</div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.24em] text-slate-500">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <span key={`blank-${index}`} className="h-10 rounded-2xl" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isoDate = `${year}-${pad(month + 1)}-${pad(day)}`;
          const isSelected = selectedDate === isoDate;

          return (
            <button
              key={isoDate}
              type="button"
              onClick={() => onSelect(isoDate)}
              className={`h-10 rounded-2xl text-sm transition ${
                isSelected
                  ? 'bg-taxi text-slate-950 shadow-lg shadow-taxi/30'
                  : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <p className="mt-4 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
          Selected pickup date: <span className="font-semibold text-white">{selectedDate}</span>
        </p>
      )}
    </div>
  );
}

export default BookingCalendar;
