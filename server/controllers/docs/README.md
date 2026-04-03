# Controllers Folder README

This folder contains the Express controller modules that implement the API behavior for users, admins, doctors, labs, payments, orders, chat, and file analysis. Each controller exports functions used by the route layer in `server/routes`. The controllers are intentionally grouped by domain (auth, appointments, orders, payments, etc.) to keep business logic isolated and testable.

## Common Patterns You Will See

Controllers in this folder commonly follow these patterns:

- Read parameters from `req.body`, `req.params`, and `req.query`.
- Use `req.user`, `req.userId`, `req.docId`, or `req.labId` populated by auth middleware.
- Validate required inputs early and return `{ success: false, message }` on failure.
- Use Mongoose models under `server/models` to read/write data.
- Use external services (Cloudinary, Paymob, Stripe, OpenAI) with environment variables.
- Return JSON responses with a consistent `{ success, ... }` shape.

## File-by-File Detail

### `addressController.js`
**Purpose:** Manage saved user addresses.

**Exports:** `addAddress`, `getAddress`

**`addAddress` flow:**
1. Reads `req.user.id` from the authenticated request.
2. Reads `address` object from `req.body`.
3. Creates an `Address` document combining `address` fields and `userId`.
4. Responds with `"Address Added Successfully"` on success.

**`getAddress` flow:**
1. Reads `req.user.id`.
2. Queries `Address.find({ userId })`.
3. Returns the list of addresses.

### `adminOrderController.js`
**Purpose:** Admin tools for order listing and status management.

**Exports:** `getAllOrders`, `updateOrderStatus`

**`getAllOrders` flow:**
1. Finds all orders that are either COD or already paid.
2. Populates `items.drug`, `address`, and `userId` for admin display.
3. Sorts by newest first.
4. Maps orders to ensure each item has a safe `drug` fallback if missing.
5. Adds `customerInfo` from `userId`.
6. Returns the transformed order list.

**`updateOrderStatus` flow:**
1. Validates `orderId` and `status`.
2. Ensures `status` is one of the allowed values.
3. Updates the order, adds `updatedAt`, and sets `deliveredAt` if delivered.
4. Returns the updated order.

### `appointmentAdminController.js`
**Purpose:** Admin view and cancellation of doctor/lab appointments.

**Exports:** `appointmentsAdmin`, `appointmentCancel`

**`appointmentsAdmin` flow:**
1. Loads doctor appointments and lab appointments.
2. Adds a `type` field to each item (`doctor` or `lab`).
3. Returns a combined list.

**`appointmentCancel` flow:**
1. Validates `appointmentId` and `type`.
2. If `type === "doctor"`, loads the doctor appointment and marks it cancelled.
3. Removes the reserved slot from the doctor’s `slotsBooked`.
4. If `type === "lab"`, performs the same logic for lab appointments.
5. Returns `"Appointment Cancelled"` on success.

### `appointmentCancelController.js`
**Purpose:** Allow authenticated users to cancel their own appointments.

**Exports:** `cancelAppointment`

**`cancelAppointment` flow:**
1. Reads `appointmentId` and `req.userId`.
2. Looks for a doctor appointment; if not found, looks for a lab appointment.
3. Verifies ownership (`appointment.userId === userId`).
4. Marks the appointment as cancelled.
5. Frees the booked slot in the doctor or lab schedule.

### `appointmentListController.js`
**Purpose:** Return the current user’s combined appointment list.

**Exports:** `listAppointment`

**`listAppointment` flow:**
1. Fetches doctor and lab appointments for the user.
2. Merges and maps them into a single array.
3. Adds derived fields: `status` and `paymentStatus`.
4. Returns the result.

### `authAdminController.js`
**Purpose:** Admin authentication.

**Exports:** `loginAdmin`

**`loginAdmin` flow:**
1. Compares submitted email/password with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
2. If matched, returns a JWT signed with `JWT_SECRET`.
3. Otherwise returns `"invalid credentials"`.

### `authController.js`
**Purpose:** User authentication and verification (non-file features).

**Exports:** `registerUser`, `loginUser`, `isAuth`, `googleAuth`, `appleAuth`, `sendVerifyOtp`, `verifyEmail`, `sendResetOtp`, `resetPassword`

