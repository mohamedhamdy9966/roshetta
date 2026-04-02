# Components Directory

## Overview

The `components` folder contains all the reusable React components used throughout the Roshetta healthcare platform. Each component follows the atomic component design pattern and React best practices with proper state management, prop validation, and accessibility considerations.

## Component Structure

Components are organized by functionality and are designed to be:
- **Reusable**: Components can be used in multiple pages/sections
- **Composable**: Components can be combined to create complex UIs
- **Modular**: Each component has a single responsibility
- **Maintainable**: Clear naming conventions and documentation

---

## Atomic Components

### 1. **Navbar.jsx**

**Purpose**: Main navigation component that displays at the top of every page.

**Features**:
- Responsive mobile menu with hamburger icon
- Authentication state awareness (show login/logout based on auth status)
- Shopping cart badge displaying item count
- Dropdown menu for authenticated users
- Sticky/fixed positioning
- Click-outside detection for closing menus
- Navigation to all major sections

**Props**: None (uses AppContext for state)

**Key Dependencies**:
- `useContext`: Access `AppContext` for authentication and user data
- `useState`: Manage menu and dropdown visibility
- `useRef`: Handle click-outside detection
- `react-router-dom`: Navigation links
- `react-icons`: Icon rendering

**Code Explanation**:
```jsx
// Access global state
const { token, setToken, userData } = useContext(AppContext);

// Manage menu states
const [menuOpen, setMenuOpen] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);

// Handle click outside to close menus
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// Logout function
const logout = () => {
  setToken(null);
  localStorage.removeItem("token");
  navigate("/login");
};
```

**Usage**:
```jsx
import Navbar from './components/Navbar';

<Navbar />
```

---

### 2. **Header.jsx**

**Purpose**: Hero/banner section displayed on the homepage with call-to-action elements.

**Features**:
- Framer Motion animations for entrance effects
- Intersection Observer for scroll-triggered animations
- Responsive design with mobile-first approach
- Animated background gradient
- Icons and buttons for key actions
- SEO-optimized with semantic HTML

**Props**: None (Self-contained)

**Key Dependencies**:
- `framer-motion`: Animation and scroll triggers
- `react-intersection-observer`: Detect when component enters viewport
- `react-icons`: Icon components
- `react-router-dom`: Navigation

**Code Explanation**:
```jsx
// Animation variants defined for reusability
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,      // Delay between child animations
      delayChildren: 0.3          // Delay before first child animates
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Use Intersection Observer to trigger animations on scroll
const [ref, inView] = useInView({
  threshold: 0.1,
  triggerOnce: false
});

// Update animation state based on visibility
useEffect(() => {
  if (inView) {
    controls.start("visible");
  } else {
    controls.start("hidden");
  }
}, [controls, inView]);
```

**Usage**:
```jsx
import Header from './components/Header';

<Header />
```

---

### 3. **Footer.jsx**

**Purpose**: Footer section containing company information, quick links, and social media links.

**Features**:
- Grid layout for different sections
- Social media icons with hover effects
- Company branding and description
- Quick links to main pages
- Contact information
- Healthcare-related links
- Support information
- Responsive on all device sizes

**Props**: None (Self-contained)

**Key Dependencies**:
- `react-icons`: Social and informational icons
- `assets`: Logo image

**Code Explanation**:
```jsx
// Grid layout with responsive columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"

// Social media icons with styling
<a href="#" className="social-icon bg-white bg-opacity-20 hover:bg-opacity-30">
  <FaFacebook className="text-[#3b5998]" />
</a>

// Links array that can be mapped
const links = [
  { label: "Home", icon: "HiHome" },
  { label: "About Us", icon: "HiInformationCircle" },
  // ... more links
];
```

**Usage**:
```jsx
import Footer from './components/Footer';

<Footer />
```

---

### 4. **DoctorSpecialty.jsx**

**Purpose**: Display medical specialties in a grid format with links to filter doctors by specialty.

**Features**:
- Grid layout with responsive columns
- Framer Motion animations with scroll triggers
- Specialty cards with images and names
- SEO optimized with Helmet metadata
- Links to doctor listing filtered by specialty
- Hover and tap animations
- Specialty icons

**Props**: None (Uses AppContext for data)

**Key Dependencies**:
- `react-helmet`: SEO metadata management
- `framer-motion`: Animations
- `react-router-dom`: Navigation links
- `react-icons`: Icons for specialties
- `assets.specialtyData`: Specialty data array

