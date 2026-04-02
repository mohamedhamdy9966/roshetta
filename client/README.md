# Roshetta Client - Healthcare Platform Frontend

Comprehensive React-based frontend application for the Roshetta healthcare platform, providing integrated services for doctor appointments, lab bookings, pharmaceutical e-commerce, and patient management.

## Quick Navigation

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Technologies & Dependencies](#technologies--dependencies)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Routing Structure](#routing-structure)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Component System](#component-system)
- [Pages Documentation](#pages-documentation)
- [Configuration Details](#configuration-details)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**Roshetta Client** is a full-featured React application that serves as the frontend for the Roshetta healthcare platform. It provides users with:

- **Doctor Appointments**: Browse, filter, and book appointments with medical professionals
- **Lab Services**: Access laboratory testing and booking services (in development)
- **Pharmacy E-Commerce**: Browse and purchase medications with delivery
- **User Management**: Profile editing, appointment tracking, order history
- **Authentication**: Secure login/signup with medical history collection
- **Payment Integration**: Stripe and COD (Cash on Delivery) payment methods
- **Real-time Chat**: Integrated chatbot for medical inquiries
- **Multi-language Support**: Arabic and English language support (framework ready)

**Current Version**: 0.0.0 (Development)

**Platform**: Web (React + Vite)

**Target Users**: Patients, healthcare consumers, appointment bookers, pharmacy customers

---

## Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        React Application                      │
│  (Vite Dev Server on Port 5174)                              │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼────┐ ┌──────▼──────┐ ┌───▼────────┐
        │ AppContext  │ │   Router    │ │ Components │
        │ (Global St.)│ │(React Router)│ │   System  │
        └────────────┘ └─────────────┘ └────────────┘
                │
        ┌───────▼──────────────────┐
        │   HTTP Requests          │
        │  (Axios Instance)        │
        └───────┬──────────────────┘
                │
        ┌───────▼──────────────────┐
        │   Backend API Server     │
        │  (http://localhost:5000) │
        └──────────────────────────┘
```

### Component Architecture

```
App.jsx (Root)
├── Navbar (Global)
│   ├── Navigation Links
│   ├── Auth Status
│   ├── Cart Badge
│   └── Mobile Menu
├── Routes
│   ├── Home Page
│   │   ├── Header
│   │   ├── DoctorSpecialty
│   │   └── TopDoctors
│   ├── Authentication Pages
│   │   ├── Login/Signup
│   │   ├── VerifyEmail
│   │   └── ResetPassword
│   ├── Healthcare Pages
│   │   ├── Doctors (with filters)
│   │   ├── DoctorAppointment
│   │   ├── MyAppointments
│   │   ├── Labs
│   │   └── LabAppointment
│   ├── E-Commerce Pages
│   │   ├── Cart
│   │   ├── Drugs
│   │   ├── DrugDetails
│   │   ├── DrugCategory
│   │   ├── MyOrders
│   │   └── AddAddress
│   ├── Payment Pages
│   │   ├── PaymentSuccess
│   │   ├── PaymentCancel
│   │   └── PaymentProcessing
│   ├── User Pages
│   │   └── MyProfile
│   ├── Information Pages
│   │   ├── About
│   │   ├── Contact
│   │   └── PrivacyPolicy
│   └── Special Components
│       ├── Chatbot (Floating)
│       └── Toast Notifications
├── Footer (Global)
└── AppContextProvider (State Management)
```

### Data Flow

```
User Interaction
       │
       ▼
Component State
       │
       ▼
Global Context Update
       │
       ▼
API Call (Axios)
       │
       ▼
Backend Server
       │
       ▼
Response Processing
       │
       ▼
State Update
       │
       ▼
Re-render UI
       │
       ▼
Toast Notification
```

---

## Folder Structure

```
client/
├── src/
│   ├── App.jsx                          # Root component with routing
│   ├── main.jsx                         # Vite entry point
│   ├── index.css                        # Global styles
│   │
│   ├── assets/                          # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── assets.js                    # Asset exports
│   │
│   ├── components/                      # Reusable UI components
│   │   ├── Navbar.jsx                   # Navigation header
│   │   ├── Footer.jsx                   # Footer component
│   │   ├── Header.jsx                   # Hero header
│   │   ├── Sidebar.jsx                  # User sidebar
│   │   ├── Chatbot.jsx                  # AI chatbot
│   │   ├── VerifyEmail.jsx              # Email verification
│   │   ├── ResetPassword.jsx            # Password reset form
│   │   ├── TopDoctors.jsx               # Featured doctors
│   │   ├── DoctorSpecialty.jsx          # Specialty grid
│   │   ├── RelatedDoctors.jsx           # Related doctors list
│   │   ├── RightSidebar.jsx             # Right sidebar
│   │   ├── LabHeader.jsx                # Lab hero section
│   │   ├── LabSpecialty.jsx             # Lab specialties
│   │   ├── DoctorsBanner.jsx            # CTA banner
│   │   ├── ChatContainer.jsx            # Chat UI
│   │   ├── ProductCard.jsx              # Drug product card
│   │   └── README.md                    # Components documentation
│   │
│   ├── context/                         # Global state management
│   │   ├── AppContext.jsx               # Main context provider
│   │   ├── README.md                    # Context documentation
│   │   └── docs/
│   │       └── README.md                # Quick reference guide
│   │
│   ├── pages/                           # Page components (routes)
│   │   ├── Home.jsx                     # Landing page
│   │   ├── Login.jsx                    # Authentication
│   │   ├── Doctors.jsx                  # Doctor browser
│   │   ├── DoctorAppointment.jsx        # Appointment booking
│   │   ├── MyDoctorsAppointments.jsx    # Appointment history
│   │   ├── LabAppointment.jsx           # Lab appointment
│   │   ├── MyLabsAppointments.jsx       # Lab appointment history
│   │   ├── Cart.jsx                     # Shopping cart
│   │   ├── AddAddress.jsx               # Address management
│   │   ├── Drugs.jsx                    # Drug browser
│   │   ├── AllDrugs.jsx                 # All drugs view
│   │   ├── DrugCategory.jsx             # Category browser
│   │   ├── DrugDetails.jsx              # Product details
│   │   ├── DrugOrder.jsx                # Order page
│   │   ├── MyOrders.jsx                 # Order history
│   │   ├── MyProfile.jsx                # User profile
│   │   ├── PaymentSuccess.jsx           # Payment confirmation
│   │   ├── PaymentCancel.jsx            # Payment failure
│   │   ├── PaymentProcessing.jsx        # Payment loading
│   │   ├── About.jsx                    # About page
│   │   ├── Contact.jsx                  # Contact form
│   │   ├── PrivacyPolicy.jsx            # Privacy policy
│   │   └── README.md                    # Pages documentation
│   │
│   └── App.css (if separate styles)
│
├── public/                              # Static files
│   ├── manifest.json                    # PWA manifest
│   └── favicon.ico
│
├── package.json                         # Dependencies
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind CSS config
├── postcss.config.js                    # PostCSS config
├── eslint.config.js                     # ESLint rules
├── .env                                 # Environment variables (git-ignored)
├── .env.example                         # Environment template
├── .gitignore
├── .vercel.json                         # Vercel deployment config
└── README.md                            # This file
```

---

## Technologies & Dependencies

### Core Framework
- **React 19.1.0** - UI library for building user interfaces
- **React DOM 19.1.0** - React rendering for DOM
- **React Router DOM 6.x** - Client-side routing and navigation
- **Vite 5.x** - Fast build tool and dev server

### Build & Optimization
- **@vitejs/plugin-react** - React Fast Refresh for Vite
- **@tailwindcss/vite** - Tailwind CSS integration with Vite
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **PostCSS** - CSS processing

### State & Forms
- **Formik 2.4.6** - Form state management
- **Yup** - Schema validation for Formik
- **React Context API** - Built-in global state management

### HTTP & API
- **Axios 1.10.0** - HTTP client with request interceptors
- **API Base URL**: Configured from environment variables

### Authentication & OAuth
- **@react-oauth/google 0.12.2** - Google OAuth integration
- **apple-signin-auth 2.0.0** - Apple Sign-In integration
- **JWT Tokens** - Token-based authentication (stored in localStorage)

### UI Components & Graphics
- **Material-UI (@mui/material 7.2.0)** - Component library
- **Lucide React 0.525.0** - Icon library
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **Framer Motion 12.23.12** - Animation library
- **@headlessui/react 2.2.4** - Headless UI components
- **@heroicons/react 2.2.0** - Heroicons icon set
- **@fortawesome/react-fontawesome** - Font Awesome icons
- **Emotion (@emotion/react)** - CSS-in-JS styling

### Notifications & Feedback
- **React Toastify** - Toast notification system
- **React Hot Toast** - Alternative toast library (used in some pages)
- **React Helmet 6.1.0** - SEO meta tags management

### Data Visualization & Analytics
- **Chart.js 4.5.0** - Charting library
- **React Countup 6.5.3** - Number animation for statistics

### Utilities
- **UUID 4** - Unique ID generation
- **React Calendar 6.0.0** - Date picker component
- **React DnD 16.0.1** - Drag and drop functionality
- **DOMPurify** - HTML sanitization
- **Crypto** - Cryptographic utilities

### Document Generation (Pharmacy Orders)
- **jsPDF 3.0.1** - PDF generation
- **jsPDF-AutoTable 5.0.2** - PDF table generation
- **PDFMake 0.2.20** - PDF creation alternative
- **@react-pdf/renderer 4.3.0** - React component to PDF

### Internationalization (i18n)
- **i18n 0.15.1** - Multi-language support framework
- Language support: Arabic, English

### Cloud & Databases
- **@supabase/supabase-js 2.52.1** - Supabase backend (optional integration)

### Development
- **ESLint** - Code linting
- **dotenv 17.2.1** - Environment variable loading

### Full Dependency Tree
```
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@fortawesome/fontawesome-free": "^7.0.0",
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-solid-svg-icons": "^6.7.2",
    "@fortawesome/react-fontawesome": "^0.2.3",
    "@headlessui/react": "^2.2.4",
    "@heroicons/react": "^2.2.0",
    "@mui/icons-material": "^7.2.0",
    "@mui/material": "^7.2.0",
    "@popperjs/core": "^2.11.8",
    "@react-oauth/google": "^0.12.2",
    "@react-pdf/renderer": "^4.3.0",
    "@supabase/supabase-js": "^2.52.1",
    "@tailwindcss/vite": "^4.1.11",
    "apple-signin-auth": "^2.0.0",
    "axios": "^1.10.0",
    "bootstrap": "^5.3.7",
    "chart.js": "^4.5.0",
    "crypto": "^1.0.1",
    "dom": "^0.0.3",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "formik": "^2.4.6",
    "framer-motion": "^12.23.12",
    "i18n": "^0.15.1",
    "jspdf": "^3.0.1",
    "jspdf-autotable": "^5.0.2",
    "lucide-react": "^0.525.0",
    "pdfmake": "^0.2.20",
    "react": "^19.1.0",
    "react-bootstrap": "^2.10.10",
    "react-calendar": "^6.0.0",
    "react-countup": "^6.5.3",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^19.1.0",
    "react-helmet": "^6.1.0",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-lottie": "^1.2.4",
    "react-router-dom": "^6.x.x",
    "react-toastify": "^10.0.3",
    "uuid": "^9.0.0",
    "yup": "^1.3.3"
  }
}
```

---

## Setup & Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git** for version control

### Step 1: Clone Repository

```bash
git clone https://github.com/mohamedhamdy9966/roshetta.git
cd roshetta/client
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Configure Environment Variables

Create `.env` file in the client directory:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### Step 4: Verify Installation

```bash
npm run lint
```

This checks for any ESLint errors before running.

---

## Environment Variables

Create `.env` file in the `client/` directory:

```env
# Backend API Configuration
VITE_BACKEND_URL=http://localhost:5000

# Stripe Payment Integration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key_here

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# Apple Sign-In
VITE_APPLE_TEAM_ID=your_apple_team_id
VITE_APPLE_KEY_ID=your_apple_key_id
VITE_APPLE_BUNDLE_ID=com.yourcompany.roshetta

# Supabase (Optional)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Environment
VITE_APP_ENV=development
# Values: development, staging, production
```

### Required Variables Explanation

| Variable | Purpose | Example | Required |
|---|---|---|---|
| `VITE_BACKEND_URL` | Backend API endpoint | `http://localhost:5000` | ✅ Yes |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe payment gateway | `pk_test_...` | ✅ For payments |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth login | `xxx.apps.googleusercontent.com` | ✅ For Google login |
| `VITE_APPLE_TEAM_ID` | Apple Sign-In configuration | `ABC123XYZ` | ❌ Optional |
| `VITE_SUPABASE_URL` | Supabase backend | `https://project.supabase.co` | ❌ Optional |
| `VITE_SUPABASE_ANON_KEY` | Supabase API key | `eyJ...` | ❌ Optional |
| `VITE_APP_ENV` | Environment type | `development` | ❌ Optional |

### How to Get API Keys

**Google OAuth**:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs
6. Copy Client ID

**Stripe**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → API Keys
3. Copy test Publishable Key (starts with `pk_test_`)

**Supabase** (optional):
1. Go to [Supabase](https://supabase.com)
2. Create project
3. Copy Project URL and Anon Key from settings

---

## Running the Application

### Development Server

```bash
npm run dev
```

**Output:**
```
VITE v5.x.x  

➜  Local:   http://localhost:5174/
➜  press h + enter to show help
```

The application will be available at `http://localhost:5174`

**Features**:
- Hot Module Replacement (HMR) - Changes reflect instantly
- Source maps for debugging
- Fast refresh on file changes

### Build for Production

```bash
npm run build
```

**Creates**:
- Optimized build in `dist/` folder
- Code splitting and minification
- Asset optimization

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally to test before deployment.

### Linting

```bash
npm run lint
```

Checks code for ESLint errors and warnings.

---

## Routing Structure

### Route Configuration (from App.jsx)

```jsx
<Routes>
  {/* Home & Landing */}
  <Route path="/" element={<Home />} />

  {/* Doctor Services */}
  <Route path="/doctors" element={<Doctors />} />
  <Route path="/doctors/:specialty" element={<Doctors />} />
  <Route path="/my-appointments/:docId" element={<DoctorAppointment />} />
  <Route path="/my-appointments" element={<MyAppointments />} />

  {/* Lab Services */}
  <Route path="/labs" element={<Labs />} />
  <Route path="/labs/:specialty" element={<Labs />} />
  <Route path="/my-appointments/:labId" element={<LabAppointment />} />

  {/* Pharmacy E-Commerce */}
  <Route path="/drugs" element={<Drugs />} />
  <Route path="/drugs/:specialty" element={<Drugs />} />
  <Route path="/my-appointments/:orderId" element={<DrugOrder />} />

  {/* Authentication */}
  <Route path="/login" element={<Login />} />
  <Route path="/verify-email" element={<VerifyEmail />} />
  <Route path="/reset-password" element={<ResetPassword />} />

  {/* Information Pages */}
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacypolicy" element={<PrivacyPolicy />} />

  {/* User Account */}
  <Route path="/my-profile" element={<MyProfile />} />

  {/* Payment */}
  <Route path="/success" element={<PaymentSuccess />} />
  <Route path="/cancel" element={<PaymentCancel />} />
  <Route path="/processing" element={<PaymentProcessing />} />
</Routes>
```

### Route Categories

**Public Routes** (no authentication required):
- `/` - Home page
- `/doctors`, `/doctors/:specialty` - Browse doctors
- `/labs`, `/labs/:specialty` - Browse labs
- `/drugs`, `/drugs/:specialty` - Browse drugs
- `/login` - Authentication
- `/about`, `/contact`, `/privacypolicy` - Information
- `/success`, `/cancel`, `/processing` - Payment confirmation

**Protected Routes** (requires authentication):
- `/my-appointments` - Doctor appointments
- `/my-appointments/:docId` - Book doctor appointment
- `/my-lab-appointments` - Lab appointments
- `/my-profile` - User profile
- `/my-orders` - Order history
- Cart operations

---

## State Management

### AppContext Architecture

The application uses **React Context API** for global state management through `AppContext`.

**Location**: `src/context/AppContext.jsx`

**Provided to App via**: `<AppContextProvider>` wrapper in main.jsx

### Global State Structure

```jsx
// Authentication (Dual-token system)
token              // Admin/app token (for doctor/lab features)
userToken          // User/eCommerce token (for shopping)
setToken()         // Update admin token
setUserToken()     // Update user token

// User Data
userData           // Admin/app user profile
user               // E-commerce user profile
setUserData()      // Update admin profile
setUser()          // Update user profile

// Collections
doctors            // Array of all doctors
drugs              // Array of all drugs/products
labs               // Array of all labs
cartItems          // { drugId: quantity } cart object

// Cart Operations
addToCart(itemId, qty)       // Add to cart
removeFromCart(itemId)       // Remove from cart
updateCartItem(itemId, qty)  // Update quantity (removes at qty ≤ 0)
getCartCount()               // Get total items
getCartAmount()              // Get total price
clearCart()                  // Empty cart
fetchCart()                  // Load cart from backend
syncCart()                   // Save cart to backend

// Data Fetching
getDoctorsData()             // Fetch doctors list
getChatbotContext()          // Fetch chatbot data
fetchDrugs()                 // Fetch drugs list
loadUserProfileData()        // Load admin profile
loadUserProfile()            // Load user profile

// Configuration
currencySymbol               // Currency (e.g., "EGP")
currency                     // Currency type
backendUrl                   // API base URL
axiosInstance                // Axios with baseURL configured

// UI Control
showUserLogin                // Show login modal
setShowUserLogin()           // Toggle login modal
selectedUser                 // Selected user object
setSelectedUser()            // Set user
chatbotContext              // Chatbot data
setChatbotContext()         // Set chatbot data
```

### Context Usage Example

```jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function MyComponent() {
  const { user, doctors, addToCart, token } = useContext(AppContext);

  if (!user) return <p>Please log in</p>;
  if (!token) return <p>Not authenticated</p>;

  const handleAddItem = () => {
    addToCart("productId123", 1);
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Doctors available: {doctors.length}</p>
      <button onClick={handleAddItem}>Add to Cart</button>
    </div>
  );
}

export default MyComponent;
```

### Token Storage

Tokens are persisted in `localStorage`:

```javascript
// On login/signup
localStorage.setItem("token", adminToken);           // Admin token
localStorage.setItem("userToken", ecommerceToken);   // Ecommerce token

// On app load
const token = localStorage.getItem("token");         // Retrieve token
const userToken = localStorage.getItem("userToken"); // Retrieve user token

// On logout
localStorage.removeItem("token");                    // Remove tokens
localStorage.removeItem("userToken");
```

### useEffect Initialization Sequence

**Order of Execution** on app mount:

1. **Initial data fetch** (runs once):
   ```jsx
   useEffect(() => {
     getDoctorsData();
     getChatbotContext();
     fetchDrugs();
   }, []);
   ```

2. **Admin token change** (when token updates):
   ```jsx
   useEffect(() => {
     if (token) {
       loadUserProfileData();
     }
   }, [token]);
   ```

3. **User token change** (when userToken updates):
   ```jsx
   useEffect(() => {
     if (userToken) {
       loadUserProfile();
     }
   }, [userToken]);
   ```

4. **Cart fetch** (when user/token loads):
   ```jsx
   useEffect(() => {
     if (user && userToken) {
       fetchCart();
     }
   }, [user, userToken]);
   ```

---

## API Integration

### Axios Configuration

Axios is configured with base URL and interceptors in `src/context/AppContext.jsx`:

```jsx
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  withCredentials: false
});
```

### API Request Patterns

**With Admin Token**:
```jsx
const { data } = await axios.get("/api/doctor/list", {
  headers: { token: adminToken }
});
```

**With User/Bearer Token**:
```jsx
const { data } = await axios.get("/api/user/profile", {
  headers: { Authorization: `Bearer ${userToken}` }
});
```

**POST Request**:
```jsx
const { data } = await axios.post("/api/order/place", orderData, {
  headers: { Authorization: `Bearer ${userToken}` }
});
```

**File Upload**:
```jsx
const formData = new FormData();
formData.append("file", file);
formData.append("userId", userId);

const { data } = await axios.post("/api/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${userToken}`
  }
});
```

### Common API Endpoints

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/doctor/list` | GET | Admin | Get all doctors |
| `/api/doctor/:id` | GET | None | Get doctor details |
| `/api/lab/list` | GET | Admin | Get all labs |
| `/api/drug/list` | GET | None | Get all drugs |
| `/api/user/login` | POST | None | User login |
| `/api/user/register` | POST | None | User signup |
| `/api/user/profile` | GET | Bearer | Get user profile |
| `/api/user/update-profile` | POST | Bearer | Update profile |
| `/api/user/appointments` | GET | Admin | Get doctor appointments |
| `/api/user/book-appointment` | POST | Admin | Book doctor appointment |
| `/api/cart/get` | GET | Bearer | Get user's cart |
| `/api/cart/add` | POST | Bearer | Add to cart |
| `/api/cart/remove` | DELETE | Bearer | Remove from cart |
| `/api/order/place` | POST | Bearer | Create order |
| `/api/order/user` | GET | Bearer | Get user's orders |
| `/api/address/add` | POST | Bearer | Add delivery address |
| `/api/address/get` | GET | Bearer | Get user's addresses |
| `/api/payment/stripe-session` | POST | Bearer | Create Stripe session |