**`registerUser` flow:**
1. Validates required fields and formats (email, phone, gender, date, password).
2. Checks for existing user by email.
3. Hashes password with bcrypt.
4. Generates a 6‑digit OTP and sets 24h expiry.
5. Saves the user with default medical metadata and verification flags.
6. Sends OTP email via Nodemailer.
7. Returns a JWT and a verification reminder.

**`loginUser` flow:**
1. Finds user by email.
2. Compares password with bcrypt.
3. Returns JWT on success.
4. If password fails and account unverified, prompts verification.

**`isAuth` flow:**
1. Reads authenticated user ID from `req.user.id`.
2. Returns user data without the password hash.

**`googleAuth` flow:**
1. Verifies Google ID token with `GOOGLE_CLIENT_ID`.
2. If user exists, updates Google info and returns JWT.
3. If user does not exist, creates a pre‑verified Google user and returns JWT.

**`appleAuth` flow:**
1. Verifies Apple identity token.
2. Finds or creates user by email/appleId.
3. Updates flags for Apple users and returns JWT.

**`sendVerifyOtp` and `verifyEmail` flow:**
1. `sendVerifyOtp` generates OTP and emails it.
2. `verifyEmail` checks OTP and expiry, then marks account verified.

**`sendResetOtp` and `resetPassword` flow:**
1. `sendResetOtp` creates a 15‑minute OTP and emails it.
2. `resetPassword` validates OTP and expiry, then updates password hash.

### `bookingController.js`
**Purpose:** Book a doctor appointment.

**Exports:** `bookAppointment`

**`bookAppointment` flow:**
1. Reads `docId`, `slotDate`, `slotTime` from request.
2. Loads doctor and checks availability.
3. Ensures the slot is not already booked.
4. Loads user profile.
5. Creates an appointment with doctor data snapshot and fee.
6. Updates the doctor’s `slotsBooked`.

### `cartController.js`
**Purpose:** CRUD operations for user cart items.

**Exports:** `updateCart`, `getCart`, `addToCart`, `removeFromCart`, `clearCart`

**`updateCart` flow:**
1. Validates `cartItems` is an object.
2. Updates user’s `cartItems` field.

**`getCart` flow:**
1. Loads user cart items by `req.user.id`.
2. Returns a safe empty object if missing.

**`addToCart` flow:**
1. Validates `drugId`.
2. Reads current cart.
3. Increments or sets item quantity.
4. Saves cart.

**`removeFromCart` flow:**
1. Validates `drugId`.
2. Deletes item from cart.
3. Saves cart.

**`clearCart` flow:**
1. Sets `cartItems` to `{}` for the user.

### `chatController.js`
**Purpose:** AI chat endpoints for the platform assistant.

**Exports:** `getChatResponse`, `getSystemPrompt`, `extractAppointmentDetails`

**`getSystemPrompt` flow:**
1. Builds a base assistant prompt with platform context.
2. If a user is provided, appends profile data, allergies, address, and recent appointments.
3. Adds uploaded file context if present.
4. Adds available doctors and labs for live suggestions.
5. Appends explicit behavioral instructions for the assistant.

**`extractAppointmentDetails` flow:**
1. Scans the user message for known doctor names and time patterns.
2. Returns a structured suggestion object if hints are found.

**`getChatResponse` flow:**
1. Validates `message`.
2. Optionally resolves authenticated user from JWT in headers.
3. Builds the system prompt and calls OpenAI Chat Completions.
4. Adds booking instructions if the message appears to be a booking request.
5. Returns AI reply and optional suggestion object.

### `codOrderController.js`
**Purpose:** Cash‑on‑delivery order placement.

**Exports:** `placeOrderCOD`

**`placeOrderCOD` flow:**
1. Validates `items` and `address`.
2. Ensures address exists.
3. Validates each drug exists and is in stock.
4. Computes total amount and builds normalized items list.
5. Creates an `Order` with `paymentType: "COD"`.
6. Returns the created order ID.

### `dashboardAdminController.js`
**Purpose:** Aggregate admin dashboard metrics.

**Exports:** `adminDashboard`

**`adminDashboard` flow:**
1. Loads totals for doctors, labs, users, and appointments.
2. Combines recent doctor and lab appointments.
3. Sorts recent appointments by `date` and returns the top 5.

