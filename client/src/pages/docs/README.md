# Client Pages Documentation

Complete reference guide for all React page components in the Roshetta healthcare platform client application. Each page is documented with atomic-level detail, state management, functions, dependencies, and code examples.

## Quick Navigation

- [Overview Table](#overview-table)
- [Page-by-Page Documentation](#page-by-page-documentation)
  - [Authentication Pages](#authentication-pages)
  - [Healthcare Pages](#healthcare-pages)
  - [E-Commerce Pages](#e-commerce-pages)
  - [User Management Pages](#user-management-pages)
  - [Information Pages](#information-pages)
  - [Payment Pages](#payment-pages)
  - [Stub/Empty Pages](#stub-empty-pages)
- [Common Patterns](#common-patterns)
- [Routing Structure](#routing-structure)
- [Context Integration](#context-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview Table

| Page Name | Route | Purpose | State | Async | Authentication |
|---|---|---|---|---|---|
| **Home** | `/` | Landing page with doctors featured | None | No | Not Required |
| **Login** | `/login` | Sign up and login with medical info | Form state, UI toggles | Yes (Auth API) | N/A (Auth page) |
| **Doctors** | `/doctors/:specialty?` | Browse doctors with filters | Filters, filtered list | No (uses context) | Not Required |
| **DoctorAppointment** | `/appointment/:docId` | Book doctor appointment | Doc info, time slots | Yes (Booking API) | Required |
| **MyDoctorsAppointments** | `/my-appointments` | View user's doctor appointments | Appointments list | Yes (Fetch API) | Required |
| **LabAppointment** | `/lab-appointment/:labId` | Book lab appointment | Empty stub | N/A | N/A |
| **MyLabsAppointments** | `/my-lab-appointments` | View user's lab appointments | Empty stub | N/A | N/A |
| **Cart** | `/cart` | Shopping cart with checkout | Cart items, address, payment | Yes (Multiple API calls) | Required (for checkout) |
| **AddAddress** | `/add-address` | Add delivery address | Address form state | Yes (Add API) | Required |
| **Drugs** | `/drugs` | Browse all drugs | Empty stub | N/A | Not Required |
| **AllDrugs** | `/all-drugs` | All drugs list | Empty stub | N/A | Not Required |
| **DrugCategory** | `/category/:category` | Browse drugs by category | Filtered products | No (uses context) | Not Required |
| **DrugDetails** | `/product/:id` | Drug details with related products | Product, thumbnail, related | No (uses context) | Not Required |
| **DrugOrder** | `/drug-order` | Place drug order | Empty stub | N/A | N/A |
| **MyOrders** | `/my-orders` | View user's drug orders | Orders list | Yes (Fetch API) | Required |
| **PaymentProcessing** | `/payment-processing` | Payment in progress | None (timer) | No | N/A |
| **PaymentSuccess** | `/payment-success` | Payment confirmation | Payment details | No | N/A |
| **PaymentCancel** | `/payment-cancel` | Payment failure | Error details | No | N/A |
| **MyProfile** | `/my-profile` | Edit user profile | User data, edit mode, image | Yes (Update API) | Required |
| **About** | `/about` | Company information | Active section, scroll | No | Not Required |
| **Contact** | `/contact` | Contact form | Form data | No | Not Required |
| **PrivacyPolicy** | `/privacy` | Privacy policy | Expanded sections, scroll | No | Not Required |
| **Labs** | `/labs` | Browse labs | Empty stub | N/A | Not Required |

---

## Page-by-Page Documentation

---

## Authentication Pages

### 1. Home.jsx

**Purpose**: Landing page displaying featured doctors and medical specialties

**Route**: `/`

**Type**: Public page (no authentication required)

**Full Code**:
```jsx
import React from "react";
import { Helmet } from "react-helmet";
import TopDoctors from "../components/TopDoctors";
import Header from "../components/Header";
import LabHeader from "../components/LabHeader";
import DoctorSpecialty from "../components/DoctorSpecialty";
import LabSpecialty from "../components/LabSpecialty";

const Home = () => {
  return (
    <div>
      <Header/>
      <DoctorSpecialty/>
      <TopDoctors/>
    </div>
  );
};

export default Home;
```

**Component Breakdown**:
- **Helmet**: SEO meta tags (currently not configured but imported)
- **Header**: Hero banner with CTA buttons
- **DoctorSpecialty**: Grid of medical specialties
- **TopDoctors**: Showcase of 8 featured doctors

**Dependencies**:
- `react-helmet` - SEO metadata
- `TopDoctors` component
- `Header` component
- `DoctorSpecialty` component

**Context Used**: None (displays static components)

**State Management**: None (purely presentational)

**Design Pattern**: Composable layout with hero section

---

### 2. Login.jsx

**Purpose**: Authentication page with signup and login forms, plus medical history collection

**Route**: `/login`

**Type**: Public page (authentication gate)

**File Size**: ~500+ lines (see full details below)

**Key Features**:
- Sign Up form with medical information
- Login form
- Password visibility toggle
- Forgot password functionality
- Multiple Formik form schemas with Yup validation
- Google OAuth integration
- Medical information collection (drugs, diseases, surgeries, family history)

**State Variables**:
```jsx
const [state, setState] = useState("Sign Up");           // "Sign Up" or "Login"
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [forgotPassword, setForgotPassword] = useState(false);
const [emailForReset, setEmailForReset] = useState("");
```

**Validation Schemas** (using Yup):

```jsx
// Login Schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Sign Up Schema - Core fields
const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10,}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  birthDate: Yup.date().required("Birth date is required"),
  bloodType: Yup.string()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid blood type")
    .required("Blood type is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .required("Gender is required"),
  medicalInsurance: Yup.string().required("Medical insurance is required"),
  allergy: Yup.string(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Confirm password is required"),
});

// Medications Schema (nested array)
const drugSchema = Yup.object().shape({
  name: Yup.string().required("Drug name is required"),
  dosage: Yup.string(),
  frequency: Yup.string(),
  status: Yup.string().oneOf(["Active", "Discontinued"]).required(),
});

// Disease/Conditions Schema (nested array)
const diseaseSchema = Yup.object().shape({
  name: Yup.string().required("Disease name is required"),
  diagnosedDate: Yup.date(),
  status: Yup.string().oneOf(["Active", "Recovered", "Chronic"]).required(),
  notes: Yup.string(),
});

// Surgery History Schema (nested array)
const surgerySchema = Yup.object().shape({
  name: Yup.string().required("Surgery name is required"),
  date: Yup.date(),
  status: Yup.string().oneOf(["Completed", "Scheduled"]).required(),
  notes: Yup.string(),
});

// Family History Schema (nested array)
const familyHistorySchema = Yup.object().shape({
  relative: Yup.string().required("Relative type is required"),
  condition: Yup.string().required("Condition name is required"),
  diagnosedDate: Yup.date(),
  notes: Yup.string(),
});
```

**Context Used**:
```jsx
const { backendUrl, token, setToken } = useContext(AppContext);
```

**Dependencies**:
- `react-router-dom` - Navigation (useNavigate)
- `react-toastify` - Toast notifications
- `@react-oauth/google` - Google OAuth login
- `formik` - Form state management
- `yup` - Form validation
- `react-icons` - UI icons
- Multiple icon libraries (FaUser, FaLock, FaEnvelope, etc.)

**Key Functions**:

```jsx
// State toggle between Sign Up and Login
toggleState = () => setState(state === "Sign Up" ? "Login" : "Sign Up");

// Password visibility toggle
togglePasswordVisibility = () => setShowPassword(!showPassword);

// Handle sign up submission
onSubmitSignUp = async (values) => {
  // POST /api/auth/register with medical information
  // Save token to context and localStorage
  // Navigate to home page
};

// Handle login submission
onSubmitLogin = async (values) => {
  // POST /api/auth/login
  // Save token and user data
  // Navigate to appropriate page
};

// Handle forgot password
onSubmitForgotPassword = async (values) => {
  // POST /api/auth/forgot-password
  // Send reset email
};

// Google OAuth callback
onGoogleSuccess = (credentialResponse) => {
  // Decode JWT and authenticate
  // Save token
  // Navigate to home
};
```

**UI Structure**:
- Conditional rendering based on `state` (Sign Up vs Login vs Forgot Password)
- Tab-style navigation between Sign Up and Login
- Logo displayed at top
- Form with all input fields
- Medical information sections using FieldArray (for nested arrays)
- Google OAuth button
- Password visibility toggles

**Form Data Structure**:
```jsx
{
  // Basic Info
  name: "",
  email: "",
  mobile: "",
  birthDate: "",
  bloodType: "",
  gender: "",
  medicalInsurance: "",
  allergy: "",
  password: "",
  confirmPassword: "",
  
  // Medical History (nested arrays)
  drugs: [
    { name: "Aspirin", dosage: "500mg", frequency: "Daily", status: "Active" }
  ],
  diseases: [
    { name: "Diabetes", diagnosedDate: "2020-01-01", status: "Active", notes: "Type 2" }
  ],
  surgeries: [
    { name: "Appendectomy", date: "2019-01-01", status: "Completed", notes: "" }
  ],
  familyHistory: [
    { relative: "Father", condition: "Heart Disease", diagnosedDate: "2015-01-01", notes: "" }
  ]
}
```

---

## Healthcare Pages

### 3. Doctors.jsx

**Purpose**: Browse doctors with filtering by specialty, experience, availability, fees, and rating

**Route**: `/doctors/:specialty?`

**Parameters**:
- `specialty` (optional): URL parameter for specialty filtering (e.g., "general-physician", "gynecologist")

**Type**: Public page (no authentication required)

**State Variables**:
```jsx
const [filterDoc, setFilterDoc] = useState([]);              // Filtered doctors list
const [showFilter, setShowFilter] = useState(false);         // Show/hide filters UI
const [filters, setFilters] = useState({
  specialty: "",                                             // Selected specialty
  experience: "",                                            // Experience range
  availability: "",                                          // "true" or "false"
  minFees: "",                                               // Minimum fee amount
  maxFees: "",                                               // Maximum fee amount
  minRating: "",                                             // Minimum rating
});
```

**Filter Options**:
```jsx
const specialties = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Bones",
  "Surgery",
  "ENT",
];

const experienceOptions = [
  { label: "Any", value: "" },
  { label: "0-5 years", value: "0-5" },
  { label: "5-10 years", value: "5-10" },
  { label: "10+ years", value: "10+" },
];

const ratingOptions = [
  { label: "Any", value: "" },
  { label: "3+ Stars", value: "3" },
  { label: "4+ Stars", value: "4" },
  { label: "5 Stars", value: "5" },
];

// URL to display name mapping
const urlSpecialtyMap = {
  "general-physician": "General Physician",
  gynecologist: "Gynecologist",
  dermatologist: "Dermatologist",
  pediatrician: "Pediatrician",
  bones: "Bones",
  surgery: "Surgery",
  ent: "ENT",
};
```

**Core Function: applyFilter()**:
```jsx
const applyFilter = () => {
  let filtered = doctors;  // Start with all doctors from context

  // 1. Filter by specialty (from URL or filter state)
  if (filters.specialty || specialty) {
    const normalizedSpecialty =
      urlSpecialtyMap[filters.specialty.toLowerCase()] ||
      filters.specialty ||
      urlSpecialtyMap[specialty?.toLowerCase()] ||
      specialty;
    filtered = filtered.filter(
      (doc) => doc.specialty === normalizedSpecialty
    );
  }

  // 2. Filter by experience range
  if (filters.experience) {
    filtered = filtered.filter((doc) => {
      const years = parseInt(doc.experience) || 0;
      if (filters.experience === "0-5") return years <= 5;
      if (filters.experience === "5-10") return years > 5 && years <= 10;
      if (filters.experience === "10+") return years > 10;
      return true;
    });
  }

  // 3. Filter by availability status
  if (filters.availability !== "") {
    filtered = filtered.filter(
      (doc) => doc.available === (filters.availability === "true")
    );
  }

  // 4. Filter by minimum fees
  if (filters.minFees) {
    filtered = filtered.filter(
      (doc) => doc.fees >= parseFloat(filters.minFees)
    );
  }

  // 5. Filter by maximum fees
  if (filters.maxFees) {
    filtered = filtered.filter(
      (doc) => doc.fees <= parseFloat(filters.maxFees)
    );
  }

  // 6. Filter by minimum rating
  if (filters.minRating) {
    filtered = filtered.filter((doc) => {
      const rating = parseFloat(doc.rating) || 0;
      return rating >= parseFloat(filters.minRating);
    });
  }

  setFilterDoc(filtered);
};
```

**Context Used**:
```jsx
const { doctors } = useContext(AppContext);  // All available doctors
```

**useEffect Hooks**:
```jsx
// Apply filters when doctors data changes or filters update
useEffect(() => {
  applyFilter();
}, [doctors, filters, specialty]);
```

**UI Flow**:
1. Display filter toggle button (mobile)
2. Show/hide filter sidebar based on `showFilter`
3. Display filtered doctors in grid layout
4. Each doctor card clickable for detailed view/appointment booking

---

### 4. DoctorAppointment.jsx

**Purpose**: Book appointment with doctor, select time slot from available times

**Route**: `/appointment/:docId`

**Parameters**:
- `docId`: Doctor ID from URL

**Type**: Protected page (requires authentication)

**State Variables**:
```jsx
const [docInfo, setDocInfo] = useState(null);              // Selected doctor's info
const [docSlots, setDocSlots] = useState([]);              // 7 days of available time slots
const [slotIndex, setSlotIndex] = useState(0);             // Selected day index (0-6)
const [slotTime, setSlotTime] = useState("");              // Selected time (e.g., "10:30 AM")
```

**Days of Week**:
```jsx
const daysOfWeek = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
```

**Key Function: generateTimeSlots()**:

The page generates time slots for the next 7 days with 30-minute intervals:

```jsx
useEffect(() => {
  if (!docInfo) return;

  setDocSlots([]);
  const today = new Date();

  // Generate 7 days of slots
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);  // Slots until 9 PM

    // For today, start from next hour; for future days, start at 10 AM
    if (i === 0) {
      const nextHour = Math.max(currentDate.getHours() + 1, 10);
      currentDate.setHours(nextHour);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10, 0, 0, 0);
    }

    let timeSlots = [];

    // Generate 30-minute slots
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slotDate = day + "_" + month + "_" + year;  // Format: "15_3_2025"
      const slotTime = formattedTime;

      // Check if slot already booked by another user
      const slotsBooked = docInfo.slotsBooked || {};
      const isSlotAvailable = !(
        slotsBooked[slotDate] && slotsBooked[slotDate].includes(slotTime)
      );

      if (isSlotAvailable) {
        timeSlots.push({
          dateTime: new Date(currentDate),  // Store DateTime object
          available: true,
        });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    // Only add day if it has available slots
    if (timeSlots.length > 0) {
      setDocSlots(prev => [...prev, timeSlots]);
    }
  }
}, [docInfo]);
```

**Slot Data Structure**:
```jsx
// docSlots is a 2D array:
// docSlots[0] = Array of slots for Day 1
// docSlots[0][0] = { dateTime: Date, available: true }
// docSlots[1] = Array of slots for Day 2, etc.

docSlots = [
  [  // Day 0 (Today)
    { dateTime: new Date(2025, 2, 15, 15, 0), available: true },
    { dateTime: new Date(2025, 2, 15, 15, 30), available: true },
    { dateTime: new Date(2025, 2, 15, 16, 0), available: true },
  ],
  [  // Day 1 (Tomorrow)
    { dateTime: new Date(2025, 2, 16, 10, 0), available: true },
    { dateTime: new Date(2025, 2, 16, 10, 30), available: true },
    // ... more slots
  ],
  // ... days 2-6
]
```

**Booking Function: bookAppointment()**:
```jsx
const bookAppointment = async () => {
  // Validation
  if (!token) {
    toast.warn("Login to book appointment");
    return navigate("/login");
  }
  if (!slotTime) {
    toast.warn("Please select a time slot");
    return;
  }

  try {
    // Extract date from selected slot
    const date = docSlots[slotIndex][0].dateTime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Format date as "15_3_2025"
    const slotDate = day + "_" + month + "_" + year;

    // API call
    const { data } = await axios.post(
      backendUrl + "/api/user/book-appointment",
      { 
        docId,                    // Doctor ID from URL
        slotDate,                 // Date in format "day_month_year"
        slotTime                  // Time in format "HH:MM AM/PM"
      },
      { headers: { token } }      // Admin token for authentication
    );

    if (data.success) {
      toast.success(data.message);
      getDoctorsData();  // Refresh doctors data in context
      navigate("/my-appointments");  // Redirect to appointments page
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
```

**Context Used**:
```jsx
const { 
  docId,                         // From URL params
  doctors,                       // All doctors from context
  currencySymbol,                // Currency display (e.g., "EGP")
  backendUrl,                    // API base URL
  token,                         // Admin authentication token
  getDoctorsData                 // Function to refresh doctors
} = useContext(AppContext);
```

**Dependencies**:
- `react-router-dom` (useParams, useNavigate)
- `react-toastify` (toast notifications)
- `axios` (API calls)
- `uuid` (v4) - for IDs
- `RelatedDoctors` component

**UI Sections**:
1. Doctor info header with image, name, specialty, rating
2. Day selector (SAT, SUN, MON, etc.)
3. Time slots grid for selected day
4. "Book Appointment" button
5. Related doctors section

---

### 5. MyDoctorsAppointments.jsx

**Purpose**: Display list of user's doctor appointments with status, dates, and cancel/reschedule options

**Route**: `/my-appointments`

**Type**: Protected page (requires authentication)

**State Variables**:
```jsx
const [appointments, setAppointments] = useState([]);       // List of doctor appointments
const [loading, setLoading] = useState(true);               // Initial loading state
const [refreshing, setRefreshing] = useState(false);        // Refresh indicator
```

**Key Hooks**:

```jsx
// Helper function to format slot date
const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split("_");  // "15_3_2025" → ["15", "3", "2025"]
  return (
    dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  );  // "15 MAR 2025"
};

const months = [
  "",
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
```

**Main Function: getUserAppointments()**:
```jsx
const getUserAppointments = async (showLoader = false) => {
  try {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    // API call with admin token
    const { data } = await axios.get(
      backendUrl + "/api/user/appointments",
      {
        headers: { token }
      }
    );

    if (data.success) {
      console.log("Appointments loaded:", data.appointments.length);
      setAppointments(data.appointments.reverse());  // Show newest first

      // Check for recently paid appointments
      const recentlyPaid = data.appointments.filter(
        (apt) => apt.payment && apt.paymentStatus === "completed"
      );

      if (recentlyPaid.length > 0) {
        console.log("Recently paid appointments:", recentlyPaid.length);
      }
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    toast.error(error.message);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};
```

**Payment Success Handling**:
```jsx
// Detect payment success from URL parameters
useEffect(() => {
  const sessionId = searchParams.get("session_id");
  const appointmentId = searchParams.get("appointment_id");

  if (sessionId && appointmentId) {
    console.log("Payment success detected, refreshing appointments...");
    toast.success("Payment successful! Your appointment is confirmed.");

    // Clear URL params
    navigate("/my-appointments", { replace: true });

    // Multiple refresh attempts to ensure webhook processing
    const refreshAttempts = [1000, 3000, 5000, 8000];  // 1s, 3s, 5s, 8s

    refreshAttempts.forEach((delay, index) => {
      setTimeout(() => {
        console.log(`Refresh attempt ${index + 1}`);
        getUserAppointments();
      }, delay);
    });
  }
}, [searchParams, navigate]);
```

**Auto-Refresh Logic**:
```jsx
// Auto-refresh appointments at intervals if there are pending payments
useEffect(() => {
  if (appointments.length === 0) return;

  const pendingPayments = appointments.filter(apt => apt.paymentStatus === "pending");
  
  if (pendingPayments.length > 0) {
    // Refresh every 30 seconds while there are pending payments
    const interval = setInterval(() => {
      getUserAppointments();
    }, 30000);

    return () => clearInterval(interval);
  }
}, [appointments]);
```

**Context Used**:
```jsx
const { 
  backendUrl,
  token,
  getDoctorsData  // Refresh doctors data
} = useContext(AppContext);
```

**Appointment Data Structure**:
```jsx
{
  _id: "appointmentId123",
  userId: "userIdXyz",
  docId: "doctorId456",
  slotDate: "15_3_2025",           // Date in custom format
  slotTime: "10:30 AM",            // Time
  cancelled: false,                // Cancellation status
  isCompleted: false,              // Completion status
  payment: true,                   // Whether payment required
  paymentStatus: "completed",      // "pending", "completed", "failed"
  sessionId: "stripe_session_123", // Stripe session ID
  createdAt: "2025-03-15T10:00:00Z"
}
```

**UI Features**:
- Loading state with spinner
- Appointments list sorted by newest first
- Status badges (Completed, Cancelled, Pending)
- Appointment details with doctor info, date, time
- Cancel appointment button (if cancellable)
- Reschedule button
- Payment retry button (if payment pending)

---

### 6. LabAppointment.jsx

**Purpose**: Book appointment with lab (stub/not implemented)

**Route**: `/lab-appointment/:labId`

**Status**: Empty placeholder component

**Current Code**:
```jsx
import React from 'react'

const LabAppointment = () => {
  return (
    <div>
    </div>
  )
}

export default LabAppointment
```

**Implementation Notes**: Planned to mirror DoctorAppointment.jsx but for lab services

---

## E-Commerce Pages

### 7. Cart.jsx

**Purpose**: Shopping cart with product listing, quantity adjustment, address management, and checkout

**Route**: `/cart`

**Type**: Semi-protected (can view cart without auth, but checkout requires auth)

**State Variables**:
```jsx
const [cartArray, setCartArray] = useState([]);                 // Array of cart items with details
const [cartAddresses, setAddresses] = useState([]);             // User's saved addresses
const [showAddress, setShowAddress] = useState(false);          // Show address selection
const [selectedAddress, setSelectedAddress] = useState(null);   // Currently selected address
const [paymentOption, setPaymentOption] = useState("COD");      // Payment method: "COD" or "Stripe"
const [isLoading, setIsLoading] = useState(false);              // Checkout loading state
```

**Helper Function: getCart()**:
```jsx
const getCart = () => {
  let tempArray = [];
  
  // cartItems is { drugId: quantity }
  for (const key in cartItems) {
    // Find drug details from drugs array
    const drug = drugs.find((item) => item._id === key);
    
    if (drug) {
      drug.quantity = cartItems[key];  // Add quantity to drug object
      tempArray.push(drug);
    }
  }
  
  setCartArray(tempArray);  // Update display array
};
```

**Fetch User Addresses**:
```jsx
const getUserAddress = async () => {
  try {
    if (!userToken || !user) return;

    const { data } = await axios.get("/api/address/get", {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    
    if (data.success) {
      setAddresses(data.addresses);
      if (data.addresses.length > 0) {
        setSelectedAddress(data.addresses[0]);  // Select first by default
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    toast.error("Failed to fetch addresses");
  }
};
```

**Shipping Fee Calculation**:
```jsx
const getShippingFee = () => {
  const stateFee = {
    Cairo: 50,
    Giza: 60,
    Alexandria: 70,
    PortSaid: 65,
    Suez: 65,
    Dakahlia: 40,
    Sharqia: 70,
    Qalyubia: 60,
    "Kafr El Sheikh": 40,
    Gharbia: 30,
    Monufia: 50,
    Beheira: 65,
    Ismailia: 65,
    Faiyum: 80,
    BeniSuef: 85,
    Minya: 90,
    Asyut: 95,
    Sohag: 100,
    Qena: 100,
    Aswan: 100,
    Luxor: 100,
    RedSea: 120,
    NewValley: 130,
    Matrouh: 120,
    NorthSinai: 150,
    SouthSinai: 140,
    Damietta: 75,
    Helwan: 60,
    October: 60,
  };
  
  return selectedAddress?.state ? stateFee[selectedAddress.state] || 50 : 50;
};

// Calculate amou
nts
const cartAmount = getCartAmount();        // Sum of (price × quantity)
const shipping = getShippingFee();         // State-based shipping fee
const tax = 0;                             // No tax currently
const totalAmountTaxShipping = cartAmount + shipping + tax;
```

**Place Order Function**:
```jsx
const placeOrder = async () => {
  // Validation checks
  if (!user || !userToken) {
    toast.error("Please log in to place an order");
    setShowUserLogin(true);
    return;
  }

  if (!selectedAddress) {
    toast.error("Please select a delivery address");
    return;
  }

  if (cartArray.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  // Prepare order data
  const orderData = {
    address: selectedAddress,
    items: cartArray,
    amount: totalAmountTaxShipping,
    paymentMethod: paymentOption,  // "COD" or "Stripe"
  };

  try {
    setIsLoading(true);

    if (paymentOption === "COD") {
      // Cash on delivery - create order directly
      const { data } = await axios.post(
        "/api/order/create",
        orderData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();  // Clear cart from context
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } else if (paymentOption === "Stripe") {
      // Stripe payment - create payment session
      const { data } = await axios.post(
        "/api/payment/stripe-session",
        orderData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (data.success && data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.sessionUrl;
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error(error.response?.data?.message || "Failed to place order");
  } finally {
    setIsLoading(false);
  }
};
```

**Context Used**:
```jsx
const {
  drugs,                   // All available drugs
  currency,                // Currency symbol
  cartItems,               // { drugId: quantity }
  removeFromCart,          // Remove item function
  updateCartItem,          // Update quantity function
  getCartAmount,           // Calculate total price
  getCartCount,            // Get total items count
  axios,                   // Axios instance with baseURL
  user,                    // Logged-in user object
  userToken,               // User/eCommerce token
  setCartItems,            // Set cart directly
  setShowUserLogin,        // Show login modal
} = useAppContext();
```

**useEffect Hooks**:
```jsx
// Build cart array when cartItems or drugs change
useEffect(() => {
  getCart();
}, [cartItems, drugs]);

// Fetch addresses when user logs in
useEffect(() => {
  if (user && userToken) {
    getUserAddress();
  }
}, [user, userToken]);
```

**UI Sections**:
1. Cart items list with quantity controls (+ / -)
2. Each item shows: image, name, price, quantity, total
3. Address selector (with option to add new address)
4. Payment method selector (COD vs Stripe)
5. Order summary: Subtotal + Shipping + Tax = Total
6. "Place Order" button

---

### 8. DrugDetails.jsx

**Purpose**: Display detailed information about a drug product with related products

**Route**: `/product/:id`

**Parameters**:
- `id`: Product/drug ID

**Type**: Public page

**State Variables**:
```jsx
const [relatedProducts, setRelatedProducts] = useState([]);   // Related drugs in same category
const [thumbnail, setThumbnail] = useState(null);             // Currently displayed image
```

**Context Used**:
```jsx
const {
  products,         // All drugs from backend
  navigate,         // React Router navigate
  currency,         // Currency symbol
  addToCart,        // Add to cart function
  lang              // Language setting (ar/en)
} = useAppContext();
```

**Find Product**:
```jsx
const { id } = useParams();
const product = products.find((item) => item._id === id);  // Get product by URL param
```

**Setup Related Products**:
```jsx
useEffect(() => {
  if (products.length > 0) {
    let productsCopy = products.slice();
    
    // Filter by same category
    productsCopy = productsCopy.filter(
      (item) => product.category === item.category
    );
    
    // Get first 5
    setRelatedProducts(productsCopy.slice(0, 5));
  }
}, [products]);
```

**Handle Image**:
```jsx
useEffect(() => {
  product?.image?.length
    ? setThumbnail(product.image[0])  // Set first image as thumbnail
    : setThumbnail(null);
}, [product]);
```

**SEO Metadata** (extensive):
```jsx
<Helmet>
  <title>
    {lang === "ar"
      ? `${product.name} | كاما فارما`
      : `${product.name} | Kamma-Pharma`}
  </title>
  <meta
    name="description"
    content={
      lang === "ar"
        ? `اكتشف ${product.name} في كاما فارما...`
        : `Discover ${product.name} at Kamma-Pharma...`
    }
  />
  {/* OpenGraph tags for social sharing */}
  <meta property="og:type" content="product" />
  <meta property="og:price:amount" content={product.offerPrice} />
  <meta property="og:price:currency" content={currency} />
  {/* Twitter card for tweets */}
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

**Product Data Structure**:
```jsx
{
  _id: "productId123",
  name: "Paracetamol 500mg",
  category: "Pain Relief",
  image: ["image1.jpg", "image2.jpg"],
  description: "...",
  price: 50,
  offerPrice: 35,
  rating: 4.5,
  reviews: 120,
  inStock: true,
  quantity: 100
}
```

**UI Features**:
- Product image gallery
- Product name, category, rating
- Price (original + offer)
- Product description
- Stock status
- "Add to Cart" button
- Related products section

---

### 9. DrugCategory.jsx

**Purpose**: Browse drugs filtered by category

**Route**: `/category/:category`

**Parameters**:
- `category`: Category slug from URL (e.g., "pain-relief", "antibiotics")

**Type**: Public page

**State Variables**: None (derived from props/context)

**Context Used**:
```jsx
const { products } = useAppContext();  // All drugs
```

**Extract Category from URL**:
```jsx
const { category } = useParams();

// Find category details from assets
const searchCategory = categories.find(
  (item) => item.path.toLowerCase() === category
);

// Filter products by category
const filteredProducts = products?.filter(
  (product) => product.category.toLowerCase() === category
);
```

**Categories Data Structure**:
```jsx
categories = [
  { text: "Pain Relief", path: "pain-relief" },
  { text: "Cold & Flu", path: "cold-flu" },
  { text: "Antibiotics", path: "antibiotics" },
  // ... more categories
]
```

**SEO Implementation**:
```jsx
<Helmet>
  <title>
    {searchCategory
      ? `${searchCategory.text} | Kamma-Pharma`
      : "Product Category | Kamma-Pharma"}
  </title>
  <meta name="robots" content="index, follow" />
  <link
    rel="canonical"
    href={`https://www.kamma-pharma.com/products/${category}`}
  />
</Helmet>
```

**UI Display**:
```jsx
return (
  <div>
    {/* Category header */}
    {searchCategory && (
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium">
          {searchCategory.text.toLocaleUpperCase()}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
    )}

    {/* Products grid or empty state */}
    {filteredProducts?.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">
          No Products Available Now.
        </p>
      </div>
    )}
  </div>
);
```

---

### 10. MyOrders.jsx

**Purpose**: Display user's drug order history with status, items, and order management options

**Route**: `/my-orders`

**Type**: Protected page (requires authentication)

**State Variables**:
```jsx
const [myOrders, setMyOrders] = useState([]);       // User's orders
const [loading, setLoading] = useState(true);       // Loading state
```

**Fetch Orders Function**:
```jsx
const fetchMyOrders = async () => {
  try {
    if (!userToken || !user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data } = await axios.get("/api/order/user", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (data.success) {
      setMyOrders(data.orders || []);
    } else {
      console.error("Failed to fetch orders:", data.message);
      toast.error(data.message || "Failed to fetch orders");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};
```

**Status Color Helper**:
```jsx
const getStatusColor = (status) => {
  const statusColors = {
    "Order Placed": "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-purple-100 text-purple-800",
    "Out for Delivery": "bg-orange-100 text-orange-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    "Payment Failed": "bg-red-100 text-red-800",
    "Pending Payment": "bg-gray-100 text-gray-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};
```

**Date Formatter**:
```jsx
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
```

**Order Management Functions**:
```jsx
// Track order status
const trackOrder = (orderId) => {
  toast.info(`Tracking feature coming soon for order ${orderId.slice(-8)}`);
};

// Reorder items from previous order
const reorder = (order) => {
  if (!order.items || order.items.length === 0) {
    toast.error("Cannot reorder - no items found");
    return;
  }

  // Add items back to cart
  toast.info("Reorder feature coming soon");
};
```

**useEffect Hooks**:
```jsx
// Fetch orders when component mounts or user changes
useEffect(() => {
  if (user && userToken) {
    fetchMyOrders();
  } else if (!loading) {
    navigate("/login");  // Redirect to login if not authenticated
  }
}, [user, userToken]);
```

**Context Used**:
```jsx
const { 
  currency,     // Currency symbol
  axios,        // Axios instance
  user,         // Logged-in user
  userToken     // User token
} = useAppContext();
```

**Order Data Structure**:
```jsx
{
  _id: "orderId123",
  userId: "userId456",
  items: [
    {
      _id: "productId789",
      name: "Aspirin 500mg",
      quantity: 2,
      price: 30,
      image: "image.jpg"
    }
  ],
  amount: 150,           // Total amount with shipping/tax
  address: { ... },      // Delivery address object
  status: "Delivered",   // Order status
  paymentMethod: "COD",  // "COD" or "Stripe"
  createdAt: "2025-03-15T10:00:00Z",
  updatedAt: "2025-03-18T14:30:00Z"
}
```

**UI Features**:
- Orders list with status badges
- Order ID, date, total amount
- Number of items in order
- Order status with color coding
- "Track Order" button
- "Reorder" button
- "View Details" button
- Empty state if no orders

---

## User Management Pages

### 11. MyProfile.jsx

**Purpose**: View and edit user profile information, medical history, and profile picture

**Route**: `/my-profile`

**Type**: Protected page (requires authentication)

**State Variables**:
```jsx
const [isEdit, setIsEdit] = useState(false);         // Toggle edit mode
const [image, setImage] = useState(null);            // New image file for upload
```

**Profile Update Function**:
```jsx
const updateUserProfileData = async () => {
  try {
    const formData = new FormData();
    
    // Basic info
    formData.append("userId", userData._id);
    formData.append("name", userData.name);
    formData.append("phone", userData.mobile);
    formData.append("address", JSON.stringify(userData.address));
    formData.append("gender", userData.gender);
    formData.append("birthDate", userData.birthDate);
    formData.append("medicalInsurance", userData.medicalInsurance);
    
    // Medical history (JSON stringified arrays)
    formData.append("allergy", JSON.stringify(userData.allergy || {}));

    // Image file if selected
    if (image) {
      formData.append("imageProfile", image);
    }

    const { data } = await axios.post(
      backendUrl + "/api/user/update-profile",
      formData,
      {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      await loadUserProfileData();  // Refresh profile
      setIsEdit(false);
      setImage(null);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Profile update error:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};
```

**Generate Avatar Initials**:
```jsx
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);  // First 2 letters
};
```

**Context Used**:
```jsx
const { 
  userData,              // Current user profile data
  setUserData,           // Update user data
  token,                 // Admin token
  backendUrl,            // API URL
  loadUserProfileData    // Refresh profile function
} = useContext(AppContext);
```

**User Data Structure**:
```jsx
{
  _id: "userId123",
  name: "John Doe",
  email: "john@example.com",
  mobile: "01012345678",
  birthDate: "1990-01-15",
  gender: "Male",
  bloodType: "O+",
  medicalInsurance: "AXA",
  allergy: ["Penicillin", "Shellfish"],
  address: {
    street: "123 Main St",
    city: "Cairo",
    state: "Cairo",
    zipcode: "12345"
  },
  image: "profile-image.jpg"
}
```

**Helmet (SEO)**:
```jsx
<Helmet>
  <title>My Profile - Your Healthcare Platform</title>
  <meta name="description" content="Manage your profile..." />
  <link rel="canonical" href="https://yourhealthcare.com/my-profile" />
  <meta property="og:image" content={userData.image} />
</Helmet>
```

**UI Sections**:
1. Profile picture with upload option
2. Name, email, phone
3. Birth date, blood type, gender
4. Medical insurance, allergies
5. Address information
6. Edit/Save buttons
7. Medical history section

---

### 12. AddAddress.jsx

**Purpose**: Add new delivery address for orders

**Route**: `/add-address`

**Type**: Protected page

**State Variables**:
```jsx
const [address, setAddress] = useState({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "Egypt",
  phone: "",
  building: "",
  floor: "",
  apartment: "",
});
const [isLoading, setIsLoading] = useState(false);
```

**Reusable Input Component**:
```jsx
const InputField = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
  inputMode,
}) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    inputMode={inputMode}
    required
  />
);
```

**States List** (Egyptian states with shipping fees):
```jsx
const states = [
  { name: "Cairo", fee: 50 },
  { name: "Giza", fee: 60 },
  { name: "Alexandria", fee: 70 },
  // ... all 29 Egyptian states
  { name: "October", fee: 60 },
];
```

**Handle Input Change**:
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setAddress((prevAddress) => ({
    ...prevAddress,
    [name]: value,
  }));
};
```

**Form Submission**:
```jsx
const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!user || !userToken) {
    toast.error("Please log in to add an address");
    return;
  }

  // Validation of required fields
  if (
    !address.firstName ||
    !address.lastName ||
    !address.email ||
    !address.street ||
    !address.state ||
    !address.phone
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    setIsLoading(true);

    const { data } = await axios.post(
      "/api/address/add",
      address,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    if (data.success) {
      toast.success("Address added successfully");
      navigate("/cart");  // Go back to cart
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to add address");
  } finally {
    setIsLoading(false);
  }
};
```

**Context Used**:
```jsx
const { 
  axios,
  user,
  userToken 
} = useAppContext();
```

**Address Data Structure**:
```jsx
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  street: "123 Main Street",
  city: "Cairo",
  state: "Cairo",
  zipcode: "12345",
  country: "Egypt",
  phone: "01012345678",
  building: "Building A",
  floor: "2",
  apartment: "201"
}
```

---

## Payment Pages

### 13. PaymentProcessing.jsx

**Purpose**: Show loading state while payment is processing

**Route**: `/payment-processing`

**Type**: Public page (temporary state)

**State**: No local state

**Auto-Redirect**:
```jsx
useEffect(() => {
  // Redirect after 10 seconds if still processing
  const timer = setTimeout(() => {
    navigate("/my-appointments");
  }, 10000);

  return () => clearTimeout(timer);
}, [navigate]);
```

**UI**:
- Animated spinner
- "Processing Payment..." message
- "Check Appointments Manually" button
- Auto-redirect after 10 seconds

---

### 14. PaymentSuccess.jsx

**Purpose**: Confirm successful payment and appointment booking

**Route**: `/payment-success`

**Query Params**:
- `session_id`: Stripe session ID
- `payment_intent`: Stripe payment intent ID
- `appointment_id`: Appointment ID

**State Variables**:
```jsx
const [paymentDetails, setPaymentDetails] = useState(null);
```

**Extract Payment Details**:
```jsx
useEffect(() => {
  const sessionId = searchParams.get('session_id');
  const paymentIntentId = searchParams.get('payment_intent');
  const appointmentId = searchParams.get('appointment_id');
  
  setPaymentDetails({
    sessionId,
    paymentIntentId,
    appointmentId
  });

  // Auto redirect after 5 seconds
  const timer = setTimeout(() => {
    navigate('/my-appointments');
  }, 5000);

  return () => clearTimeout(timer);
}, [navigate, searchParams]);
```

**UI Sections**:
1. Success icon and "Payment Successful!" message
2. Appointment details (if available)
3. Transaction ID display
4. "View My Appointments" button
5. "Back to Home" button
6. Auto-redirect countdown

---

### 15. PaymentCancel.jsx

**Purpose**: Show payment failure and provide retry options

**Route**: `/payment-cancel`

**Query Params**:
- `error`: Error code
- `error_description`: Error message
- `appointment_id`: Appointment ID (if applicable)

**State Variables**:
```jsx
const [errorDetails, setErrorDetails] = useState(null);
```

**Extract Error Details**:
```jsx
useEffect(() => {
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const appointmentId = searchParams.get("appointment_id");

  setErrorDetails({
    error,
    errorDescription,
    appointmentId,
  });
}, [searchParams]);
```

**Retry Handler**:
```jsx
const handleRetryPayment = () => {
  if (errorDetails?.appointmentId) {
    // Navigate back to appointments where user can retry payment
    navigate("/my-appointments");
  } else {
    // Navigate to doctors to book a new appointment
    navigate("/doctors");
  }
};
```

**UI Sections**:
1. Error icon and "Payment Failed" message
2. Error details display
3. "Retry Payment" button
4. "View My Appointments" button
5. "Back to Home" button

---

## Information Pages

### 16. About.jsx

**Purpose**: Company information, mission, values, and team

**Route**: `/about`

**Type**: Public page

**State Variables**:
```jsx
const [scrollY, setScrollY] = useState(0);                   // Scroll position for parallax
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });  // Mouse position for animations
const [activeSection, setActiveSection] = useState(0);       // Currently active featured section
const [isAutoPlay, setIsAutoPlay] = useState(true);          // Auto-rotate sections
```

**Features**:
- Auto-rotating sections (Medical Care → Mental Health → Integrated Healthcare)
- Scroll-based animations
- Mouse movement parallax effects
- Responsive design

**Auto-Rotation**:
```jsx
useEffect(() => {
  if (isAutoPlay) {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);  // Rotate through 3 sections
    }, 4000);  // Every 4 seconds
    return () => clearInterval(interval);
  }
}, [isAutoPlay]);
```

**Healthcare Story Sections**:
```jsx
const healthcareStory = [
  {
    title: "Advanced Medical Care",
    subtitle: "Excellence in Physical Health",
    description: "Comprehensive medical services...",
    image: assets.medical_care,
    color: "from-blue-500 via-cyan-500 to-teal-500",
    icon: Stethoscope,
  },
  {
    title: "Mental Health Solutions",
    subtitle: "Integrated Psychological Wellness",
    description: "Leading mental health platform...",
    image: assets.mental_health,
    color: "from-purple-500 via-pink-500 to-rose-500",
    icon: Brain,
  },
  {
    title: "Integrated Healthcare Ecosystem",
    subtitle: "The Comprehensive Future of Healthcare",
    description: "...",
    image: assets.integration,
    color: "from-orange-500 via-yellow-500 to-amber-500",
    icon: Rocket,
  }
];
```

**Event Listeners**:
```jsx
useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
```

**UI Sections**:
- Hero banner with rotating sections
- Company values/features grid
- Team members showcase
- Mission statement
- Featured sections with images

---

### 17. Contact.jsx

**Purpose**: Contact form for user inquiries

**Route**: `/contact`

**Type**: Public page

**State Variables**:
```jsx
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  ageGroup: '',
  specialty: '',           // Medical specialty (if relevant)
  serviceType: '',         // Type of service interested in
  insurance: '',           // Insurance provider
  healthConcern: '',       // Health concern/inquiry
  consent: false           // Data consent checkbox
});
```

**Form Handlers**:
```jsx
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  alert('شكراً لك! سيتم التواصل معك قريباً من فريقنا الطبي');
  // In production: POST form data to backend
};
```

**Form Fields**:
- First name, Last name
- Email, Phone
- Age group selector
- Medical specialty dropdown
- Service type selector
- Insurance provider input
- Health concern text area
- Consent checkbox
- Submit button

---

### 18. PrivacyPolicy.jsx

**Purpose**: Display comprehensive privacy policy with expandable sections

**Route**: `/privacy`

**Type**: Public page

**State Variables**:
```jsx
const [expandedSection, setExpandedSection] = useState(null);  // Currently expanded section
const [acceptedTerms, setAcceptedTerms] = useState(false);    // User acceptance status
const [scrollProgress, setScrollProgress] = useState(0);      // Page scroll progress
const [showBackToTop, setShowBackToTop] = useState(false);    // Show back-to-top button
```

**Scroll Progress Tracking**:
```jsx
useEffect(() => {
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
    setShowBackToTop(window.scrollY > 300);  // Show button after 300px
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Section Toggle**:
```jsx
const toggleSection = (section) => {
  setExpandedSection(expandedSection === section ? null : section);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const downloadPolicy = () => {
  alert('Privacy Policy PDF download will begin shortly');
};
```

**Policy Sections** (Major Categories):
```jsx
const sections = [
  {
    id: 'introduction',
    title: 'Our Commitment to Your Privacy',
    icon: <Heart />,
    bgColor: 'bg-cyan-500',
    content: '...',
    highlights: [
      'Bank-level 256-bit encryption for all data',
      'Your data is never sold or shared for profit',
      'Complete control over your information',
      'Egyptian data protection law compliant'
    ]
  },
  {
    id: 'data-collection',
    title: 'Information We Collect',
    icon: <Database />,
    bgColor: 'bg-teal-600',
    content: '...',
    categories: [
      {
        title: 'Personal Information',
        items: ['Full name', 'Contact details', 'Age, gender, demographics', ...]
      },
      {
        title: 'Medical Information',
        items: ['Medical history', 'Medications', 'Allergies', ...]
      }
    ]
  },
  // ... more sections
];
```

**UI Features**:
- Scroll progress bar at top
- Expandable/collapsible sections
- Icon-based section identification
- Color-coded sections
- "Download Policy" button
- "Accept Terms" checkbox
- Back-to-top button (appears after scrolling)
- Table of contents

---

## Stub/Empty Pages

### 19. Drugs.jsx
```jsx
const Drugs = () => {
  return <div></div>;
};
```
**Status**: Empty stub awaiting implementation

### 20. AllDrugs.jsx
```jsx
// File exists but is empty
```
**Status**: Empty stub awaiting implementation

### 21. Labs.jsx
```jsx
const Labs = () => {
  return <div></div>;
};
```
**Status**: Empty stub awaiting implementation

### 22. DrugOrder.jsx
```jsx
const DrugOrder = () => {
  return <div></div>;
};
```
**Status**: Empty stub awaiting implementation

### 23. MyLabsAppointments.jsx
**Status**: Planned (similar to MyDoctorsAppointments but for labs)

---

## Common Patterns

### 1. Authentication Gate Pattern

```jsx
// Redirect to login if not authenticated
useEffect(() => {
  if (!user || !userToken) {
    navigate("/login");
  }
}, [user, userToken, navigate]);
```

### 2. Data Fetching Pattern

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/endpoint", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      
      if (data.success) {
        setData(data.result);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userToken]);
```

### 3. Form Submission Pattern

```jsx
const onSubmit = async (values) => {
  try {
    const { data } = await axios.post("/api/endpoint", values, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    if (data.success) {
      toast.success(data.message);
      navigate("/success-page");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
```

### 4. Conditional Rendering Pattern

```jsx
return (
  <>
    {loading ? (
      <LoadingSpinner />
    ) : !user ? (
      <LoginPrompt />
    ) : data.length === 0 ? (
      <EmptyState />
    ) : (
      <DataDisplay data={data} />
    )}
  </>
);
```

### 5. URL Parameter Handling Pattern

```jsx
const { paramName } = useParams();
const [searchParams] = useSearchParams();
const queryParam = searchParams.get("paramName");

// Use in filtering or data fetching
useEffect(() => {
  if (paramName) {
    // Filter or fetch based on paramName
  }
}, [paramName]);
```

---

## Routing Structure

### Public Routes (No Authentication)
- `/` - Home
- `/login` - Authentication
- `/doctors` - Browse doctors
- `/doctors/:specialty` - Doctors by specialty
- `/category/:category` - Drugs by category
- `/product/:id` - Drug details
- `/about` - About page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/payment-success` - Payment confirmation
- `/payment-cancel` - Payment failure
- `/payment-processing` - Payment in progress

### Protected Routes (Authentication Required)
- `/appointment/:docId` - Book doctor appointment
- `/my-appointments` - View doctor appointments
- `/lab-appointment/:labId` - Book lab appointment (planned)
- `/my-lab-appointments` - View lab appointments (planned)
- `/cart` - Shopping cart (partially protected - auth required for checkout)
- `/add-address` - Add delivery address
- `/my-orders` - View order history
- `/my-profile` - View/edit profile

### To-Be-Implemented Routes
- `/drugs` - Browse all drugs
- `/all-drugs` - All drugs listing
- `/drug-order` - Place drug order
- `/labs` - Browse labs

---

## Context Integration

### AppContext Methods Used Across Pages

```jsx
// Data Collections
doctors              // Array of doctors
drugs                // Array of drugs/products
cartItems            // { drugId: quantity } object
user                 // Logged-in user object
userData             // Admin user profile
currency             // Currency symbol
currencySymbol       // Currency display

// Authentication
token                // Admin token
userToken            // User/eCommerce token
setToken()           // Set admin token
setUserToken()       // Set user token

// Functions
addToCart()          // Add product to cart
removeFromCart()     // Remove from cart
updateCartItem()     // Update quantity
getCartCount()       // Get total items
getCartAmount()      // Get total price
getDoctorsData()     // Refresh doctors list
loadUserProfileData()// Refresh user profile

// Axios Instance
axios                // Configured axios with baseURL
backendUrl           // Backend API URL
```

---

## Best Practices

### 1. Always Check Authentication

```jsx
// ❌ Bad - might crash if not authenticated
const name = user.name;

// ✅ Good - safe access
const name = user ? user.name : 'Guest';
```

### 2. Handle Loading States

```jsx
// ❌ Bad - no loading indicator
return <div>{data}</div>;

// ✅ Good - show loader
if (loading) return <Spinner />;
return <div>{data}</div>;
```

### 3. Validate Form Input

```jsx
// ❌ Bad - no validation
<input value={email} onChange={handleChange} />

// ✅ Good - with validation schema (Formik + Yup)
const schema = Yup.object().shape({
  email: Yup.string().email().required()
});
```

### 4. Handle API Errors

```jsx
// ❌ Bad - no error handling
const data = await axios.get("/api/data");

// ✅ Good - with error handling
try {
  const { data } = await axios.get("/api/data");
  if (data.success) {
    // Handle success
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.message);
}
```

### 5. Use SEO Meta Tags

```jsx
// ✅ Use Helmet for every page
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
</Helmet>
```

---

## Troubleshooting

### Issue: Context values undefined

**Problem**: Getting "Cannot read property 'X' of undefined" when accessing context

**Solution**:
```jsx
// Wrap page in provider check
if (!user) return <LoadingSpinner />;
// Now safe to access user properties
const name = user.name;
```

### Issue: Page redirects immediately

**Problem**: Protected page redirects to login on every render

**Solution**:
```jsx
// Ensure dependency array is correct
useEffect(() => {
  if (!user && !loading) {  // Check loading state
    navigate("/login");
  }
}, [user, loading, navigate]);  // Include dependencies
```

### Issue: Cart not persisting

**Problem**: Cart empties after page refresh

**Solution**:
- Verify `fetchCart()` is called in useEffect
- Check that cart data is saved to backend
- Ensure userToken is persisted in localStorage

### Issue: Payment redirect not working

**Problem**: User not redirected to payment page after checkout

**Solution**:
```jsx
// Check for session URL in response
if (data.success && data.sessionUrl) {
  window.location.href = data.sessionUrl;  // Use window.location for external redirect
}
```

### Issue: Images not loading

**Problem**: Product or profile images not displaying

**Solution**:
- Verify image URL is correct
- Check backend image hosting (Cloudinary, etc.)
- Ensure image permission/CORS settings

---

## Summary Table (Quick Reference)

| Page | Route | Auth | Purpose | Key State |
|---|---|---|---|---|
| Home | `/` | No | Landing | - |
| Login | `/login` | - | Auth | Form state |
| Doctors | `/doctors/:specialty?` | No | Browse | Filters |
| DoctorAppointment | `/appointment/:docId` | Yes | Book appt | DocInfo, slots |
| MyAppointments | `/my-appointments` | Yes | View appts | Appointments |
| Cart | `/cart` | Partial | Checkout | CartItems, address |
| AddAddress | `/add-address` | Yes | Add addr | Form state |
| DrugDetails | `/product/:id` | No | View drug | Product |
| DrugCategory | `/category/:category` | No | Browse | Filtered products |
| MyOrders | `/my-orders` | Yes | History | Orders, loading |
| MyProfile | `/my-profile` | Yes | Edit profile | UserData, edit mode |
| PaymentSuccess | `/payment-success` | No | Confirm | Payment details |
| PaymentCancel | `/payment-cancel` | No | Error | Error details |
| PaymentProcessing | `/payment-processing` | No | Loading | Auto-redirect |
| About | `/about` | No | Info | Scroll, active section |
| Contact | `/contact` | No | Form | Form data |
| PrivacyPolicy | `/privacy` | No | Policy | Expanded sections |

