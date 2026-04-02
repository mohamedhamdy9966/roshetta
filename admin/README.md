# Roshetta Admin (React + Vite)

This document explains the `admin` workspace for the Roshetta project and provides atomic-level details and code-level cross-references.

## Project Purpose

The admin app is a single-page application built with React and Vite. It provides role-based control panels for:
- Admin manager (add doctors/labs/drugs, view appointments/orders, control availability)
- Doctor portal (view appointments, manage status, profile)
- Lab portal (view appointments, manage status, profile)

## Folder Structure

```
admin/
├─ public/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  ├─ assets/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  └─ Sidebar.jsx
│  ├─ context/
│  │  ├─ AdminContext.jsx
│  │  ├─ DoctorContext.jsx
│  │  ├─ LabContext.jsx
│  │  ├─ DrugContext.jsx
│  │  ├─ AppContext.jsx
│  │  └─ OrderContext.jsx (empty placeholder)
│  └─ pages/
│     ├─ Login.jsx
│     ├─ Admin/
│     │  ├─ Dashboard.jsx
│     │  ├─ AddDoctor.jsx
│     │  ├─ AddLab.jsx
│     │  ├─ AddDrug.jsx
│     │  ├─ DoctorsList.jsx
│     │  ├─ LabList.jsx
│     │  ├─ DrugList.jsx
│     │  ├─ AllAppointments.jsx
│     │  └─ AllOrders.jsx
│     ├─ Doctor/
│     │  ├─ DoctorDashboard.jsx
│     │  ├─ DoctorAppointments.jsx
│     │  └─ DoctorProfile.jsx
│     └─ Lab/
│        ├─ LabDashboard.jsx
│        ├─ LabAppointments.jsx
│        └─ LabProfile.jsx
├─ package.json
└─ vite.config.js
```

## Entry Points

### `src/main.jsx`
- Renders root via `createRoot`.
- Wraps app in `BrowserRouter` and context providers:
  - `AdminContextProvider`
  - `DoctorContextProvider`
  - `LabContextProvider`
  - `AppContextProvider`
- Registers service worker with basic PWA scope logging.

### `src/App.jsx`
- Uses tokens from three contexts:
  - `aToken` (admin)
  - `dToken` (doctor)
  - `lToken` (lab)
- Auth gate:
  - If any token exists: renders admin panel shell (`Navbar`, `Sidebar`, routed pages)
  - Else: renders `Login` page.
- Routes:
  - Admin routes (`/admin-dashboard`, `/add-doctor`, `/doctor-list`, etc.)
  - Doctor routes (`/doctor-dashboard`, `/doctor-appointments`, `/doctor-profile`)
  - Lab routes (`/lab-dashboard`, `/lab-appointments`, `/lab-profile`)

## Context APIs & Data Flow

### `AdminContext.jsx`
- Exposes:
  - state: `aToken`, `doctors`, `labs`, `appointments`, `dashData`
  - methods: `getAllDoctors`, `getAllLabs`, `changeDoctorAvailability`, `changeLabAvailability`, `getAllAppointments`, `cancelAppointment`, `getDashData`
- Uses backend URL from `VITE_BACKEND_URL`.
- Uses `axios` calls to:
  - `POST /api/admin/all-doctors`
  - `GET /api/admin/all-labs`
  - `POST /api/admin/change-doctor-availability`
  - `POST /api/admin/change-lab-availability`
  - `GET /api/admin/appointments`
  - `POST /api/admin/cancel-appointment`
  - `GET /api/admin/dashboard`
- Error handling uses `react-toastify`.

### `DoctorContext.jsx`
- Exposes doctor session and operations:
  - `dToken`, `appointments`, `dashData`, `profileData`
  - CRUD calls: `getAppointments`, `completeAppointment`, `cancelAppointment`, `getDashData`, `getProfileData`
- URLs:
  - `GET /api/doctor/appointments`
  - `POST /api/doctor/complete-appointment`
  - `POST /api/doctor/cancel-appointment`
  - `GET /api/doctor/dashboard`
  - `GET /api/doctor/profile`

### `LabContext.jsx`
- Exposes lab session and operations:
  - `lToken`, `appointments`, `dashData`, `profileData`
  - Identical pattern to Doctor context, with lab endpoints.
