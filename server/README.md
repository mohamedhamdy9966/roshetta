# Roshetta Server

## Overview

The Roshetta server is a comprehensive Node.js/Express.js backend API that powers the Roshetta healthcare platform. It provides RESTful APIs for user management, doctor/laboratory appointments, e-commerce functionality, payment processing, file uploads, and administrative operations. The server integrates with MongoDB for data persistence, supports multiple authentication methods (JWT, Google OAuth, Apple Sign-In), and handles payment processing through Stripe and Paymob.

## Architecture

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens, bcrypt hashing, Google OAuth, Apple Sign-In
- **File Storage**: Cloudinary CDN
- **Email Service**: Nodemailer with SMTP
- **Payment Processing**: Stripe and Paymob with webhook handling
- **Security**: Rate limiting, CORS, session management
- **Media Processing**: FFmpeg for audio/video processing
- **Document Processing**: pdf2json for PDF text extraction

### Project Structure

```
server/
├── server.js                 # Main Express application entry point
├── cleanup.js               # Background job for temporary file cleanup
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment configuration
├── config/                  # Configuration files
│   ├── mongodb.js          # MongoDB connection setup
│   ├── cloudinary.js       # Cloudinary file storage config
│   └── nodemailer.js       # Email service configuration
├── controllers/             # Business logic handlers (23 controllers)
│   ├── authController.js   # User authentication & registration
│   ├── authAdminController.js # Admin authentication
│   ├── authDoctor.js       # Doctor authentication
│   ├── authLab.js          # Lab authentication
│   ├── bookingController.js # Appointment booking logic
│   ├── appointmentAdminController.js # Admin appointment management
│   ├── appointmentListController.js # User appointment listing
│   ├── appointmentCancelController.js # Appointment cancellation
│   ├── cartController.js   # Shopping cart management
│   ├── chatController.js   # Chat/AI response handling
│   ├── codOrderController.js # Cash on delivery orders
│   ├── dashboardAdminController.js # Admin dashboard data
│   ├── doctorAdminController.js # Doctor management (admin)
│   ├── doctorController.js # Doctor-specific operations
│   ├── drugController.js   # Drug inventory management
│   ├── fileController.js   # File upload handling
│   ├── labAdminController.js # Lab management (admin)
│   ├── labController.js    # Lab-specific operations
│   ├── paymobOrderController.js # Paymob payment orders
│   ├── paymobPaymentController.js # Paymob payment processing
│   ├── profileController.js # User profile management
│   ├── stripePaymentController.js # Stripe payment processing
│   ├── userController.js   # General user operations
│   └── userDoctorController.js # User-doctor interactions
├── middlewares/             # Express middleware functions
│   ├── authAdmin.js        # Admin authentication middleware
│   ├── authDoctor.js       # Doctor authentication middleware
│   ├── authLab.js          # Lab authentication middleware
│   ├── authUser.js         # User authentication middleware
│   └── multer.js           # File upload middleware
├── models/                  # MongoDB data models
│   ├── userModel.js        # User schema with medical history
│   ├── doctorModel.js      # Doctor profile schema
│   ├── labModel.js         # Laboratory schema
│   ├── Drug.js             # Drug inventory schema
│   ├── Order.js            # Order schema
│   ├── Address.js          # User address schema
│   ├── appointmentDoctorModel.js # Doctor appointment schema
│   ├── appointmentLabModel.js # Lab appointment schema
│   └── tempFileModel.js    # Temporary file schema
├── routes/                  # API route definitions
│   ├── adminRoute.js       # Admin API endpoints
│   ├── doctorRoute.js      # Doctor API endpoints
│   ├── userRoute.js        # User API endpoints
│   ├── labRoute.js         # Lab API endpoints
│   ├── drugRoute.js        # Drug API endpoints
│   ├── cartRoute.js        # Cart API endpoints
│   ├── addressRoute.js     # Address API endpoints
│   └── orderRoute.js       # Order API endpoints
└── webhooks/                # Payment webhook handlers
    ├── stripeWebhooks.js   # Stripe webhook processing
    └── paymobWebhooks.js   # Paymob webhook processing
```