**Code Explanation**:
```jsx
// Animation configuration for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // 0.1s delay between items
      delayChildren: 0.3
    }
  }
};

// Map through specialties and create animated cards
{specialtyData.map((item) => (
  <motion.div
    key={uuidv4()}
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.05 }}    // Lift up on hover
    whileTap={{ scale: 0.95 }}              // Scale down on tap
    className="flex justify-center"
  >
    <Link to={`/doctors/${item.specialty.toLowerCase().replace(/ /g, "-")}`}>
      {/* Specialty card content */}
    </Link>
  </motion.div>
))}

// SEO metadata
<Helmet>
  <title>Find Doctors by Specialty - Roshetta</title>
  <meta name="description" content="..." />
  <meta name="keywords" content="..." />
</Helmet>
```

**Usage**:
```jsx
import DoctorSpecialty from './components/DoctorSpecialty';

<DoctorSpecialty />
```

---

### 5. **TopDoctors.jsx**

**Purpose**: Showcase a curated list of the top 8 doctors with their details and booking functionality.

**Features**:
- Grid display of top doctors (4 per row on desktop)
- Doctor cards with image, name, specialty, rating, and experience
- Availability status badge
- Hover animations and scale effects
- Book appointment button
- Rating display with stars
- Experience information
- Interactive navigation to appointment page

**Props**: None (Uses AppContext for doctors data)

**Key Dependencies**:
- `AppContext`: Access doctors list
- `framer-motion`: Animations
- `useNavigate`: Navigate to appointment page
- `react-icons`: Icons for ratings and arrows

**Code Explanation**:
```jsx
// Get doctors from context
const { doctors } = useContext(AppContext);

// Animation configuration with spring effect
const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Doctor card with hover effect
<motion.div
  whileHover={{ 
    y: -8,
    transition: { type: "spring", stiffness: 300 }
  }}
  className="flex justify-center"
>
  <div
    onClick={() => navigate(`/my-appointments/${doctor._id}`)}
    className="group w-full cursor-pointer"
  >
    {/* Doctor info rendering */}
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-bold">
        {doctor.name}
      </h3>
      <p className="text-sm">
        {doctor.specialty}
      </p>
      {/* Availability badge */}
      <div className={`px-3 py-1 rounded-full ${
        doctor.available 
          ? "bg-green-100 text-green-800" 
          : "bg-gray-100 text-gray-800"
      }`}>
        {doctor.available ? "Available" : "Booked"}
      </div>
    </div>
  </div>
</motion.div>

// Display slice of 8 doctors
{doctors.slice(0, 8).map((doctor) => (
  // ... render doctor card
))}
```

**Usage**:
```jsx
import TopDoctors from './components/TopDoctors';

<TopDoctors />
```

---

### 6. **Chatbot.jsx**

**Purpose**: AI-powered chatbot component with voice recording and file upload capabilities.

**Features**:
- Real-time messaging with bot responses
- Voice recording with audio processing
- File upload (images and PDFs) with validation
- User appointment information integration
- Context-aware responses
- Auto-scrolling to latest message
- File size and type validation (max 5MB)
- Support for authenticated and non-authenticated users
- Loading states during message processing

**Props**: None (Uses AppContext)

**Key Dependencies**:
- `axios`: API communication
- `AppContext`: User and bot context
- `react-toastify`: Notifications
- `useRef`: DOM manipulation and audio recording
- `useState`: Local state management

**Code Explanation**:
```jsx
// Initial greeting message based on authentication
const getInitialGreeting = () => {
  if (userData && userData.name) {
    return `Hello ${userData.name}! I'm Roshetta Assistant...`;
  } else {
    return "Hello! I'm Roshetta Assistant...";
  }
};

// File validation function
const validateInput = () => {
  if (!input.trim() && !audioBlob && !selectedFile) {
    toast.error("Message cannot be empty when no file is selected");
    return false;
  }
  
  if (selectedFile) {
    // Check file type
    if (!selectedFile.type.startsWith("image/") && 
        selectedFile.type !== "application/pdf") {
      toast.error("File must be an image or PDF");
      return false;
    }
    
    // Check file size (5MB max)
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File must not exceed 5MB");
      return false;
    }
  }
  return true;
};

