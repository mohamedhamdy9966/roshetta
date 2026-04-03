# Routes Folder README

This folder defines the HTTP routes for the backend. Each file creates an Express Router, wires middleware (auth, upload), and maps URL paths to controller functions. These routes are then mounted in `server.js` under a base path such as `/api`.

## Common Patterns

- `express.Router()` is used to group related endpoints.
- Auth middleware guards sensitive routes:
  - `authUser` for logged‑in users.
  - `authDoctor` for doctor panel routes.
  - `authLab` for lab panel routes.
  - `authAdmin` for admin routes.
- `multer` upload middleware is used for file and image uploads.
- Each route maps to a specific controller function that handles the business logic.

## File-by-File Detail

### `addressRoute.js`
**Purpose:** Manage user address CRUD endpoints.

**Routes:**
- `POST /add` → `authUser` → `addAddress`
  - Adds a new address for the authenticated user.
- `GET /get` → `authUser` → `getAddress`
  - Returns all saved addresses for the authenticated user.

### `adminRoute.js`
**Purpose:** Admin-only endpoints for doctors, labs, appointments, and dashboard.

**Routes:**
- `POST /add-doctor` → `authAdmin` → `upload.single("image")` → `addDoctor`
  - Adds a doctor with optional profile image.
- `POST /add-lab` → `authAdmin` → `upload.single("image")` → `addLab`
  - Adds a lab with optional image.
- `POST /login` → `loginAdmin`
  - Admin login (no auth middleware).
- `POST /all-doctors` → `authAdmin` → `allDoctors`
  - Returns all doctors (admin view).
- `GET /all-labs` → `authAdmin` → `allLabs`
  - Returns all labs.
- `POST /change-doctor-availability` → `authAdmin` → `changeDoctorAvailability`
  - Toggles doctor availability.
- `POST /change-lab-availability` → `authAdmin` → `changeLabAvailability`
  - Toggles lab availability.
- `GET /appointments` → `authAdmin` → `appointmentsAdmin`
  - Lists all doctor and lab appointments.
- `POST /cancel-appointment` → `authAdmin` → `appointmentCancel`
  - Cancels an appointment (doctor or lab).
- `GET /dashboard` → `authAdmin` → `adminDashboard`
  - Returns counts and latest appointments for the admin panel.

### `cartRoute.js`
**Purpose:** User cart management.

**Routes:**
- `PATCH /update` → `authUser` → `updateCart`
  - Overwrites the cart with the provided `cartItems`.
- `GET /get` → `authUser` → `getCart`
  - Returns the current cart.
- `POST /add` → `authUser` → `addToCart`
  - Adds or increments a drug in the cart.
- `DELETE /remove` → `authUser` → `removeFromCart`
  - Removes a drug from the cart.
- `DELETE /clear` → `authUser` → `clearCart`
  - Clears the entire cart.

### `doctorRoute.js`
**Purpose:** Doctor panel and public doctor listing.

**Routes:**
- `GET /list` → `doctorList`
  - Public list of doctors.
- `POST /login` → `loginDoctor`
  - Doctor login.
- `GET /appointments` → `authDoctor` → `appointmentsDoctor`
  - Doctor’s appointment list.
- `POST /complete-appointment` → `authDoctor` → `appointmentComplete`
  - Marks an appointment completed.
- `POST /cancel-appointment` → `authDoctor` → `appointmentCancel`
  - Cancels an appointment.
- `GET /dashboard` → `authDoctor` → `doctorDashboard`
  - Doctor dashboard metrics.
- `GET /profile` → `authDoctor` → `doctorProfile`
  - Doctor profile data.
- `POST /update-profile` → `authDoctor` → `updateDoctorProfile`
  - Updates doctor profile.

### `DrugRoute.js`
**Purpose:** Pharmacy catalog endpoints.

**Routes:**
- `POST /add` → `authAdmin` → `upload.array("images", 4)` → `addDrug`
  - Add a drug with up to 4 images.
- `GET /list` → `drugList`
  - Public list of drugs.
- `GET /single/:id` → `drugById`
  - Fetch single drug by ID.
- `POST /stock` → `authAdmin` → `changeStock`
  - Update stock availability.
