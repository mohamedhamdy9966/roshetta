# Webhooks Folder README

This folder contains webhook handlers for third‑party payment providers. Webhooks are **server‑to‑server callbacks** that notify your backend about payment events. These handlers validate signatures, interpret the event payload, and update appointment records accordingly.

## Common Patterns

- Validate the incoming request signature (HMAC or Stripe signature).
- Locate the relevant appointment by ID stored in the event.
- Update payment fields (`payment`, `paymentStatus`, `paidAmount`, etc.).
- Return a 200 response quickly so the provider doesn’t retry.

## File-by-File Detail

### `paymobWebhooks.js`
**Purpose:** Handle Paymob payment callbacks for appointments.

**Export:** `paymobWebhook`

**Flow (step by step):**
1. Reads `hmac` from `req.query.hmac`.
2. Reads the full request body as `payload`.
3. Computes `secureHash` using:
   - `crypto.createHmac("sha512", PAYMOB_HMAC_SECRET)`
   - `JSON.stringify(payload)` as the message
4. Compares computed hash to the `hmac` provided by Paymob.
   - If mismatch, returns `403 Invalid HMAC signature`.
5. Extracts the Paymob object from `req.body.obj`.
6. Reads:
   - `appointmentId` from `obj.order.merchant_order_id`
   - `transactionId` from `obj.id`
   - `amount` from `obj.amount_cents`
7. Tries to find a doctor appointment first.
8. If not found, tries to find a lab appointment.
9. If still not found, returns `404 Appointment not found`.
10. Chooses the correct model (`appointmentDoctorModel` or `appointmentLabModel`).
11. If `obj.success` is true:
    - Marks `payment: true`
    - Sets `paymentStatus: "completed"`
    - Saves `transactionId`
    - Stores `paidAmount` (converted from cents to currency)
12. If `obj.success` is false:
    - Marks `cancelled: true`
    - Sets `paymentStatus: "failed"`
    - Saves `transactionId`
13. Returns `200 OK`.

**Important notes:**
- This webhook updates **appointments**, not pharmacy orders.
- It assumes `PAYMOB_HMAC_SECRET` is set in environment variables.

### `stripeWebhooks.js`
**Purpose:** Handle Stripe payment events for appointments.

**Export:** `stripeWebhooks`

**Flow (step by step):**
1. Creates a Stripe SDK instance using `STRIPE_SECRET_KEY`.
2. Reads the signature from `request.headers["stripe-signature"]`.
3. Verifies the webhook body using `stripeInstance.webhooks.constructEvent(...)`.
   - If verification fails, responds with `400 Webhook Error`.
4. Switches on `event.type` and processes known events:

**Event: `checkout.session.completed`**
1. Reads `appointmentId`, `userId`, `isDoctorAppointment` from session metadata.
2. Chooses appointment model based on `isDoctorAppointment`.
3. Updates appointment:
   - `payment: true`
   - `paymentStatus: "completed"`
   - `stripeSessionId`
   - `paidAmount` (cents → currency)
   - `updatedAt`

**Event: `payment_intent.succeeded`**
1. Lists Stripe sessions linked to the payment intent.
2. Reads `appointmentId` and `isDoctorAppointment` from session metadata.
3. Updates appointment:
   - `payment: true`
   - `paymentStatus: "completed"`
   - `paymentIntentId`
   - `stripeSessionId`
   - `paidAmount`
   - `updatedAt`

**Event: `payment_intent.payment_failed`**
1. Finds the session tied to the failed intent.
2. Updates appointment:
   - `cancelled: true`
   - `paymentStatus: "failed"`
   - `paymentIntentId`
   - `updatedAt`

5. For unhandled events, logs the event type.
6. Responds with `{ received: true }`.

**Important notes:**
- Stripe requires the raw request body for signature verification.
- The handler assumes metadata was stored at checkout time.

## Adding A New Webhook

When adding a new webhook:

1. Verify the provider signature or secret.
2. Identify the entity to update (appointment, order, etc.).
3. Normalize payment status values (`completed`, `failed`, `pending`).
4. Keep responses fast to avoid retries.
5. Update this README with the event types and update logic.