// Fetch user appointments
const fetchAppointments = async () => {
  if (!token) {
    setAppointments([]);
    return;
  }
  
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/user/appointments`,
      { headers: { token } }
    );
    if (data.success) {
      setAppointments(data.appointments);
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

// Audio recording with error handling
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    });
    
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(audioBlob);
      audioChunksRef.current = [];
    };
    
    mediaRecorder.start();
    setIsRecording(true);
  } catch (error) {
    handleRecordingError(error);
  }
};

// Send message to backend
const handleSendMessage = async () => {
  if (!validateInput()) return;
  
  setIsLoading(true);
  
  try {
    const formData = new FormData();
    formData.append("message", input);
    if (audioBlob) formData.append("audio", audioBlob);
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("userContext", JSON.stringify(chatbotContext));
    
    const response = await axios.post(
      `${backendUrl}/api/chat`,
      formData,
      { headers: { token, "Content-Type": "multipart/form-data" } }
    );
    
    if (response.data.success) {
      setMessages([...messages, 
        { sender: "user", text: input },
        { sender: "bot", text: response.data.botResponse }
      ]);
    }
  } catch (error) {
    toast.error("Failed to send message");
  } finally {
    setIsLoading(false);
    setInput("");
    setSelectedFile(null);
    setAudioBlob(null);
  }
};
```

**Usage**:
```jsx
import Chatbot from './components/Chatbot';

<Chatbot />
```

---

### 7. **VerifyEmail.jsx**

**Purpose**: Form component for email verification during user registration.

**Features**:
- OTP input validation with Formik
- 6-digit OTP requirement
- Resend OTP functionality
- Automatic redirect on successful verification
- Error handling and user feedback with toast notifications
- Loading states during submission
- Yup validation schema

**Props**: None (Uses location state and AppContext)

**Key Dependencies**:
- `Formik`: Form state management
- `Yup`: Validation schema
- `axios`: API requests
- `react-router-dom`: Navigation and location state
- `react-toastify`: Notifications

**Code Explanation**:
```jsx
// Get userId from navigation state
const userId = location.state?.userId;

// Yup validation schema
const verifySchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")  // Regex: exactly 6 digits
    .required("OTP is required")
});

// Form submission handler
const onSubmitHandler = async (values, { setSubmitting }) => {
  setIsSubmitting(true);
  
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/verify-account`,
      {
        userId,
        otp: values.otp
      }
    );
    
    if (data.success) {
      toast.success(data.message);
      navigate("/login");  // Redirect to login on success
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setSubmitting(false);
    setIsSubmitting(false);
  }
};

// Resend OTP handler
const handleResendOtp = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/send-verify-otp`,
      { userId },
      { headers: { token } }
    );
    
    if (data.success) {
      toast.success(data.message);  // "OTP sent successfully"
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// Formik form rendering
<Formik
  initialValues={{ otp: "" }}
  validationSchema={verifySchema}
  onSubmit={onSubmitHandler}
>
  {({ isSubmitting }) => (
    <Form>
      <Field
        type="text"
        name="otp"
        placeholder="Enter 6-digit OTP"
        maxLength="6"
      />
      <ErrorMessage name="otp" component="div" />
      <button type="submit" disabled={isSubmitting}>
        Verify Email
      </button>
    </Form>
  )}
</Formik>
```

**Usage**:
```jsx
import VerifyEmail from './components/VerifyEmail';

// Navigate with state
navigate('/verify-email', { state: { userId } });

<VerifyEmail />
```

---

### 8. **ResetPassword.jsx**

**Purpose**: Form component for resetting user password with OTP verification.

**Features**:
- OTP verification with 6-digit requirement
- Password validation (minimum 8 characters)
- Password confirmation matching
- Show/hide password toggle icons
- Resend OTP functionality
- Form validation with Yup
- Loading states
- Error handling

**Props**: None (Uses location state and AppContext)

**Key Dependencies**:
- `Formik`: Form state management
- `Yup`: Validation schema
- `axios`: API requests
- `react-icons`: Eye icons for password visibility
- `react-toastify`: Notifications

