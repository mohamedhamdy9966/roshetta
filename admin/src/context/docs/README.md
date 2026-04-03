# Context Folder README

This folder holds React Context providers that centralize state and API calls for the Admin, Doctor, Lab, and shared app utilities. Each context exposes a value object that components consume via `useContext` (or a custom hook).

## Common Patterns

- Each provider owns a slice of app state using `useState`.
- API calls are made with `axios`.
- Auth tokens are read from `localStorage` and passed via request headers.
- Toast notifications are used for user feedback.
- Providers export a Context and a Provider component.

## File-by-File Detail

### `AdminContext.jsx`
**Purpose:** Admin dashboard data and actions.

**Exports:**
- `AdminContext` (context object)
- `AdminContextProvider` (default export)

**State:**
- `aToken`: admin auth token from `localStorage`.
- `doctors`: list of doctors.
- `labs`: list of labs.
- `appointments`: list of combined appointments.
- `dashData`: dashboard metrics.

**Functions (step by step):**
- `getAllDoctors()`
  1. `POST /api/admin/all-doctors` with `aToken`.
  2. On success, updates `doctors`.
- `getAllLabs()`
  1. `GET /api/admin/all-labs` with `aToken`.
  2. On success, updates `labs`.
- `changeDoctorAvailability(docId)`
  1. Validates `docId`.
  2. `POST /api/admin/change-doctor-availability` with `docId`.
  3. Refreshes doctors list.
- `changeLabAvailability(labId)`
  1. `POST /api/admin/change-lab-availability` with `labId`.
  2. Refreshes labs list.
- `getAllAppointments()`
  1. `GET /api/admin/appointments`.
  2. Stores `appointments`.
- `cancelAppointment(appointmentId, type)`
  1. `POST /api/admin/cancel-appointment`.
  2. Refreshes appointment list.
- `getDashData()`
  1. `GET /api/admin/dashboard`.
  2. Stores `dashData`.

**Value exposed:**
- `aToken`, `setAToken`, `backendUrl`
- lists and actions for doctors/labs/appointments/dashboard

### `AppContext.jsx`
**Purpose:** Shared utility functions and constants.

**Exports:**
- `AppContext` (context object)
- `AppContextProvider` (default export)
- `useAppContext()` (custom hook)

**Utilities:**
- `currency`: `"EGP"`
- `calculateAge(dob)`
  - Validates date and returns a string age or `"Unknown"`.
- `slotDateFormat(slotDate)`
  - Converts `DD_MM_YYYY` string to `DD MON YYYY`.
- Exposes `axios` for convenience.

### `DoctorContext.jsx`
**Purpose:** Doctor dashboard state and actions.

**Exports:**
- `DoctorContext` (context object)
- `DoctorContextProvider` (default export)

**State:**
- `dToken`: doctor auth token.
- `appointments`: doctor appointments.
- `dashData`: metrics.
- `profileData`: doctor profile.

**Functions:**
- `getAppointments()` → `GET /api/doctor/appointments`
- `completeAppointment(appointmentId)` → `POST /api/doctor/complete-appointment`
- `cancelAppointment(appointmentId)` → `POST /api/doctor/cancel-appointment`
- `getDashData()` → `GET /api/doctor/dashboard`
- `getProfileData()` → `GET /api/doctor/profile`

### `DrugContext.jsx`
**Purpose:** Admin drug catalog management.

**Exports:**
- `DrugContext` (context object)
- `DrugContextProvider` (default export)
- `useDrugContext()` (custom hook)

**State:**
- `drugs`: list of drug products.
- `loading`: loading flag for async actions.

**Functions:**
- `getAllDrugs()` → `GET /api/drug/list`
- `addDrug(formData)` → `POST /api/drug/add`
  - Uses `multipart/form-data` with `aToken`.
- `changeStock(drugId, inStock)` → `POST /api/drug/stock`
- `removeDrug(drugId)` → `DELETE /api/drug/remove`

### `LabContext.jsx`
**Purpose:** Lab dashboard state and actions.

**Exports:**
- `LabContext` (context object)
- `LabContextProvider` (default export)

**State:**
- `lToken`: lab auth token.
- `appointments`: lab appointments.
- `dashData`: dashboard metrics.
- `profileData`: lab profile.

**Functions:**
- `getAppointments()` → `GET /api/lab/appointments`
- `completeAppointment(appointmentId)` → `POST /api/lab/complete-appointment`
- `cancelAppointment(appointmentId)` → `POST /api/lab/cancel-appointment`
- `getDashData()` → `GET /api/lab/dashboard`
- `getProfileData()` → `GET /api/lab/profile`

### `OrderContext.jsx`
**Purpose:** Placeholder for future order-related state.

**Status:** Empty file (no context defined yet).

## Adding A New Context

When adding a new context:

1. Define the state it owns and which API endpoints it controls.
2. Expose only what components need via the context `value`.
3. Add a short explanation here with state + actions list.
4. Consider adding a custom hook to simplify access.
