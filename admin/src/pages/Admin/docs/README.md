# Admin Pages README

This folder contains the Admin‑only page components. Each page is a full screen in the admin portal, wired to context providers for data and actions, and styled with Tailwind CSS. Pages here are routed via the admin router setup in `admin/src/App.jsx`.

## Common Patterns

- Pages read admin state and actions from `AdminContext`.
- Some pages also use `AppContext` helpers like `slotDateFormat` or `currency`.
- Forms use Formik + Yup for validation (Add Doctor, Add Lab).
- API calls are routed through context functions or direct axios calls.
- Lists are built from context state and re‑fetched after mutations.

## File-by-File Detail

### `AddDoctor.jsx`
**Purpose:** Admin form to add a new doctor.

**Key dependencies:**
- `AdminContext` for `backendUrl` and `aToken`.
- `Formik` and `Yup` for form state and validation.
- `axios` for submission.

**Flow (step by step):**
1. Defines a Yup schema to validate image type, required fields, and password rules.
2. Initializes Formik with default field values.
3. On submit:
   - Builds a `FormData` payload.
   - Attaches image file if provided.
   - Serializes the address into JSON for the backend.
   - Sends `POST /api/admin/add-doctor` with `aToken` header.
4. Shows success/error toast and resets the form on success.

**UI structure:**
- Image upload preview.
- Two-column grid of doctor info.
- Address fields and “About Doctor” textarea.
- Submit button with loading state.

### `AddDrug.jsx`
**Purpose:** Admin form to add a new drug/product.

**Key dependencies:**
- `useDrugContext()` for `addDrug`.
- Local component state for form fields and images.

**Flow (step by step):**
1. Validates required fields locally (name, description, category, price, images).
2. Builds `productData` with parsed description lines.
3. Builds `FormData`:
   - `productData` as JSON.
   - Up to 4 images as `images`.
4. Calls `addDrug(formData)` from context.
5. Resets the form on success.

**UI structure:**
- Image upload grid (up to 4 images).
- Text inputs for name, description, category.
- Price and offer price inputs.
- In‑stock checkbox.

### `AddLab.jsx`
**Purpose:** Admin form to add a new lab.

**Key dependencies:**
- `AdminContext` for `backendUrl`, `aToken`, `getAllLabs`.
- `Formik` + `Yup` for form validation.

**Flow (step by step):**
1. Validates required fields and enforces at least one service.
2. Builds `FormData` with lab data and image.
3. Serializes `services` and `address` as JSON strings.
4. Sends `POST /api/admin/add-lab` with `aToken`.
5. Refreshes lab list via `getAllLabs()` after success.

**UI structure:**
- Image upload preview.
- Two‑column grid for lab fields.
- Service multi‑select with checkboxes.
- Submit button.

### `AllAppointments.jsx`
**Purpose:** Admin list of all doctor and lab appointments.

**Key dependencies:**
- `AdminContext` for `appointments`, `getAllAppointments`, `cancelAppointment`.
- `AppContext` for `calculateAge`, `slotDateFormat`, `currency`.

**Flow (step by step):**
1. On mount, fetches appointments if `aToken` exists.
2. Renders a grid table of appointment rows.
3. Shows patient, provider, slot time, fees, and action.
4. Allows admin to cancel active appointments.

**UI behavior:**
- Conditionally shows “Cancelled” or “Completed” badge.
- Uses provider type (`doctor` vs `lab`) to pick avatar and name.

### `AllOrders.jsx`
**Purpose:** Admin view of orders.

**Key dependencies:**
- `useAppContext()` for `currency` and `axios`.

**Flow (step by step):**
1. On mount, calls `fetchOrders()` once.
2. Uses `sellerToken` from `localStorage` to call `GET /api/order/`.
3. Stores order list and shows empty state if no orders.
4. Renders each order with items, address, amount, and payment status.

**Note:**
- This page uses a `sellerToken` header and `/api/order/` path. Ensure this matches the actual backend routes.

### `Dashboard.jsx`
**Purpose:** Admin dashboard overview.

**Key dependencies:**
- `AdminContext` for `getDashData`, `dashData`, `cancelAppointment`.
- `AppContext` for `slotDateFormat`.

**Flow (step by step):**
1. Loads dashboard stats when `aToken` is available.
2. Renders metric cards for doctors, labs, drugs, appointments, patients.
3. Shows latest appointments list.
4. Allows canceling upcoming appointments.

**UI behavior:**
- Cards scale on hover.
- Latest booking list shows status tags.

### `DoctorsList.jsx`
**Purpose:** Admin list of all doctors with availability toggle.

**Key dependencies:**
- `AdminContext` for `doctors`, `getAllDoctors`, `changeDoctorAvailability`.

**Flow (step by step):**
1. Fetches doctors when `aToken` is set.
2. Renders doctor cards with image, name, specialty.
3. Provides an availability checkbox that calls `changeDoctorAvailability`.

### `DrugList.jsx`
**Purpose:** Admin view and management of all drugs.

**Key dependencies:**
- `useDrugContext()` for `drugs`, `loading`, `getAllDrugs`, `changeStock`, `removeDrug`.

**Flow (step by step):**
1. Fetches all drugs on mount.
2. Shows a loading spinner while fetching.
3. Renders a table of drugs with images, category, prices, and stock toggle.
4. Allows removal with a confirmation dialog.

**UI behavior:**
- Shows stock toggle with visual “In Stock / Out of Stock”.
- Displays offer price and crossed original price if different.

### `LabList.jsx`
**Purpose:** Admin list of all labs with availability toggle.

**Key dependencies:**
- `AdminContext` for `labs`, `getAllLabs`, `changeLabAvailability`.

**Flow (step by step):**
1. Fetches labs when `aToken` is set.
2. Renders lab cards with image, services, fees, and availability toggle.
3. Shows service list (first 3) with a “+N more” indicator.

## Adding A New Admin Page

When adding a new page here:

1. Decide which context provides the data or create a new one.
2. Ensure routing is updated in the main `App.jsx` router.
3. Add a short entry in this README with purpose and data flow.