### Error Handling Pattern

```jsx
try {
  const { data } = await axios.get("/api/endpoint", {
    headers: { Authorization: `Bearer ${userToken}` }
  });

  if (data.success) {
    // Handle success
    setState(data.result);
  } else {
    // Backend returned error
    toast.error(data.message);
  }
} catch (error) {
  // Network or other errors
  console.error("API Error:", error);
  toast.error(error.response?.data?.message || "An error occurred");
}
```

### Response Format (Expected)

```json
{
  "success": true,
  "message": "Operation successful",
  "result": {
    "data": "..."
  }
}
```

---

## Component System

### Component Types

**Layout Components** (Page containers):
- `Navbar` - Top navigation
- `Footer` - Page footer
- `Sidebar` - Side navigation

**Feature Components** (Specific functionality):
- `Chatbot` - AI chat interface
- `DoctorAppointment` - Appointment booking
- `Cart` - Shopping cart

**Reusable Components** (UI building blocks):
- `TopDoctors` - Doctor showcase
- `DoctorSpecialty` - Specialty grid
- `ProductCard` - Drug product card
- `VerifyEmail` - Email verification form
- `ResetPassword` - Password reset form

### Component Best Practices

1. **Use Context for Global State**:
```jsx
const { user, doctors } = useContext(AppContext);
```

