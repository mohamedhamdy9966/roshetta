# Pages Folder README

This folder contains **top‑level page components** for the admin portal. Each page maps to a route and is responsible for a full screen of UI. The pages are grouped by role in subfolders:

- `Admin/` → admin dashboard and management pages
- `Doctor/` → doctor portal pages
- `Lab/` → lab portal pages

There is also a shared login page at the root of this folder.

## Common Patterns

- Pages fetch and mutate data via Context providers.
- Auth tokens are stored in `localStorage` and injected via context.
- Form validation is handled with Formik + Yup where needed.
- Styling uses Tailwind CSS utilities.

## File-by-File Detail

### `Login.jsx`
**Purpose:** Single login screen for Admin, Doctor, and Lab roles.

**Key dependencies:**
- `AdminContext`, `DoctorContext`, `LabContext` for token setters.
- `Formik` + `Yup` for form state and validation.
- `axios` for authentication requests.
- `react-toastify` for user feedback.

**Flow (step by step):**
1. Validates the form:
   - Role is one of `Admin`, `Doctor`, or `Lab`.
   - Email is valid.
   - Password is at least 8 characters.
2. On submit, checks the selected role:
   - **Admin** → `POST /api/admin/login`
   - **Doctor** → `POST /api/doctor/login`
   - **Lab** → `POST /api/lab/login`
3. On success:
   - Saves role token in `localStorage` (`aToken`, `dToken`, `lToken`).
   - Updates the matching context token.
   - Shows success toast.
4. On error: shows error toast.

**UI behavior:**
- Role selector uses radio buttons.
- Password field can toggle visibility.
- Card layout with gradient background.

## Subfolders

### `Admin/`
Contains admin‑only pages such as Dashboard, Doctors, Labs, Drugs, Orders, and Appointments.

See `admin/src/pages/Admin/README.md` for detailed behavior and flows.

### `Doctor/`
Contains doctor‑only pages: Dashboard, Appointments, and Profile.

See `admin/src/pages/Doctor/README.md` for details.

### `Lab/`
Contains lab‑only pages: Dashboard, Appointments, and Profile.

See `admin/src/pages/Lab/README.md` for details.

## Adding A New Page

When adding a new page here:

1. Decide which role folder it belongs in.
2. Wire the route in `admin/src/App.jsx`.
3. Update the relevant README for that role.