## Core Components

### 1. Server Entry Point (`server.js`)

The main Express application configuration with comprehensive middleware setup:

```javascript
// Express app initialization
const app = express();
const port = process.env.PORT || 4000;

// Database and cloud connections
connectDB();
connectCloudinary();

// Session management with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  cookie: { secure: process.env.NODE_ENV === "production" }
}));

// Rate limiting for API protection
const authApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: { success: false, message: "Too many requests..." }
});

// CORS configuration with allowed origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Webhook routes (before express.json for raw body access)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);
app.post("/paymob-webhook", express.json(), paymobWebhook);

// API route mounting
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/lab", labRouter);
app.use("/api/drug", drugRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// Server startup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

**Key Features:**
- **Session Management**: MongoDB-backed sessions for state persistence
- **Rate Limiting**: API protection against abuse
- **CORS**: Configured for multiple frontend origins
- **Webhook Handling**: Raw body parsing for Stripe, JSON for Paymob
- **Route Organization**: Modular API endpoint mounting

### 2. Configuration Files

#### MongoDB Configuration (`config/mongodb.js`)
```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export default connectDB;
```

#### Cloudinary Configuration (`config/cloudinary.js`)
```javascript
import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinary;
```

#### Nodemailer Configuration (`config/nodemailer.js`)
```javascript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

export default transporter;
```

### 3. Data Models

#### User Model (`models/userModel.js`)
Comprehensive user schema with medical history and authentication:

```javascript
const userSchema = new mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },

  // Authentication Fields
  googleId: { type: String },
  appleId: { type: String },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },

  // Medical History
  bloodType: { type: String },
  medicalInsurance: { type: String },
  allergy: { type: String },
  diseases: [{ type: String }],
  drugs: [{ type: String }],
  surgeries: [{ type: String }],
  familyHistory: [{ type: String }],

  // File Uploads
  uploadedFiles: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  medicalRecord: [{
    fileName: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  prescriptions: [{
    fileName: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  reports: [{
    fileName: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  // Ratings and Reviews
  ratings: [{
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    ratedAt: { type: Date, default: Date.now }
  }],
  labRatings: [{
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'lab' },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    ratedAt: { type: Date, default: Date.now }
  }],

  // Shopping Cart
  cart: [{
    drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'drug' },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });
```

#### Doctor Model (`models/doctorModel.js`)
```javascript
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  slotsBooked: { type: Object, default: {} }
}, { minimize: false });
```

#### Appointment Models
Doctor appointments and lab appointments with payment tracking:

```javascript
// Doctor Appointment Schema
const appointmentDoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  stripeSessionId: { type: String },
  transactionId: { type: String },
  paidAmount: { type: Number }
});
```

### 4. Authentication System

#### JWT Authentication Middleware (`middlewares/authUser.js`)
```javascript
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

#### User Registration (`controllers/authController.js`)
```javascript
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // Password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      medicalHistory: {} // Initialize empty medical history
    };

    const user = new userModel(userData);
    const userSave = await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: userSave._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.json({ success: false, message: "Email already exists" });
    }
    res.json({ success: false, message: error.message });
  }
};
```

### 5. Appointment Booking System

