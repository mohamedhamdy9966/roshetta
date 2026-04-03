# Components Folder README

This folder contains reusable React UI components used across the Admin, Doctor, and Lab portals. Each component is responsible for a focused piece of layout or navigation and uses shared context to determine which UI to show.

## Common Patterns

- Components are written as React functional components.
- Global auth state is read via React Context (`AdminContext`, `DoctorContext`, `LabContext`).
- Routing is handled with `react-router-dom` (`NavLink`, `useNavigate`).
- UI styling uses Tailwind CSS utility classes.

## File-by-File Detail

### `Navbar.jsx`
**Purpose:** Top navigation bar for the admin/doctor portal with logo and logout.

**Key dependencies:**
- `assets.admin_logo` for the logo image.
- `AdminContext` and `DoctorContext` for auth tokens.
- `useNavigate` for routing after logout.

**How it works (step by step):**
1. Reads `aToken` and `setAToken` from `AdminContext`.
2. Reads `dToken` and `setDToken` from `DoctorContext`.
3. Creates `logout()`:
   - Navigates to `/`.
   - Clears admin token from state and `localStorage` if present.
   - Clears doctor token from state and `localStorage` if present.
4. Renders a header bar:
   - Left: logo + title.
   - Title text depends on which token exists:
     - Admin token → `"Admin Panel"`
     - Otherwise → `"Doctor Portal"`
5. Right: a red logout button that triggers `logout()`.

**Behavior details:**
- `position: sticky` keeps the navbar visible at the top while scrolling.
- Logout button includes an inline SVG icon.

### `Sidebar.jsx`
**Purpose:** Left navigation menu that changes based on who is logged in.

**Key dependencies:**
- `AdminContext`, `DoctorContext`, `LabContext` for auth tokens.
- `NavLink` to render active navigation styles.
- Icon libraries: `react-icons/fi`, `react-icons/gi`, `react-icons/fa`.

**How it works (step by step):**
1. Reads `aToken`, `dToken`, `lToken` to detect user role.
2. Renders a fixed sidebar container with a sticky inner wrapper.
3. Shows **Admin menu** when `aToken` exists:
   - Dashboard
   - Appointments
   - Add Doctor
   - Add Lab
   - Add Drug
   - Doctor List
   - Lab List
   - Drugs List
   - Orders
4. Shows **Doctor menu** when `dToken` exists:
   - Dashboard
   - Appointments
   - Profile
5. Shows **Lab menu** when `lToken` exists:
   - Dashboard
   - Appointments
   - Profile
6. Uses `NavLink` to apply active styles:
   - Active: light background + right border + font emphasis.
   - Inactive: default color and hover background.

**Behavior details:**
- Sidebar is fixed on desktop and full width on mobile.
- Only one role menu displays at a time, depending on token.

## Adding A New Component

When adding a new component:

1. Keep it focused on a single responsibility.
2. Document its purpose and props here.
3. If it depends on context or routing, explain that dependency.
4. Prefer reusable, presentational components unless state is required.
