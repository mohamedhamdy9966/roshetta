# Lab Pages README

This folder contains the Lab‑only page components for the admin portal. These pages use `LabContext` to fetch and mutate lab data and use `AppContext` for common formatting helpers.

## Common Patterns

- Lab data is sourced from `LabContext`.
- API calls are wrapped in context functions (`getAppointments`, `getDashData`, etc.).
- Utility functions come from `AppContext` (`calculateAge`, `slotDateFormat`, `currency`).
- UI uses Tailwind CSS and shared assets for icons.

## File-by-File Detail

### `LabAppointments.jsx`
**Purpose:** List all appointments for the logged‑in lab.

**Key dependencies:**
- `LabContext` for appointment data and actions.
- `AppContext` for age and date formatting.

**Flow (step by step):**
1. On mount (or when `lToken` changes), calls `getAppointments()`.
2. Renders a table‑like list of lab appointments.
3. For each appointment:
   - Shows patient avatar + name.
   - Shows payment type (`Online` vs `Cash`).
   - Shows age via `calculateAge()`.
   - Shows date/time via `slotDateFormat()`.
   - Shows fee using `currency`.
4. Shows status labels if cancelled or completed.
5. Otherwise shows action buttons:
   - Cancel → `cancelAppointment(id)`
   - Complete → `completeAppointment(id)`

**Notes:**
- Uses `appointments.reverse()` which mutates the array. Consider copying if order is reused elsewhere.

### `LabDashboard.jsx`
**Purpose:** Summary dashboard for lab activity.

**Key dependencies:**
- `LabContext` for `dashData`, `getDashData`, and appointment actions.
- `AppContext` for currency and date formatting.

**Flow (step by step):**
1. On mount, fetches dashboard metrics if `lToken` exists.
2. Displays metric cards:
   - Earnings
   - Appointments
   - Patients
3. Shows “Latest Bookings” list:
   - Patient info and date.
   - Cancel/complete actions for active appointments.

### `LabProfile.jsx`
**Purpose:** View and edit lab profile data.

**Key dependencies:**
- `LabContext` for `profileData`, `getProfileData`, and `backendUrl`.
- `AppContext` for currency.
- `axios` for profile update requests.

**Flow (step by step):**
1. On mount, calls `getProfileData()` when `lToken` exists.
2. Displays lab image, name, fee, address, and availability.
3. Toggles `isEdit` to enable inline edits.
4. In edit mode:
   - Fees and address become editable inputs.
   - Availability checkbox toggles.
5. `updateProfile()` sends `address`, `fees`, and `available` to `/api/lab/update-profile`.
6. Refreshes profile data after success.

**Notes:**
- Like DoctorProfile, the edit handlers update `line1` and `line2` on the root object. Consider updating `profileData.address.line1` and `profileData.address.line2` for consistency.

## Adding A New Lab Page

When adding a new page here:

1. Decide which context data/actions are needed.
2. Add routing in the main app router.
3. Document the new page in this README.
