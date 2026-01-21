# Phase 4: Appointments & History

**Goal:** Make appointments list and history display real data from localStorage with proper state handling.

**Depends on:** Phase 1 (Foundation), Phase 3 (Booking creates appointments)

---

## APT-001: Appointments List

**File:** `client/src/pages/appointments/index.tsx`

**Current Issues:**
- Simulated webhook confirmation after 5s (line 141-195)
- May have hardcoded data mixed with localStorage

**Fixes:**

1. **Load from localStorage:**
```tsx
const [isLoading, setIsLoading] = useState(true);
const [appointments, setAppointments] = useState<Appointment[]>([]);

useEffect(() => {
  setTimeout(() => {
    const all = getUserAppointments();
    setAppointments(all.filter(a => a.status === 'upcoming'));
    setIsLoading(false);
  }, 500);
}, []);
```

2. **Loading state:**
- [ ] Show `<LoadingSkeleton variant="list" count={3} />` while loading

3. **Empty state:**
- [ ] When no appointments, show `<EmptyState icon={Calendar} title="No upcoming appointments" action="Book Now" />`

4. **Filter tabs (if present):**
- [ ] "Upcoming" shows `status === 'upcoming'`
- [ ] "Past" shows `status === 'completed' || status === 'cancelled'`

5. **Cancel functionality:**
```tsx
const handleCancel = (id: string) => {
  updateAppointment(id, { status: 'cancelled', cancelledAt: new Date().toISOString() });
  setAppointments(prev => prev.filter(a => a.id !== id));
  showSuccess('Appointment cancelled');
};
```

6. **Keep webhook simulation** but save result:
- [ ] When webhook "confirms", update appointment in storage

**Acceptance:**
- [ ] Shows loading skeleton initially
- [ ] Displays appointments from localStorage
- [ ] Empty state when no appointments
- [ ] Cancel updates status in localStorage
- [ ] Cancelled appointment moves to history

---

## APT-002: Appointment Detail

**File:** `client/src/pages/appointments/detail.tsx`

**Current Issues:**
- All hardcoded data (line 28-36)
- "Add to Calendar" no implementation (line 109-111)
- "Get Directions" no implementation (line 86-88)

**Fixes:**

1. **Load appointment by ID:**
```tsx
const { id } = useParams();
const [appointment, setAppointment] = useState<Appointment | null>(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  setTimeout(() => {
    const all = getUserAppointments();
    const found = all.find(a => a.id === id);
    setAppointment(found || null);
    setIsLoading(false);
  }, 300);
}, [id]);
```

2. **Loading state:**
- [ ] Show skeleton while loading

3. **Not found state:**
- [ ] If appointment not found, show error state with "Back to Appointments" button

4. **Wire "Add to Calendar":**
```tsx
const handleAddToCalendar = () => {
  // Generate ICS file or open calendar link
  const event = {
    title: `Appointment with ${appointment.doctor}`,
    start: new Date(`${appointment.date}T${appointment.time}`),
    location: appointment.location,
  };
  // For demo, just show success toast
  showSuccess('Added to calendar');
};
```

5. **Wire "Get Directions":**
```tsx
const handleGetDirections = () => {
  // Open Google Maps with location
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.location)}`;
  window.open(url, '_blank');
};
```

6. **Cancel button:**
- [ ] Confirmation dialog before cancelling
- [ ] Update status in localStorage
- [ ] Navigate back to appointments list
- [ ] Show success toast

**Acceptance:**
- [ ] Detail page loads appointment by ID from URL
- [ ] Shows loading then real data
- [ ] 404/error state if appointment not found
- [ ] "Add to Calendar" shows feedback
- [ ] "Get Directions" opens maps
- [ ] Cancel works and updates storage

---

## HIST-001: History

**File:** `client/src/pages/history/index.tsx`

**Current Issues:**
- Hardcoded history items (line 54-124)
- Search input has no onChange (line 25-28)
- Card onClick handlers are empty (line 69, 83, 98, 119)

**Fixes:**

1. **Load from localStorage:**
```tsx
const [isLoading, setIsLoading] = useState(true);
const [history, setHistory] = useState<Appointment[]>([]);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  setTimeout(() => {
    const all = getUserAppointments();
    setHistory(all.filter(a => a.status === 'completed' || a.status === 'cancelled'));
    setIsLoading(false);
  }, 500);
}, []);
```

2. **Loading state:**
- [ ] Show `<LoadingSkeleton variant="list" count={4} />` while loading

3. **Empty state:**
- [ ] When no history, show `<EmptyState title="No past appointments" description="Your appointment history will appear here" />`

4. **Wire search:**
```tsx
const filteredHistory = useMemo(() => {
  if (!searchQuery) return history;
  const q = searchQuery.toLowerCase();
  return history.filter(h =>
    h.doctor.toLowerCase().includes(q) ||
    h.specialty.toLowerCase().includes(q)
  );
}, [history, searchQuery]);
```

5. **Wire card clicks:**
```tsx
<Card onClick={() => navigate(`/appointments/${item.id}`)}>
```

6. **Status indicators:**
- [ ] Show "Completed" or "Cancelled" badge based on status
- [ ] Different styling for cancelled vs completed

**Acceptance:**
- [ ] Shows loading skeleton initially
- [ ] Displays past appointments from localStorage
- [ ] Empty state when no history
- [ ] Search filters the list in real-time
- [ ] Clicking card navigates to detail view
- [ ] Completed and cancelled have different visual treatment

---

## Data Flow Verification

After Phase 4, this flow should work end-to-end:

1. Book appointment (Phase 3) → appears in Appointments list
2. View appointment detail → shows real data
3. Cancel appointment → moves to History with "cancelled" status
4. View history → shows cancelled appointment
5. Click history item → detail view works

---

## Verification Checklist

After completing Phase 4:

- [ ] Appointments list loads from localStorage
- [ ] Empty state shows when no appointments
- [ ] Appointment detail loads by ID
- [ ] "Add to Calendar" provides feedback
- [ ] "Get Directions" opens external maps
- [ ] Cancel appointment updates localStorage
- [ ] Cancelled appointment appears in History
- [ ] History loads from localStorage
- [ ] History search filters results
- [ ] History cards are clickable
- [ ] Refresh preserves all data

---

## Files Modified

- `client/src/pages/appointments/index.tsx`
- `client/src/pages/appointments/detail.tsx`
- `client/src/pages/history/index.tsx`
