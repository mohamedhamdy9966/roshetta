# Doctor Pages README

This folder contains the Doctor‑only page components for the admin portal. These pages read data from `DoctorContext` and display appointments, dashboard metrics, and profile editing tools.

## Common Patterns

- Data comes from `DoctorContext` (`appointments`, `dashData`, `profileData`).
- Actions are provided by context (`getAppointments`, `getDashData`, etc.).
- Utility helpers come from `AppContext` (`calculateAge`, `slotDateFormat`, `currency`).
- UI uses Tailwind CSS and icons from the `assets` module.

## File-by-File Detail

### `DoctorAppointments.jsx`
**Purpose:** List all appointments for the logged‑in doctor.

**Key dependencies:**
- `DoctorContext` for appointment data and actions.
- `AppContext` for age calculation and date formatting.

**Flow (step by step):**
1. On mount (or when `dToken` changes), calls `getAppointments()`.
2. Renders a table‑like list of appointments.
3. For each appointment:
   - Shows patient name + avatar.
   - Shows payment type (`Online` vs `Cash`).
   - Shows age via `calculateAge()`.
   - Shows date/time via `slotDateFormat()`.
   - Shows fee in `currency`.
4. Shows status labels if cancelled or completed.
5. Otherwise renders action buttons:
   - Cancel → `cancelAppointment(id)`
   - Complete → `completeAppointment(id)`

**Notes:**
- The list uses `appointments.reverse()`, which mutates the array in place. If state order matters elsewhere, consider copying before reversing.

### `DoctorDashboard.jsx`
**Purpose:** Summary dashboard for doctor activity.

**Key dependencies:**
- `DoctorContext` for `dashData`, `getDashData`, and appointment actions.
- `AppContext` for currency and date formatting.

**Flow (step by step):**
1. On mount, fetches dashboard data if `dToken` exists.
2. Displays metric cards:
   - Earnings
   - Appointments
   - Patients
3. Shows “Latest Bookings” list:
   - Patient info + date.
   - Cancel/complete actions for active appointments.

### `DoctorProfile.jsx`
**Purpose:** View and edit the logged‑in doctor’s profile.

**Key dependencies:**
- `DoctorContext` for `profileData`, `getProfileData`, and `backendUrl`.
- `AppContext` for currency.
- `axios` for saving updates.

**Flow (step by step):**
1. On mount, calls `getProfileData()` if `dToken` exists.
2. Shows profile data: image, name, specialty, experience, about.
3. Toggle `isEdit` to switch between view and edit mode.
4. In edit mode:
   - Fees and address become editable inputs.
   - Availability checkbox can be toggled.
5. `updateProfile()` sends:
   - `address`, `fees`, and `available` to `/api/doctor/update-profile`.
   - Refreshes profile data after success.

**Notes:**
- When editing address, the code updates `line1`/`line2` on the root object, not `profileData.address`. That could be a bug if address fields stop updating. Consider updating `profileData.address.line1` and `profileData.address.line2` instead.

## Adding A New Doctor Page

When adding a new page here:

1. Decide which context data and actions it needs.
2. Add an entry in this README describing the flow.
3. Register the route in the main app router.