**Code Explanation**:
```jsx
// Get userId and email from navigation state
const { userId, email } = location.state || {};

// Password visibility toggle states
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// Yup validation schema with complex password rules
const resetSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"  // Validates that both passwords are identical
    )
    .required("Confirm password is required")
});

// Form submission with backend integration
const onSubmitHandler = async (values, { setSubmitting }) => {
  setIsSubmitting(true);
  
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/reset-password`,
      {
        userId,
        otp: values.otp,
        newPassword: values.newPassword
      }
    );
    
    if (data.success) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setSubmitting(false);
    setIsSubmitting(false);
  }
};

// Show/hide password toggle
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
</button>
```

**Usage**:
```jsx
import ResetPassword from './components/ResetPassword';

// Navigate with state
navigate('/reset-password', { 
  state: { userId, email } 
});

<ResetPassword />
```

---

### 9. **DoctorsBanner.jsx**

**Purpose**: Call-to-action banner promoting doctor bookings with SEO optimization.

**Features**:
- Responsive banner layout (hides image on mobile)
- SEO metadata with OpenGraph support
- Navigation to login/signup
- Promotional message
- Hero image on desktop view
- Tailwind CSS responsive design

**Props**: None (Self-contained)

**Key Dependencies**:
- `react-helmet`: SEO metadata
- `react-router-dom`: Navigation

**Code Explanation**:
```jsx
// Responsive layout
<div className="flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14">
  {/* Content - visible on all screens */}
  <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24">
    <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
      <p>Book Appointment</p>
      <p className="mt-4">With 100+ Trusted Doctors</p>
    </div>
    <button onClick={() => navigate("/login")}>
      Create Account
    </button>
  </div>

  {/* Image - hidden on mobile/tablet, visible on medium screens and up */}
  <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
    <img src={assets.appointment_img} alt="appointment-img" />
  </div>
</div>

// SEO metadata
<Helmet>
  <title>Book with Trusted Doctors - Roshetta</title>
  <meta property="og:title" content="Book with Trusted Doctors - Roshetta" />
  <meta property="og:image" content={assets.appointment_img} />
</Helmet>
```

**Usage**:
```jsx
import DoctorsBanner from './components/DoctorsBanner';

<DoctorsBanner />
```

---

### 10. **RelatedDoctors.jsx**

**Purpose**: Display doctors with the same specialty as the current doctor being viewed.

**Features**:
- Filter doctors by specialty (excluding current doctor)
- Limit display to 5 related doctors
- SEO optimization with dynamic metadata
- Doctor cards with availability status
- Click navigation to appointment booking
- Responsive grid layout

**Props**:
```tsx
{
  specialty: string,    // Medical specialty (e.g., "Cardiology")
  docId: string        // Current doctor's ID to exclude from results
}
```

**Key Dependencies**:
- `AppContext`: Access doctors list
- `react-helmet`: SEO metadata
- `react-router-dom`: Navigation
- `uuid`: Generate unique keys

**Code Explanation**:
```jsx
// Filter doctors by specialty
useEffect(() => {
  if (doctors.length > 0 && specialty) {
    const doctorsData = doctors.filter(
      (doc) => 
        doc.specialty === specialty &&  // Match specialty
        doc._id !== docId               // Exclude current doctor
    );
    setRealDocs(doctorsData);
  }
}, [doctors, specialty, docId]);

// Render limited number of doctors
{relDoc.slice(0, 5).map((item) => (
  <div
    key={uuidv4()}
    onClick={() => {
      navigate(`/appointment/${item._id}`);
      window.scrollTo(0, 0);
    }}
    className="border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-10px]"
  >
    <img src={item.image} alt="doctor" />
    <div className="p-4">
      <div className="flex items-center gap-2 text-sm text-green-500">
        <p className="w-2 h-2 bg-green-500 rounded-full"></p>
        <p>Available</p>
      </div>
      <p className="text-lg font-medium">{item.name}</p>
      <p className="text-gray-600 text-sm">{item.specialty}</p>
    </div>
  </div>
))}

// Dynamic SEO metadata
<Helmet>
  <title>Related {specialty} Doctors - Roshetta</title>
  <meta 
    name="description" 
    content={`Explore trusted ${specialty} doctors on Roshetta...`} 
  />
</Helmet>
```

**Usage**:
```jsx
import RelatedDoctors from './components/RelatedDoctors';