#### Booking Controller (`controllers/bookingController.js`)
```javascript
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    // Check doctor availability
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    // Check slot availability
    let slotsBooked = docData.slotsBooked;
    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate].push(slotTime);
    }

    // Get user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User Not Found" });
    }

    // Create appointment
    delete docData.slotsBooked; // Remove slotsBooked from docData
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentDoctorModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

### 6. Payment Processing

#### Stripe Webhooks (`webhooks/stripeWebhooks.js`)
```javascript
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    response.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  console.log(`Processing Stripe event: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Checkout session completed:", session.id);

      try {
        const { appointmentId, userId, isDoctorAppointment } = session.metadata;

        if (!appointmentId) {
          console.error("No appointmentId in session metadata");
          break;
        }

        const model =
          isDoctorAppointment === "true"
            ? appointmentDoctorModel
            : appointmentLabModel;

        // Update appointment payment status
        const updateResult = await model.findByIdAndUpdate(
          appointmentId,
          {
            payment: true,
            paymentStatus: "completed",
            stripeSessionId: session.id,
            paidAmount: session.amount_total / 100, // Convert from cents
            updatedAt: new Date(),
          }
        );

        if (updateResult) {
          console.log(`Appointment ${appointmentId} payment completed`);
        } else {
          console.error(`Failed to update appointment ${appointmentId}`);
        }
      } catch (error) {
        console.error("Error processing completed session:", error);
      }
      break;
    }
    // Handle other event types...
  }

  response.json({ received: true });
};
```

#### Paymob Webhooks (`webhooks/paymobWebhooks.js`)
```javascript
export const paymobWebhook = async (req, res) => {
  try {
    const receivedHmac = req.query.hmac;
    const payload = req.body;

    // Verify HMAC signature
    const secureHash = crypto
      .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (secureHash !== receivedHmac) {
      console.error("Invalid HMAC signature");
      return res.status(403).send("Invalid HMAC signature");
    }

    const { obj } = req.body;
    const appointmentId = obj.order.merchant_order_id;
    const transactionId = obj.id;
    const amount = obj.amount_cents;

    // Determine appointment type and update payment status
    let appointment = await appointmentDoctorModel.findById(appointmentId);
    let isDoctorAppointment = true;

    if (!appointment) {
      appointment = await appointmentLabModel.findById(appointmentId);
      isDoctorAppointment = false;
    }

    if (obj.success) {
      // Payment successful
      const model = isDoctorAppointment
        ? appointmentDoctorModel
        : appointmentLabModel;

      await model.findByIdAndUpdate(appointmentId, {
        payment: true,
        transactionId: transactionId,
        paymentStatus: "completed",
        paidAmount: amount / 100, // Convert from cents
        updatedAt: new Date(),
      });

      console.log(`Payment completed for appointment ${appointmentId}`);
    } else {
      // Payment failed
      console.log(`Payment failed for appointment ${appointmentId}`);
    }

    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).send("Internal server error");
  }
};
```

### 7. File Upload System

#### Multer Middleware (`middlewares/multer.js`)
```javascript
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "pdf", "mp3", "wav", "mp4", "avi"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });
export default upload;
```

#### File Upload Controller (`controllers/fileController.js`)
```javascript
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const fileData = {
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
      uploadedAt: new Date(),
    };

    // Save to temporary file model for cleanup
    const tempFile = new tempFileModel(fileData);
    await tempFile.save();

    res.json({
      success: true,
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

### 8. Background Jobs

#### Cleanup Service (`cleanup.js`)
```javascript
import mongoose from "mongoose";
import tempFileModel from "./models/tempFileModel.js";

const cleanupTempFiles = async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await tempFileModel.deleteMany({ createdAt: { $lt: oneDayAgo } });
    console.log("Cleaned up old temporary files");
  } catch (error) {
    console.error("Error cleaning up temp files:", error);
  }
};

// Run cleanup every 24 hours
setInterval(cleanupTempFiles, 24 * 60 * 60 * 1000);

export default cleanupTempFiles;
```

### 9. API Routes Structure

#### User Routes (`routes/userRoute.js`)
```javascript
// Authentication routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-auth", googleAuth);
userRouter.post("/apple-auth", appleAuth);

// Profile management
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single("imageProfile"), authUser, updateProfile);

// Appointment management
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Payment routes
userRouter.post("/pay-appointment-stripe", authUser, payAppointmentStripe);
userRouter.post("/pay-appointment-paymob", authUser, payAppointmentPaymob);
userRouter.post("/stripe", authUser, placeOrderStripe);
userRouter.post("/paymob", authUser, placeOrderPaymob);