### `doctorAdminController.js`
**Purpose:** Admin management for doctors.

**Exports:** `addDoctor`, `allDoctors`, `changeDoctorAvailability`

**`addDoctor` flow:**
1. Validates required fields and email/password formats.
2. Ensures doctor email is unique.
3. Hashes password.
4. Uploads doctor image to Cloudinary or uses placeholder.
5. Saves doctor record.

**`allDoctors` flow:**
1. Returns all doctors without password hashes.

**`changeDoctorAvailability` flow:**
1. Loads doctor by ID and toggles `available`.

### `doctorController.js`
**Purpose:** Doctor panel endpoints (login, appointments, dashboard).

**Exports:** `changeDoctorAvailability`, `doctorList`, `loginDoctor`, `appointmentsDoctor`, `appointmentCancel`, `appointmentComplete`, `doctorDashboard`, `doctorProfile`, `updateDoctorProfile`

**`loginDoctor` flow:**
1. Finds doctor by email.
2. Validates password.
3. Returns a JWT on success.

**`appointmentsDoctor` flow:**
1. Returns all appointments for the authenticated doctor.

**`appointmentComplete` and `appointmentCancel` flow:**
1. Validates appointment ownership by `docId`.
2. Updates `isCompleted` or `cancelled`.

**`doctorDashboard` flow:**
1. Sums earnings from paid/completed appointments.
2. Counts unique patients.
3. Returns recent appointments and totals.

**`doctorProfile` and `updateDoctorProfile` flow:**
1. Reads current profile without password.
2. Updates `fees`, `address`, and `available`.

### `drugController.js`
**Purpose:** CRUD for pharmacy drug products.

**Exports:** `addDrug`, `drugList`, `drugById`, `changeStock`, `removeDrug`

**`addDrug` flow:**
1. Parses `productData` JSON and image files.
2. Validates required fields.
3. Uploads images to Cloudinary or uses default placeholder.
4. Creates a `Drug` with `offerPrice` fallback.

**`drugList` flow:**
1. Returns all drugs sorted by newest.

**`drugById` flow:**
1. Validates `id` param and returns the drug.

**`changeStock` flow:**
1. Validates `id` and updates `inStock`.

**`removeDrug` flow:**
1. Deletes the drug by ID.

### `fileController.js`
**Purpose:** Placeholder controller file (currently empty).

### `labAdminController.js`
**Purpose:** Admin management for labs.

**Exports:** `addLab`, `allLabs`, `changeLabAvailability`

**`addLab` flow:**
1. Validates fields and email/password.
2. Ensures lab email is unique.
3. Hashes password and uploads image.
4. Parses `services` into an array.
5. Saves the lab document.

**`allLabs` flow:**
1. Returns all labs without passwords.

**`changeLabAvailability` flow:**
1. Loads lab by ID and toggles `available`.

### `labController.js`
**Purpose:** Lab panel endpoints (login, appointments, dashboard).

**Exports:** `changeLabAvailability`, `labList`, `loginLab`, `appointmentsLab`, `appointmentCancel`, `appointmentComplete`, `labDashboard`, `labProfile`, `updateLabProfile`

**`loginLab` flow:**
1. Validates credentials.
2. Returns JWT if correct.

**`appointmentsLab`, `appointmentComplete`, `appointmentCancel` flow:**
1. Returns lab appointments.
2. Marks completion or cancellation after ownership check.

**`labDashboard` flow:**
1. Calculates earnings from completed/paid appointments.
2. Counts unique patients.
3. Returns latest appointments.

**`labProfile` and `updateLabProfile` flow:**
1. Reads lab profile without password.
2. Updates `fees`, `address`, `available`, and optionally `services`.

### `paymobOrderController.js`
**Purpose:** Paymob checkout for pharmacy orders.

**Exports:** `placeOrderPaymob`, `paymobWebhook`

**Helper functions:**
1. `getAuthToken` requests a Paymob auth token.
2. `registerOrder` creates a Paymob order and returns its ID.
3. `getPaymentKey` creates a payment key with billing data.

**`placeOrderPaymob` flow:**
1. Validates items and address.
2. Verifies each drug exists and is in stock.
3. Calculates amount (including shipping).
4. Creates the order in MongoDB with `Pending Payment`.
5. Generates Paymob payment key and returns iframe URL.