- `DELETE /remove` → `authAdmin` → `removeDrug`
  - Delete a drug.

### `labRoute.js`
**Purpose:** Lab panel and public lab listing.

**Routes:**
- `GET /list` → `labList`
  - Public list of labs.
- `POST /login` → `loginLab`
  - Lab login.
- `GET /appointments` → `authLab` → `appointmentsLab`
  - Lab’s appointments list.
- `POST /complete-appointment` → `authLab` → `appointmentComplete`
  - Marks an appointment completed.
- `POST /cancel-appointment` → `authLab` → `appointmentCancel`
  - Cancels an appointment.
- `GET /dashboard` → `authLab` → `labDashboard`
  - Lab dashboard metrics.
- `GET /profile` → `authLab` → `labProfile`
  - Lab profile data.
- `POST /update-profile` → `authLab` → `updateLabProfile`
  - Updates lab profile.

### `orderRoute.js`
**Purpose:** Order placement and payment integration for the pharmacy.

**Routes:**
- `POST /cod` → `authUser` → `placeOrderCOD`
  - Place a cash‑on‑delivery order.
- `POST /paymob` → `authUser` → `placeOrderPaymob`
  - Start Paymob payment flow.
- `POST /paymob-webhook` → `paymobWebhook`
  - Paymob payment webhook (no auth).
- `GET /user` → `authUser` → `getUserOrders`
  - User’s order history.
- `GET /all` → `authAdmin` → `getAllOrders`
  - Admin list of all orders.
- `PATCH /status` → `authAdmin` → `updateOrderStatus`
  - Update an order status.

### `userRoute.js`
**Purpose:** Main user API: auth, profile, appointments, payments, uploads, AI analysis, and debug tools.

**Core auth and profile routes:**
- `POST /register` → `registerUser`
- `POST /login` → `loginUser`
- `POST /google-auth` → `googleAuth`
- `POST /apple-auth` → `appleAuth`
- `GET /get-profile` → `authUser` → `getProfile`
- `GET /is-auth` → `authUser` → `isAuth`
- `POST /send-verify-otp` → `authUser` → `sendVerifyOtp`
- `POST /verify-account` → `verifyEmail`
- `POST /send-reset-otp` → `sendResetOtp`
- `POST /reset-password` → `resetPassword`
- `POST /update-profile` → `upload.single("imageProfile")` → `authUser` → `updateProfile`

**Appointments and payments:**
- `POST /book-appointment` → `authUser` → `bookAppointment`
- `GET /appointments` → `authUser` → `listAppointment`
- `POST /cancel-appointment` → `authUser` → `cancelAppointment`
- `POST /pay-appointment-stripe` → `authUser` → `payAppointmentStripe`
- `POST /pay-appointment-paymob` → `authUser` → `payAppointmentPaymob`
- `POST /stripe` → `authUser` → `placeOrderStripe`
- `POST /paymob` → `authUser` → `placeOrderPaymob`

**Chat and context:**
- `GET /chatbot-context` → builds doctor/lab lists for the chatbot
- `POST /analyze-text` → `getChatResponse`

**Uploads and analysis:**
- `POST /upload-audio` → `authUser` → `upload.single("audio")` → `uploadAudio`
- `POST /upload-audio-public` → `upload.single("audio")` → `uploadAudio`
- `POST /upload-file` → `authUser` → `upload.single("file")` → `uploadFile`
- `POST /upload-file-public` → `upload.single("file")` → `uploadFile`
- `POST /analyze-image` → `authUser` → `analyzeImage`
- `POST /analyze-pdf` → `upload.single("file")` → `analyzePdfText`
- `GET /doctors-by-specialty` → `getDoctorsBySpecialty`

**Debug routes (should be disabled in production):**
- `GET /debug-doctors` → logs doctor availability.
- `GET /debug-system-prompt` → returns the generated system prompt.
- `GET /debug-openai` → tests OpenAI API connectivity.
- `POST /test-audio` → tests Whisper transcription.

## Adding A New Route

When adding a new route:

1. Decide which router file it belongs in (admin, user, doctor, etc.).
2. Add the correct auth middleware.
3. Wire upload middleware if the endpoint accepts files.
4. Update this README with the route path and controller mapping.