// File upload routes
userRouter.post("/upload-audio", authUser, upload.single("audio"), uploadAudio);
userRouter.post("/upload-file", authUser, upload.single("file"), uploadFile);

// AI/ML routes
userRouter.post("/analyze-image", authUser, analyzeImage);
userRouter.post("/analyze-pdf", upload.single("file"), analyzePdfText);
userRouter.post("/analyze-text", getChatResponse);
```

#### Admin Routes (`routes/adminRoute.js`)
```javascript
// Authentication
adminRouter.post("/login", loginAdmin);

// Doctor management
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-doctor-availability", authAdmin, changeDoctorAvailability);

// Lab management
adminRouter.post("/add-lab", authAdmin, upload.single("image"), addLab);
adminRouter.get("/all-labs", authAdmin, allLabs);
adminRouter.post("/change-lab-availability", authAdmin, changeLabAvailability);

// Appointment management
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// Dashboard
adminRouter.get("/dashboard", authAdmin, adminDashboard);
```

## Environment Variables

The server requires the following environment variables:

```env
# Database
MONGODB_URL=mongodb://localhost:27017/roshetta

# JWT
JWT_SECRET=your_jwt_secret_key

# Session
SESSION_SECRET=your_session_secret

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Paymob
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_HMAC_SECRET=your_paymob_hmac_secret

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret

# OpenAI (for AI features)
OPENAI_API_KEY=your_openai_api_key

# Server
PORT=4000
NODE_ENV=development
```

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Configuration**
Create a `.env` file with the required environment variables.

3. **Database Setup**
Ensure MongoDB is running and accessible.

4. **Start Server**
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints Overview

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/admin/login` - Admin login
- `POST /api/doctor/login` - Doctor login

### Appointments
- `POST /api/user/book-appointment` - Book doctor appointment
- `GET /api/user/appointments` - List user appointments
- `POST /api/user/cancel-appointment` - Cancel appointment

### Payments
- `POST /api/user/pay-appointment-stripe` - Pay with Stripe
- `POST /api/user/pay-appointment-paymob` - Pay with Paymob
- `POST /stripe` - Stripe webhook
- `POST /paymob-webhook` - Paymob webhook

### File Management
- `POST /api/user/upload-file` - Upload files
- `POST /api/user/upload-audio` - Upload audio files
- `POST /api/user/analyze-image` - AI image analysis
- `POST /api/user/analyze-pdf` - PDF text analysis

### E-commerce
- `POST /api/cart/add` - Add to cart
- `POST /api/order/stripe` - Place order with Stripe
- `POST /api/order/paymob` - Place order with Paymob

## Security Features

1. **Rate Limiting**: API endpoints protected against abuse
2. **CORS**: Configured for allowed origins only
3. **JWT Authentication**: Secure token-based authentication
4. **Password Hashing**: bcrypt for secure password storage
5. **Webhook Verification**: HMAC signature verification for payments
6. **Input Validation**: Comprehensive input validation
7. **Session Management**: Secure session handling with MongoDB store

## Error Handling

The server implements comprehensive error handling:
- Database connection errors
- Authentication failures
- Payment processing errors
- File upload errors
- Validation errors
- Webhook processing errors

All errors return structured JSON responses with `success: false` and descriptive error messages.

## Deployment

The server is configured for deployment on Vercel with the `vercel.json` configuration file. The server includes:

- Environment variable configuration
- Build commands
- API route handling
- Static file serving

## Monitoring & Logging

The server includes comprehensive logging for:
- Database connections
- Authentication attempts
- Payment processing
- File uploads
- Error conditions
- Webhook events

## Future Enhancements

Potential areas for improvement:
- API versioning
- Caching layer (Redis)
- Message queuing
- Real-time notifications
- Advanced analytics
- Multi-language support
- API documentation (Swagger/OpenAPI)</content>
<parameter name="filePath">c:\Users\Smart Store\Github\roshetta\server\README.md