**`paymobWebhook` flow:**
1. Verifies HMAC signature if configured.
2. Checks Paymob payment success.
3. Marks order as paid and clears user cart on success.
4. Marks order as failed on payment failure.

### `paymobPaymentController.js`
**Purpose:** Paymob checkout for appointment payments.

**Exports:** `payAppointmentPaymob`, plus helper utilities.

**`payAppointmentPaymob` flow:**
1. Validates appointment and ownership.
2. Blocks payment if already paid or cancelled.
3. Builds billing data from user profile.
4. Calls Paymob auth, order registration, and payment key.
5. Returns Paymob iframe URL.

### `profileController.js`
**Purpose:** User profile read/update.

**Exports:** `getProfile`, `updateProfile`

**`getProfile` flow:**
1. Reads user by `req.userId`.
2. Returns profile without password.

**`updateProfile` flow:**
1. Validates required fields.
2. Parses JSON strings for `address` and `allergy`.
3. Updates basic fields.
4. If image is uploaded, sends to Cloudinary and updates `image`.

### `stripePaymentController.js`
**Purpose:** Stripe checkout for appointment payments.

**Exports:** `payAppointmentStripe`

**`payAppointmentStripe` flow:**
1. Validates appointment and ownership.
2. Builds Stripe line item based on appointment type.
3. Creates a Stripe Checkout session.
4. Returns session URL.

### `userController.js`
**Purpose:** Large, user‑focused controller combining auth, file analysis, chat, appointments, and payments.

**Exports:** `registerUser`, `loginUser`, `getProfile`, `updateProfile`, `bookAppointment`, `listAppointment`, `cancelAppointment`, `placeOrderStripe`, `placeOrderPaymob`, `payAppointmentStripe`, `payAppointmentPaymob`, `uploadAudio`, `uploadFile`, `analyzeImage`, `analyzePdfText`, `getDoctorsBySpecialty`, `getChatResponse`, `googleAuth`, `appleAuth`, plus OTP utilities.

**Notable helpers:**
1. `getAudioDuration` uses FFmpeg to read audio duration.
2. `getSystemPrompt` and `extractAppointmentDetails` support chat behavior.
3. Paymob helper functions generate auth tokens and payment keys.

**`uploadAudio` flow:**
1. Validates file presence, size, and mimetype.
2. Uploads audio to Cloudinary.
3. Sends file to OpenAI Whisper for transcription with retry/backoff.
4. Saves transcription to user or temp collection.
5. Returns transcription result.

**`uploadFile` flow:**
1. Uploads any file to Cloudinary.
2. Saves metadata to user or temp collection.
3. Returns file URL.

**`analyzeImage` flow:**
1. Validates `imageUrl`.
2. Calls OpenAI vision model for prescription analysis.
3. Returns the model response.

**`analyzePdfText` flow:**
1. Validates PDF file.
2. Uploads to Cloudinary.
3. Extracts text with `pdf2json`.
4. Sends text to OpenAI for analysis.
5. Saves file metadata and returns analysis.

**`getChatResponse` flow:**
1. Builds personalized system prompt with appointments and files.
2. Calls OpenAI chat completion.
3. Adds booking instructions if needed.

**`bookAppointment`, `listAppointment`, `cancelAppointment` flow:**
1. Same patterns as in `bookingController.js` and appointment controllers.

**`payAppointmentPaymob` and `payAppointmentStripe` flow:**
1. Same validation and payment logic as Paymob/Stripe controllers.

### `userDoctorController.js`
**Purpose:** Read‑only doctor search for users.

**Exports:** `getDoctorsBySpecialty`

**`getDoctorsBySpecialty` flow:**
1. Reads `specialty` query.
2. Finds available doctors by regex match.
3. Returns name, specialty, and fees.

### `userOrderController.js`
**Purpose:** User order history.

**Exports:** `getUserOrders`

**`getUserOrders` flow:**
1. Finds user orders with COD or paid status.
2. Populates drugs and address.
3. Adds fallback product data if a drug is missing.
4. Returns orders list.

## Notes

If you add a new controller, update this file with:

1. The purpose of the new module.
2. Exported functions.
3. A clear, step‑by‑step description of each function.
