# Middlewares Folder README

This folder contains Express middleware functions used to authenticate requests and handle file uploads. Each middleware focuses on a single concern and is imported by route modules.

## Common Patterns

- Reads tokens from `req.headers`.
- Verifies JWT tokens using `JWT_SECRET`.
- Writes resolved IDs to `req` (`req.userId`, `req.docId`, `req.labId`).
- Calls `next()` on success, or returns a JSON error on failure.
- For file uploads, uses `multer` with `memoryStorage` and type limits.

## File-by-File Detail

### `authAdmin.js`
**Purpose:** Protect admin routes using a token that encodes the admin email/password.

**Export:** `authAdmin` (middleware function)

**Flow:**
1. Reads `atoken` from `req.headers`.
2. If missing, returns `{ success: false, message: "Not Authorized Login Again" }`.
3. Verifies the token with `jwt.verify(token, JWT_SECRET)`.
4. Compares decoded payload with `ADMIN_EMAIL + ADMIN_PASSWORD`.
5. If mismatch, returns unauthorized response.
6. Calls `next()` when validation passes.

**Notes:**
- This admin token is created in `authAdminController.js` using `jwt.sign(email + password, JWT_SECRET)`.
- The payload is a string, not an object.

### `authDoctor.js`
**Purpose:** Protect doctor routes and attach the doctor ID to the request.

**Export:** `authDoctor` (middleware function)

**Flow:**
1. Reads `dtoken` header, with fallback to `dToken`.
2. If missing, returns `{ success: false, message: "Not Authorized Login Again" }`.
3. Verifies the JWT with `JWT_SECRET`.
4. Extracts `id` from the decoded token.
5. Assigns `req.docId = decoded.id`.
6. Calls `next()` on success.

### `authLab.js`
**Purpose:** Protect lab routes and attach the lab ID to the request.

**Export:** `authLab` (middleware function)

**Flow:**
1. Reads `ltoken` header, with fallback to `lToken`.
2. If missing, returns `{ success: false, message: "Not Authorized Login Again" }`.
3. Verifies JWT with `JWT_SECRET`.
4. Assigns `req.labId = decoded.id`.
5. Calls `next()` on success.

### `authUser.js`
**Purpose:** Protect user routes and attach the user ID to the request.

**Export:** `authUser` (middleware function)

**Flow:**
1. Reads `token` from headers.
2. If missing, returns `{ success: false, message: "Not Authorized, Please Login Again" }`.
3. Verifies the JWT with `JWT_SECRET`.
4. Assigns `req.userId = decoded.id`.
5. Calls `next()` on success.

### `multer.js`
**Purpose:** Configure file uploads using Multer.

**Export:** `upload` (Multer instance)

**Flow:**
1. Uses `multer.memoryStorage()` to keep uploads in memory as buffers.
2. Limits file size to **5 MB**.
3. Filters by allowed MIME types:
   - Audio: `audio/mpeg`, `audio/mp3`, `audio/wav`, `audio/webm`
   - Images: `image/jpeg`, `image/png`
   - PDFs: `application/pdf`
4. Rejects any file outside this list with a clear error message.

**Notes:**
- Memory storage means `req.file.buffer` is available immediately.
- Controllers such as file uploads and AI analysis rely on this buffer.

## Adding New Middleware

When adding a new middleware:

1. Keep the function focused on a single responsibility.
2. Document input expectations (headers, body fields, etc.).
3. Explain side‑effects (what is added to `req`).
4. Update this README with purpose, export, and step‑by‑step flow.