<RelatedDoctors specialty="Cardiology" docId="doctor_123" />
```

---

### 11. **Sidebar.jsx** *(Incomplete)*

**Purpose**: Sidebar navigation for chat/messaging interface.

**Status**: This component is currently incomplete and needs implementation.

**Planned Features**:
- User/group list display
- Search functionality
- Selected user highlighting
- Chat history navigation

**Props**:
```tsx
{
  selectedUser: object,
  setSelectedUser: (user) => void
}
```

---

### 12-15. **Empty Components**

The following components are currently empty and need implementation:

- **ChatContainer.jsx**: Container for displaying chat messages
- **LabHeader.jsx**: Hero section for lab services
- **LabSpecialty.jsx**: Lab specialties/tests grid
- **RightSidebar.jsx**: Right sidebar for chat interface

---

## Context Integration

All components that require global state use the **AppContext** which provides:

```jsx
{
  token,                // User authentication token
  setToken,             // Function to update token
  userData,             // User profile information
  doctors,              // List of all doctors
  backendUrl,           // API base URL
  chatbotContext        // Context for chatbot interactions
}
```

---

## Styling Approach

**CSS Framework**: Tailwind CSS
- Utility-first CSS approach
- Custom CSS variables for theming
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Color system: Primary, secondary, accent colors via CSS variables

---

## Animation Library

**Library**: Framer Motion
- Scroll-triggered animations with `react-intersection-observer`
- Hover and tap animations
- Staggered animations for lists
- Smooth transitions and springs

---

## Best Practices

1. **Performance Optimization**
   - Use `React.memo()` for pure components
   - Lazy load images and components
   - Avoid unnecessary re-renders with proper dependency arrays

2. **Accessibility**
   - Use semantic HTML tags
   - Add proper ARIA labels
   - Ensure keyboard navigation works
   - Use proper heading hierarchy

3. **Error Handling**
   - Use try-catch for async operations
   - Provide user feedback with toast notifications
   - Validate user input with Yup schemas

4. **Code Organization**
   - Keep components focused and small
   - Extract logic into custom hooks
   - Use meaningful variable names
   - Add comments for complex logic

5. **Responsive Design**
   - Mobile-first approach
   - Test on multiple breakpoints
   - Use Tailwind responsive classes

---

## Dependencies Summary

### Main Libraries
- **react**: UI library (v19)
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API calls
- **formik**: Form state management
- **yup**: Validation schema builder
- **framer-motion**: Animation library
- **react-intersection-observer**: Scroll animations
- **react-helmet**: SEO metadata management
- **react-toastify**: Toast notifications
- **react-icons**: Icon library
- **uuid**: Generate unique IDs

### Tailwind CSS
- Utility classes for styling
- Custom configuration for theme colors

---

## Usage Examples

### Creating a New Component

```jsx
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const NewComponent = ({ prop1, prop2 }) => {
  const { token, userData } = useContext(AppContext);
  const [state, setState] = useState(null);

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
      <Helmet>
        <title>Page Title - Roshetta</title>
        <meta name="description" content="Page description" />
      </Helmet>

      {/* Component UI */}
    </motion.div>
  );
};

export default NewComponent;
```

### Importing Components

```jsx
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorSpecialty from './components/DoctorSpecialty';
import TopDoctors from './components/TopDoctors';

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <DoctorSpecialty />
      <TopDoctors />
      <Footer />
    </>
  );
}
```

---

## Troubleshooting

### Common Issues

1. **Component Not Re-rendering**
   - Check if state is being updated correctly
   - Verify context is properly provided
   - Check dependency arrays in useEffect

2. **Styling Not Applied**
   - Ensure Tailwind CSS is properly configured
   - Check CSS variable names match theme
   - Verify CSS classes are spelled correctly

3. **Failed API Calls**
   - Check backend URL in AppContext
   - Verify token is included in headers
   - Check network tab in browser DevTools
   - Verify CORS is configured correctly

4. **Animation Issues**
   - Ensure Framer Motion is properly installed
   - Check animation variant props
   - Verify viewport settings for scroll animations

---

## Contributing

When adding new components:

1. Follow the existing file naming convention (PascalCase)
2. Add PropTypes or TypeScript interfaces
3. Include JSDoc comments with usage examples
4. Add SEO metadata with Helmet if needed
5. Use Tailwind CSS for styling
6. Add animations using Framer Motion
7. Update this README with component documentation
8. Test on multiple screen sizes and browsers

---

## Related Documentation

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com)
- [Formik Documentation](https://formik.org)
- [React Icons](https://react-icons.github.io/react-icons/)
