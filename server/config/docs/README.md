# Config Folder README

This folder contains the small, focused setup modules that prepare third‑party services for the backend. Each file exports either:

- A `connect...` function that is called during server startup, or
- A ready‑to‑use client instance you can import in routes/controllers.

The goal is to keep all external service wiring in one place so the rest of the codebase stays clean and testable.

## Files And What They Do

### `cloudinary.js`
**Purpose:** Configure the Cloudinary SDK with environment variables so the app can upload and manage media.

**Export:** `connectCloudinary` (async function)

**How it works (line‑by‑line intent):**
- Imports Cloudinary's `v2` API as `cloudinary`.
- Defines `connectCloudinary`, an async function used at startup.
- Calls `cloudinary.config(...)` to load credentials from environment variables:
  - `CLOUDINARY_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_SECRET_KEY`
- Exports the function so the server can call it once during boot.

**Usage example:**
```js
import connectCloudinary from "./config/cloudinary.js";

await connectCloudinary();
```

### `mongodb.js`
**Purpose:** Establish and monitor a MongoDB connection using Mongoose.

**Export:** `connectDB` (async function)

**How it works (line‑by‑line intent):**
- Imports `mongoose`.
- Defines `connectDB`, an async function used at startup.
- Adds a listener: when Mongoose emits `connected`, it logs `"Database Connected"`.
- Connects using `mongoose.connect(...)` with:
  - `process.env.MONGODB_URL` as the base connection string
  - Appends `/roshetta` to select the database name
- Exports the function for server bootstrapping.

**Usage example:**
```js
import connectDB from "./config/mongodb.js";

await connectDB();
```

### `nodemailer.js`
**Purpose:** Create a reusable SMTP mail transporter with connection verification.

**Export:** `transporter` (Nodemailer transport instance)

**How it works (line‑by‑line intent):**
- Imports `nodemailer`.
- Creates a transport using `nodemailer.createTransport(...)` with:
  - `host` from `SMTP_HOST`
  - `port` from `SMTP_PORT` (parsed to integer)
  - `secure: true` (for port 465; set to false for 587/25)
  - `auth.user` from `SMTP_USER`
  - `auth.pass` from `SMTP_PASSWORD`
  - `tls.rejectUnauthorized: false` to bypass strict TLS validation when needed
- Calls `transporter.verify(...)` to test the SMTP config at startup and log errors.
- Exports the `transporter` so email‑sending code can import and use it directly.

**Usage example:**
```js
import transporter from "./config/nodemailer.js";

await transporter.sendMail({
  from: "no-reply@yourdomain.com",
  to: "user@example.com",
  subject: "Welcome",
  text: "Hello!",
});
```

## Environment Variables

These values must exist in your server environment (for example in a `.env` file loaded by the backend):

- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`
- `MONGODB_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`

## Where These Are Called

Typical flow (see `server.js` or the main app bootstrap):

1. Load environment variables.
2. Call `connectDB()` to connect to MongoDB.
3. Call `connectCloudinary()` to configure Cloudinary.
4. Use `transporter` wherever emails are sent.

If you add a new external service, place its setup here and document it in this file.
