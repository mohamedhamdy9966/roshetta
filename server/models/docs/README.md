# Models Folder README

This folder defines all MongoDB data models using Mongoose. Each file exports a schema-backed model that is used by controllers and services. The models describe the **shape of your data**, validation rules, defaults, and relationships.

## Common Patterns

- Mongoose schemas define field types, required flags, defaults, and validation.
- Most models use `mongoose.models.<name> || mongoose.model("<name>", schema)` to avoid recompiling models in hot-reload.
- Relationships are represented with `ObjectId` references or embedded subdocuments.
- Some models enable `timestamps` to add `createdAt` and `updatedAt`.

## File-by-File Detail

### `Address.js`
**Purpose:** Store saved addresses for orders and deliveries.

**Model:** `address`

**Fields (and why they exist):**
- `userId` (String, required): Links address to the owning user.
- `firstName`, `lastName` (String, required): Used for delivery/contact.
- `email` (String, required): Contact email for the address.
- `street` (String, required): Main address line.
- `building`, `floor`, `apartment` (Number, default `"Unknown"`): Additional address details.
- `city`, `state`, `country` (String, required): Region identifiers.
- `zipcode` (Number, default `"Unknown"`): Postal code.
- `phone` (Number, required): Contact phone number.

**Notes:**
- Some numeric fields default to `"Unknown"` (a string). This is allowed by JS but mixed types can be confusing later.

### `appointmentDoctorModel.js`
**Purpose:** Store doctor appointment bookings.

**Model:** `appointment`

**Schema highlights:**
- Appointment identifiers: `userId`, `docId`, `slotDate`, `slotTime`.
- Snapshot data: `userData` and `docData` store objects at booking time.
- Payment tracking: `payment`, `paymentStatus`, `paymentMethod`, `transactionId`, etc.
- Workflow state: `cancelled`, `isCompleted`.

**Timestamps:**
- Enabled (`createdAt`, `updatedAt`).

### `appointmentLabModel.js`
**Purpose:** Store lab appointment bookings.

**Model:** `appointment` (same collection name as doctor appointments)

**Schema highlights:**
- Similar to doctor appointments, but uses `labId`.
- Keeps `docData` as a generic appointment metadata object.

**Important note:**
- Both doctor and lab appointment models register the same model name `"appointment"`. This means both files point to the same collection in MongoDB. That may be intentional or a collision.

### `doctorModel.js`
**Purpose:** Store doctor accounts and profiles.

**Model:** `doctor`

**Key fields:**
- Identity: `name`, `email`, `mobile`, `password`.
- Profile: `image`, `specialty`, `degree`, `experience`, `about`.
- Availability: `available`, `slotsBooked`.
- Fees: `fees` (with min validation).
- Address stored as a flexible object.
- Ratings array with user references and 1–5 scores.

**Special settings:**
- `{ minimize: false }` keeps empty objects from being removed.

### `Drug.js`
**Purpose:** Store pharmacy product catalog items.

**Model:** `drug`

**Key fields:**
- `name` (unique, trimmed).
- `description` (Array, validated as non‑empty).
- `price`, `offerPrice` (Numbers with non‑negative validation).
- `image` (Array, validated as non‑empty).
- `category` (String).
- `inStock` (Boolean, default true).

**Timestamps:**
- Enabled.

### `labModel.js`
**Purpose:** Store lab accounts and profiles.

**Model:** `lab`

**Key fields:**
- Identity: `name`, `email`, `mobile`, `password`.
- Profile: `image`, `services` (array of strings), `fees`.
- Availability: `available`, `slotsBooked`.
- Ratings array (same pattern as doctors).

**Settings:**
- `{ minimize: false }` to keep empty objects.

### `Order.js`
**Purpose:** Store pharmacy orders.

**Model:** `order`

**Key fields:**
- `userId`: String ID of the user.
- `items`: Array of `{ drug, quantity }` where `drug` is an ObjectId ref.
- `amount`: Total order amount.
- `address`: ObjectId ref to `address`.
- `status`: String status (default `"Order Placed"`).
- `paymentType`: String (e.g., `"COD"` or `"Online"`).
- `isPaid`: Boolean payment flag.

**Timestamps:**
- Enabled.

### `tempFileModel.js`
**Purpose:** Store files uploaded by unauthenticated users.

**Model:** `tempFile`

**Fields:**
- `type`: MIME type.
- `url`: Cloudinary URL.
- `transcription`: For audio.
- `textContent`: For PDFs.
- `sessionId`: Helps track anonymous user sessions.
- `createdAt`: Upload time.

**Timestamps:**
- Enabled.

### `userModel.js`
**Purpose:** Store user accounts and medical profile data.

**Model:** `user`

**Identity and auth fields:**
- `name`, `email`.
- `mobile`, `password` are required unless `isGoogleUser`.
- `googleId`, `appleId` with sparse unique indexes.
- OTP fields for verification and reset.
- `isAccountVerified`, `isGoogleUser`, `isAppleUser`.

**Profile and medical data:**
- `bloodType`, `medicalInsurance`, `gender`, `birthDate`.
- `allergy`, `address`.
- `uploadedFiles` list for user uploads.
- `diseases`, `drugs`, `surgeries`, `familyHistory`.
- `medicalRecord`, `prescriptions`, `reports`.
- `ratings` array for doctor/lab feedback.

**Notes:**
- Several embedded subdocuments have enums for status fields.
- Large default image is stored as a base64 string.
- `timestamps` adds `createdAt` and `updatedAt`.

## Adding A New Model

When adding a new model:

1. Define a clear purpose and document it here.
2. Include required fields, defaults, and validations.
3. Decide whether `timestamps` should be enabled.
4. If you add refs, document the relationship.