2. **Handle Loading States**:
```jsx
if (loading) return <Spinner />;
if (error) return <ErrorMessage />;
return <Content />;
```

3. **Validate Props**:
```jsx
function ProductCard({ product }) {
  if (!product) return null;
  return <div>{product.name}</div>;
}
```

4. **Use SEO Tags**:
```jsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Helmet>
```

5. **Extract Complex Render Logic**:
```jsx
// ❌ Bad
return <div>{items.map(item => item.complex ? comp1 : comp2)}</div>

// ✅ Good
const renderItem = (item) => item.complex ? <Comp1 /> : <Comp2 />;
return <div>{items.map(renderItem)}</div>;
```

---

## Pages Documentation

Each page is fully documented in `src/pages/README.md`:

**Quick Links**:
- [Home.jsx](./src/pages/README.md#1-homejsx) - Landing page
- [Login.jsx](./src/pages/README.md#2-loginjsx) - Authentication
- [Doctors.jsx](./src/pages/README.md#3-doctorsjsx) - Doctor browser with filters
- [DoctorAppointment.jsx](./src/pages/README.md#4-doctorappointmentjsx) - Appointment booking
- [MyDoctorsAppointments.jsx](./src/pages/README.md#5-mydoctorsappointmentsjsx) - Appointment history
- [Cart.jsx](./src/pages/README.md#7-cartjsx) - Shopping cart with checkout
- [DrugDetails.jsx](./src/pages/README.md#8-drugdetailsjsx) - Product details
- [MyOrders.jsx](./src/pages/README.md#10-myordersjsx) - Order history
- [MyProfile.jsx](./src/pages/README.md#11-myprofilejsx) - User profile edit

**For Complete Page Documentation**: See [src/pages/README.md](./src/pages/README.md)

---

## Configuration Details

### Vite Configuration (vite.config.js)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5174 },
});
```

**Configuration Explanation**:
- **react plugin**: Enables React Fast Refresh (HMR)
- **tailwindcss plugin**: Integrates Tailwind into build process
- **server.port**: Development server runs on port 5174

### Tailwind CSS Configuration

The project uses Tailwind CSS for styling. Key features:

- **Utility-first CSS**: Build with predefined classes
- **Color Scheme**: Primary colors, custom spacing
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Can be extended

**Custom Colors** (add to `tailwind.config.js`):
```javascript
theme: {
  extend: {
    colors: {
      primary: '#00BCD4',      // Cyan
      secondary: '#009688',    // Teal
      accent: '#FF6F00',       // Orange
    },
    spacing: {
      'xs': '0.25rem',
      'sm': '0.5rem',
      'md': '1rem',
      'lg': '1.5rem',
      'xl': '2rem',
    }
  }
}
```

### ESLint Configuration

Enforces code quality and consistency:

```bash
npm run lint
```

**Rules Check**:
- Variable naming conventions
- Unused imports
- Code formatting
- React best practices

### PostCSS Configuration

Processes CSS for cross-browser compatibility:

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

## Development Guidelines

### Code Style

1. **Naming Conventions**:
   - Components: `PascalCase` (e.g., `MyComponent.jsx`)
   - Files: Same as component name
   - Variables/Functions: `camelCase` (e.g., `getUserData`)
   - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)

2. **Import Organization**:
```jsx
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal components
import Navbar from '../components/Navbar';

// 3. Context
import { AppContext } from '../context/AppContext';

// 4. Styles
import './MyComponent.css';
```

3. **Component Structure**:
```jsx
// Imports
import { ... } from '...';

// Component
function MyComponent() {
  // State
  const [state, setState] = useState();
  
  // Context
  const { data } = useContext(AppContext);
  
  // Computed values
  const computed = data.map(...);
  
  // Effects
  useEffect(() => { ... }, []);
  
  // Handlers
  const handleClick = () => { ... };
  
  // Render
  return <div>...</div>;
}

// Export
export default MyComponent;
```

4. **Error Handling**:
```jsx
// ✅ Always handle errors
try {
  const res = await api.call();
} catch (error) {
  console.error('Error:', error);
  toast.error(error.message);
}
```

### Debugging

**React DevTools**:
- Install React Developer Tools browser extension
- Inspect component props and state
- Check component tree

**Network Tab**:
- Open DevTools → Network tab
- Monitor API calls
- Check request/response headers
- Verify status codes

**Console**:
- Log important values: `console.log(value)`
- Check for errors and warnings
- Use debugger: `debugger;` statement

**Useful Logging**:
```jsx
// Log component mount/unmount
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);

// Log state changes
useEffect(() => {
  console.log('User changed:', user);
}, [user]);

// Log API calls
console.log('Calling API:', endpoint, data);
```

### Performance Optimization

1. **Memoization**:
```jsx
import { memo } from 'react';

const MyComponent = memo(function Component(props) {
  return <div>{props.value}</div>;
});
```

2. **useCallback**:
```jsx
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);
```

3. **useMemo**:
```jsx
const computed = useMemo(() => {
  return expensiveComputation(data);
}, [data]);
```

4. **Code Splitting**:
```jsx
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

### Testing Considerations

When developing features, consider:

1. **Happy Path**: Main use case works
2. **Error Cases**: Handle API failures
3. **Edge Cases**: Empty states, null values
4. **Loading States**: Show spinners during fetch
5. **Validation**: Check user input before submission

---

## Troubleshooting

### Common Issues

**Issue: Port 5174 already in use**

```bash
# Solution: Kill process on port 5174
# On Windows:
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5174
kill -9 <PID>

# Or use different port in vite.config.js
server: { port: 5175 }
```

**Issue: Environment variables not loading**

```bash
# Ensure .env file is in client/ directory
# Ensure variables start with VITE_
# Restart dev server after changing .env
npm run dev
```

**Issue: API calls returning 404**

```bash
# Check backend server is running
# Verify VITE_BACKEND_URL in .env
# Check API endpoint path is correct
# Use browser DevTools → Network tab to inspect
```

**Issue: Cart not persisting**

```javascript
// Verify localStorage is enabled
// Check browser console for errors
console.log(localStorage.getItem('token'));

// Check cart fetching in useEffect
// Ensure API endpoint returns cart data
```

**Issue: Google OAuth not working**

```bash
# 1. Verify VITE_GOOGLE_CLIENT_ID in .env
# 2. Check authorized redirect URIs in Google Cloud Console
# 3. Ensure domain is whitelisted
# 4. Check browser console for OAuth errors
```

**Issue: Images not loading**

```bash
# Verify image URLs are correct
# Check CORS headers from backend
# Ensure image hosting service is accessible
# Use absolute URLs instead of relative paths
```

**Issue: Styles not applying**

```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Rebuild: npm run build
# Check class names match Tailwind conventions
# Verify tailwind.config.js is correct
```

**Issue: Build failing**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors (if using TS)
npx tsc --noEmit

# Look for console errors in npm run build output
```

---

## Deployment

### Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

### Deploy to Vercel

1. **Connect Repository**:
   - Push code to GitHub
   - Connect repo to Vercel

2. **Configure Build**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: Add from `.env`

3. **Deploy**:
   - Vercel auto-deploys on push to main branch

### Deploy to Other Platforms

**Netlify**:
```bash
npm run build
# Deploy dist/ folder to Netlify
```

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "preview"]
```

---

## Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Formik & Yup](https://formik.org)
- [Axios Documentation](https://axios-http.com)
- [Framer Motion](https://www.framer.com/motion/)

---

## Summary

**Roshetta Client** is a comprehensive healthcare platform frontend providing:

✅ Doctor appointment booking and management  
✅ Lab service integration  
✅ Pharmacy e-commerce with shopping cart  
✅ User authentication with OAuth support  
✅ Secure payment processing (Stripe & COD)  
✅ User profile and history management  
✅ AI chatbot integration  
✅ Multi-language support framework  
✅ Responsive, mobile-first design  
✅ Production-ready architecture  

For detailed information on specific pages, components, or context, refer to the documentation files in their respective folders.

**Start developing**: `npm run dev`  
**Build for production**: `npm run build`  
**Lint code**: `npm run lint`