- URLs:
  - `GET /api/lab/appointments`
  - `POST /api/lab/complete-appointment`
  - `POST /api/lab/cancel-appointment`
  - `GET /api/lab/dashboard`
  - `GET /api/lab/profile`

### `DrugContext.jsx`
- Manages drug catalog inside admin portal:
  - `drugs`, `loading`
  - `getAllDrugs`, `addDrug`, `changeStock`, `removeDrug`
- Endpoints:
  - `GET /api/drug/list`
  - `POST /api/drug/add` (multipart/form-data, requires admin token)
  - `POST /api/drug/stock` (toggle stock status)
  - `DELETE /api/drug/remove` (id via request body)

### `AppContext.jsx`
- Helper utility context for different roles:
  - `currency = "EGP"`
  - `calculateAge(dob)` (robust validation, returns string)
  - `slotDateFormat(slotDate)` (format `YYYY_MM_DD` peppered with month label)
  - Exposes `axios` as shared dependency.

### `OrderContext.jsx`
- Present but empty placeholder: no behavior implemented.

## Core UI Components

### `Navbar.jsx`
- Determines current user identity based on tokens.
- Renders role label (`"Admin Panel"` or `"Doctor Portal"`).
- Logout:
  - clears local storage token(s)
  - resets context tokens
  - navigates to `/`

### `Sidebar.jsx`
- Dynamic item list for admin/doctor/lab based on available token.
- Uses `react-router` `NavLink` with active style logic.
- Routes for each role mirror `App.jsx` paths.

## Pages and Workflows

### `Login.jsx`
- Role switcher with radio buttons (Admin/Doctor/Lab).
- Validated via Formik + Yup (email, password, user type, 8+ chars password).
- Submits to:
  - `POST /api/admin/login` -> stores `aToken`
  - `POST /api/doctor/login` -> stores `dToken`
  - `POST /api/lab/login` -> stores `lToken`
- Tokens persisted in `localStorage`.

### `Admin` pages
- `Dashboard.jsx`: summary cards and latest bookings (cancel action for open appointments)
- `AddDoctor.jsx`: multipart form with image upload + fields + validation.
  - API: `POST /api/admin/add-doctor` with `aToken`
- `AddLab.jsx`: symmetrically structured form for labs.
- `AddDrug.jsx`: form for drug record and backend call.
- `DoctorsList.jsx`: table list + availability toggle with `changeDoctorAvailability`.
- `LabList.jsx`: table list + availability toggle with `changeLabAvailability`.
- `DrugList.jsx`: manage stock and delete actions via `DrugContext` methods.
- `AllAppointments.jsx`: renders admin appointment list and cancellation.
- `AllOrders.jsx`: renders order list status.

### `Doctor` pages
- `DoctorDashboard.jsx`: doctor totals + latest slots.
- `DoctorAppointments.jsx`: list appointments, mark complete/cancel.
- `DoctorProfile.jsx`: doctor profile and update data.

### `Lab` pages
- `LabDashboard.jsx`: lab totals + stats.
- `LabAppointments.jsx`: lab appointment list + controls.
- `LabProfile.jsx`: lab profile and update fields.

## Styling & Assets

- Atomic UI styles using Tailwind classes in JSX.
- Global styles in `src/index.css`.
- SVG / image paths through `src/assets/assets` object.

## Environment & Setup

### Required env variable
- `VITE_BACKEND_URL` (e.g., `http://localhost:4000`)

### Installation

```bash
cd admin
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Code-level Notes

- All API calls use `axios` and tokens via request headers (`aToken`, `dToken`, `lToken`).
- `App.jsx` renders role-specific routes after login and reboots to `Login` if no token exists.
- `DoctorContext` and `LabContext` share a near-identical interface; this architecture supports future common provider refactor.
- `DrugContext` is exclusively admin; the endpoint set includes stock management and manual delete rebuilding datasets.
- `AdminContext` controls top-level data feeds and cascading updates (e.g., `changeDoctorAvailability` reloads doctor list automatically).

## TODO / Next Improvements

1. Implement `OrderContext` interface and connect `AllOrders` page.
2. Centralize API request/response wrapper to avoid duplicated error handling.
3. Add a global loader UI for pending network requests.
4. Add feature tests with Playwright or Cypress.
5. Add i18n support for multi-language admin panel.

