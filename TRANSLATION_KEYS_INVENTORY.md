# Translation Keys Inventory for Roshetta Client

## Overview

Complete inventory of React component files in `/client/src/pages` directory with extracted text content organized by functionality.

---

## 1. AUTHENTICATION & PROFILE

### Files:

- `src/pages/Login.jsx`
- `src/pages/MyProfile.jsx`

### Login Page Text Content:

**Form Headers:**

- Sign Up
- Login
- Forgot Password

**Login Form Fields:**

- Email
- Password
- Show/Hide Password

**Sign Up Form Fields:**

- Full Name
- Email
- Mobile Number
- Birth Date
- Blood Type (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Gender (Male, Female, Other)
- Medical Insurance
- Allergies
- Confirm Password

**Medical History Sections (with Add/Remove buttons):**

- Medications:
  - Drug Name
  - Dosage
  - Frequency
  - Status (Active, Discontinued)
- Diseases:
  - Disease Name
  - Diagnosed Date
  - Status (Active, Recovered, Chronic)
  - Notes
- Surgeries:
  - Surgery Name
  - Date
  - Status (Completed, Scheduled)
  - Notes
- Family History:
  - Relative Type
  - Condition Name
  - Diagnosed Date
  - Notes

**Buttons/Links:**

- Sign Up
- Login
- Forgot Password
- Continue with Google
- Continue with Apple

**Validation Messages:**

- Invalid email
- Password must be at least 8 characters
- Invalid mobile number
- Passwords must match

### My Profile Page Text Content:

**Section Headers:**

- My Profile
- Edit Profile

**Form Fields:**

- Name (Text Input)
- Phone (Text Input)
- Gender (Dropdown)
- Birth Date (Date Input)
- Medical Insurance (Text Input)
- Allergies (Text Input)
- Address (JSON)
- Profile Picture (File Upload)

**Buttons:**

- Edit
- Save Changes
- Upload Picture
- Cancel

**Display Elements:**

- User Initials (Avatar fallback)
- User Name
- Last Updated
- Profile Status

---

## 2. ADDRESSES & DELIVERY

### Files:

- `src/pages/AddAddress.jsx`

### Add Address Page Text Content:

**Form Headers:**

- Add New Address
- Delivery Address

**Form Fields:**

- First Name \*
- Last Name \*
- Email \*
- Street Address \*
- City \*
- State/Province \* (Dropdown with 29 Egyptian states)
- Zip Code \*
- Country (Default: Egypt)
- Phone Number \*
- Building Number
- Floor Number
- Apartment Number

**Egyptian States (with Delivery Fees):**

1. Cairo - 50 EGP
2. Giza - 60 EGP
3. Alexandria - 70 EGP
4. PortSaid - 65 EGP
5. Suez - 65 EGP
6. Dakahlia - 40 EGP
7. Sharqia - 70 EGP
8. Qalyubia - 60 EGP
9. Kafr El Sheikh - 40 EGP
10. Gharbia - 30 EGP
11. Monufia - 50 EGP
12. Beheira - 65 EGP
13. Ismailia - 65 EGP
14. Faiyum - 80 EGP
15. BeniSuef - 85 EGP
16. Minya - 90 EGP
17. Asyut - 95 EGP
18. Sohag - 100 EGP
19. Qena - 100 EGP
20. Luxor - 90 EGP
21. Aswan - 100 EGP
22. RedSea - 120 EGP
23. NewValley - 130 EGP
24. Matrouh - 120 EGP
25. NorthSinai - 150 EGP
26. SouthSinai - 140 EGP
27. Damietta - 75 EGP
28. Helwan - 60 EGP
29. October - 60 EGP

**Buttons:**

- Add Address
- Cancel
- Save

**Validation Messages:**

- Please log in to add an address
- All fields marked with \* are required

---

## 3. SHOPPING & CHECKOUT

### Files:

- `src/pages/Cart.jsx`

### Cart Page Text Content:

**Section Headers:**

- Shopping Cart
- Order Summary
- Delivery Address
- Payment Method

**Cart Display:**

- Product Name
- Price
- Quantity
- Quantity Controls (+/-)
- Remove from Cart
- Total Price per Item

**Order Summary Items:**

- Subtotal: [Amount] EGP
- Shipping Fee: [Amount] EGP
- Tax: [Amount] EGP
- Total Amount: [Amount] EGP

**Address Selection:**

- Select Delivery Address
- Add New Address
- Address not selected warning
- No addresses available message

**Payment Options:**

- Cash on Delivery (COD)
- Online Payment (Paymob/Stripe)
- Select Payment Method

**Buttons:**

- Place Order
- Continue Shopping
- Add Address
- Pay Now

**Messages:**

- Your cart is empty
- Please select a delivery address
- Please log in to place an order
- Order placed successfully
- Payment failed - please try again

---

## 4. DOCTORS BOOKING

### Files:

- `src/pages/doctor/Doctors.jsx`
- `src/pages/doctor/DoctorAppointment.jsx`
- `src/pages/doctor/MyDoctorsAppointments.jsx`

### Doctors List Page Text Content:

**Section Headers:**

- Find Doctors
- Available Doctors
- Filter Results

**Search & Filter:**

- Search by Name
- Filter by Specialty:
  - General Physician
  - Gynecologist
  - Dermatologist
  - Pediatrician
  - Bones
  - Surgery
  - ENT
- Filter by Experience:
  - Any
  - 0-5 years
  - 5-10 years
  - 10+ years
- Filter by Availability:
  - Available
  - Unavailable
- Filter by Fees:
  - Minimum Fee
  - Maximum Fee
- Filter by Rating:
  - Any
  - 3+ Stars
  - 4+ Stars
  - 5 Stars

**Doctor Card Display:**

- Doctor Name
- Specialty
- Experience (e.g., "10 years")
- Fees (EGP)
- Average Rating
- Number of Reviews
- Availability Status
- View Profile
- Book Appointment

**Buttons:**

- Clear Filters
- Apply Filters
- View Doctor Profile
- Book Now

### Doctor Appointment Booking Page Text Content:

**Doctor Details Section:**

- Doctor Name
- Specialty
- Experience
- Fees
- Average Rating
- About
- Qualifications
- Services Offered

**Appointment Booking:**

- Select Date
- Available Days (Next 7 days)
- Days of Week: SAT, SUN, MON, TUE, WED, THU, FRI
- Select Time:
  - Morning Slots (10:00 - 12:30)
  - Afternoon Slots (14:00 - 17:00)
  - Evening Slots (18:00 - 21:00)
- Time Slot Format: HH:MM (30-minute intervals)
- Slot Not Available (greyed out)

**Buttons:**

- Book Appointment
- Cancel
- View Reviews
- Contact Doctor
- Call Doctor

**Messages:**

- Please log in to book an appointment
- Please select a time slot
- Appointment booked successfully
- Slot not available

### My Doctor Appointments Page Text Content:

**Section Headers:**

- My Doctor Appointments
- Upcoming Appointments
- Past Appointments
- Cancelled Appointments

**Appointment Card Display:**

- Doctor Name
- Specialty
- Appointment Date (Format: DD MON YYYY)
- Appointment Time
- Status Badge:
  - Confirmed
  - Pending Payment
  - Completed
  - Cancelled
  - Payment Failed
- Doctor Contact
- View Details
- Cancel Appointment
- Reschedule
- Payment Status

**Action Buttons:**

- Cancel Appointment
- Reschedule
- Retry Payment
- View Receipt
- Download Prescription
- Chat with Doctor

**Status Colors/Labels:**

- Green: Confirmed
- Yellow: Pending Payment
- Blue: In Progress
- Red: Cancelled/Failed
- Gray: Completed

**Messages:**

- No appointments found
- Payment pending
- Payment successful
- Appointment cancelled successfully
- Cannot cancel past appointments

---

## 5. LABS & TESTS

### Files:

- `src/pages/lab/Labs.jsx`
- `src/pages/lab/LabAppointment.jsx`
- `src/pages/lab/MyLabsAppointments.jsx` (Empty - To be implemented)

### Labs List Page Text Content:

**Section Headers:**

- Find Labs
- Laboratory Tests
- Available Labs

**Search & Filter:**

- Search Labs
- Filter by Service:
  - Blood Tests
  - Hormone Panels
  - Pathology
  - Genetic Screening
  - Imaging Support
  - Routine Checkups
- Filter by Availability:
  - Available
  - Unavailable
- Filter by Fees:
  - Minimum Fee
  - Maximum Fee
- Filter by Rating:
  - Any
  - 3+ Stars
  - 4+ Stars
  - 5 Stars

**Lab Card Display:**

- Lab Name
- Available Services
- Address (City, State, Country)
- Fees (EGP)
- Average Rating
- Operating Hours
- Availability Status
- Contact Phone
- Location Map

**Buttons:**

- Clear Filters
- Apply Filters
- View Lab Details
- Book Appointment

### Lab Appointment Booking Page Text Content:

**Lab Details Section:**

- Lab Name
- Services Offered:
  - Blood Tests
  - Hormone Panels
  - Pathology
  - Genetic Screening
  - Imaging Support
  - Routine Checkups
- Address
- Phone Number
- Operating Hours
- Average Rating
- Reviews

**Appointment Booking:**

- Select Service
- Select Date
- Available Days (Next 7 days)
- Days of Week: SUN, MON, TUE, WED, THU, FRI, SAT
- Select Time:
  - Morning Slots (9:00 - 12:00)
  - Afternoon Slots (14:00 - 18:00)
- Time Slot Format: HH:MM (30-minute intervals)

**Buttons:**

- Book Lab Appointment
- Cancel
- Call Lab
- Share Lab Info

**Messages:**

- Please log in to continue with lab booking
- Please select a preferred time slot
- Lab booking API not available yet

---

## 6. PHARMACY & DRUGS

### Files:

- `src/pages/drug/Drugs.jsx` (Empty)
- `src/pages/drug/AllDrugs.jsx` (Empty)
- `src/pages/drug/DrugDetails.jsx`
- `src/pages/drug/DrugCategory.jsx`
- `src/pages/drug/DrugOrder.jsx` (Empty)
- `src/pages/drug/MyOrders.jsx`

### Drug Category Page Text Content:

**Section Headers:**

- Drug Categories
- [Category Name]

**Product Grid Display:**

- Product Name
- Product Image
- Price (Original)
- Offer Price
- Discount Badge (if applicable)
- Stock Status
- Add to Cart

**Product Card:**

- Drug Name
- Category
- Original Price
- Offer Price
- Star Rating
- Number of Reviews
- Stock Available/Out of Stock

**Buttons:**

- Browse Category
- View Details
- Add to Cart

**Messages:**

- No Products Available Now
- Loading products...

### Drug Details Page Text Content:

**Breadcrumb Navigation:**

- Home
- Products
- [Category]
- [Product Name]

**Product Details:**

- Product Name
- Product Images (Thumbnails + Main Image)
- Price (Original)
- Offer Price
- Savings Amount (if discount)
- Star Rating
- Number of Reviews
- Stock Status (In Stock / Out of Stock)
- Product Category
- Description
- Ingredients (if applicable)
- Usage Instructions
- Side Effects
- Warnings
- Manufacturer

**Product Actions:**

- Add to Cart
- Add to Wishlist
- Share Product
- Report Issue

**Related Products Section:**

- Related Products (5 items)
- Category: [Same Category]

**Buttons:**

- Add to Cart
- Decrease Quantity
- Increase Quantity
- View Cart

**Messages:**

- Added to cart successfully
- Product out of stock
- Added to wishlist

### My Orders Page Text Content:

**Section Headers:**

- My Orders
- [x] order(s) found

**Order Display:**

- Order ID (Last 8 characters)
- Order Date (Format: YYYY-MM-DD HH:MM)
- Order Status:
  - Order Placed (Blue badge)
  - Processing (Yellow badge)
  - Shipped (Purple badge)
  - Out for Delivery (Orange badge)
  - Delivered (Green badge)
  - Cancelled (Red badge)
  - Payment Failed (Red badge)
  - Pending Payment (Gray badge)
- Total Items
- Total Amount (with currency)
- Delivery Address
- Payment Status
- Expected Delivery Date

**Order Items:**

- Product Name
- Quantity
- Unit Price
- Item Total Price

**Order Actions:**

- Track Order
- View Details
- Reorder
- Download Invoice
- Cancel Order (if applicable)
- Return Item (if applicable)

**Buttons:**

- Track Order
- View Details
- Reorder
- Download Invoice

**Messages:**

- No Orders Found
- You haven't placed any orders yet
- Please Log In
- You need to be logged in to view your orders
- Tracking feature coming soon
- Reorder feature coming soon
- Cannot reorder - no items found

---

## 7. STATIC PAGES & INFORMATION

### Files:

- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`
- `src/pages/PrivacyPolicy.jsx`

### Home Page Text Content:

**Components Rendered:**

- Header (Rendered from components)
- Doctor Specialty Section
- Top Doctors Section
- Lab Services Section
- Pharmacy Section

**Text Content:**

- Minimal in main component (delegated to sub-components)
- Uses Header, DoctorSpecialty, TopDoctors, LabSpecialty components

### About Page Text Content:

**Section 1: Hero Section**

- Page Title: "Our Story"
- Subtitle Description
- Company Values

**Section 2: Healthcare Services**

- Advanced Medical Care
  - Title: "Advanced Medical Care"
  - Subtitle: "Excellence in Physical Health"
  - Description: "Comprehensive medical services featuring specialized consultations..."
  - Icon: Stethoscope

- General Medical Care
  - Title: "General Medical Care"
  - Subtitle: "Comprehensive Protection"
  - Description: "Leading general medical care platform..."
  - Icon: Brain

**Section 3: Features (Icons + Text)**

- Heart - "Patient Focused"
- Shield - "Secure & Private"
- Users - "Expert Team"
- Star - "Highly Rated"
- Award - "Award Winning"
- TrendingUp - "Growing Network"
- Zap - "Fast & Efficient"
- Globe - "Global Reach"
- Code - "Technology Driven"
- Smartphone - "Mobile First"
- Database - "Secure Data"
- Lock - "Encrypted"

**Section 4: Team Section**

- Team Member Cards (3 visible)
- Member Name
- Position/Title
- Bio
- Contact Info

**Buttons:**

- Learn More
- Auto-play/Pause Section Rotation
- Previous/Next Section

### Contact Page Text Content:

**Hero Section:**

- Title: "Connect with Excellence"
- Subtitle Description
- Features List:
  - 500+ Specialists
  - 24/7 Support
  - Telemedicine Ready

**Emergency Alert Banner:**

- Emergency Services Available
- Call Emergency Number
- Emergency Services Description

**Contact Form Fields:**

- First Name \*
- Last Name \*
- Email \*
- Phone \*
- Age Group (Dropdown)
- Specialty of Interest (Dropdown)
- Service Type (Dropdown)
- Insurance Provider (Dropdown)
- Health Concern (Text Area)
- I Consent to Contact (Checkbox)
- Submit Button

**Contact Information Section:**

- Office Address
- Phone Numbers
- Email Address
- Operating Hours
- Response Time

**Icons/Info Cards:**

- Phone Icon - "Call Us"
- Mail Icon - "Email Us"
- MapPin Icon - "Visit Us"
- Clock Icon - "Operating Hours"
- Headphones Icon - "24/7 Support"

**Buttons:**

- Submit Form
- Reset Form
- Call Now
- Send Email

### Privacy Policy Page Text Content:

**Collapsible Sections:**

**Section 1: Our Commitment to Your Privacy**

- Title: "Our Commitment to Your Privacy"
- Icon: Heart
- Color: Cyan (bg-cyan-500)
- Content: "At Rosheta, we understand that your health information is deeply personal..."
- Highlights:
  - Bank-level 256-bit encryption for all data
  - Your data is never sold or shared for profit
  - Complete control over your information
  - Egyptian data protection law compliant

**Section 2: Information We Collect**

- Title: "Information We Collect"
- Icon: Database
- Color: Teal (bg-teal-600)

**Subcategories:**

- Personal Information:
  - Full name and contact details
  - Age, gender, and basic demographics
  - Phone number for appointment confirmations
  - Email address for secure communications
  - Address (optional, for prescription delivery)

- Medical Information:
  - Medical history and current conditions
  - Symptoms and health concerns
  - Current medications and allergies
  - Test results and medical reports

**Additional Sections:**

- Data Security & Encryption
- Your Privacy Rights
- How We Use Your Data
- Data Retention Policy
- Third-Party Services
- Cookies & Tracking
- Contact Information

**Interactive Elements:**

- Expand/Collapse Sections (ChevronDown/Up icons)
- Scroll Progress Bar
- Back to Top Button
- Download Policy Button (PDF)
- Accepted Terms Checkbox

---

## 8. PAYMENT & TRANSACTION

### Files:

- `src/pages/PaymentSuccess.jsx`
- `src/pages/PaymentCancel.jsx`
- `src/pages/PaymentProcessing.jsx`

### Payment Success Page Text Content:

**Status Message:**

- Icon: Green checkmark
- Main Title: "Payment Successful!"
- Subtitle: "Your appointment has been booked and payment has been processed successfully."

**Appointment Details (if available):**

- Section Title: "Appointment Details"
- Appointment ID: [ID]
- Transaction ID: [Session ID]

**Buttons:**

- "View My Appointments"
- "Back to Home"

**Additional Info:**

- "Redirecting to appointments in 5 seconds..."
- Auto-redirect timer

### Payment Cancel/Failed Page Text Content:

**Status Message:**

- Icon: Red X in circle
- Main Title: "Payment Failed"
- Subtitle: "Your payment could not be processed. Please try again or use a different payment method."

**Error Details (if available):**

- Section Title: "Error Details"
- Error Description: [Error message]
- Appointment ID (if applicable): [ID]

**Buttons:**

- "Retry Payment" or "Book New Appointment" (conditional)
- "View My Appointments"
- "Back to Home"

**Messages:**

- Payment declined
- Card expired
- Insufficient funds
- Network error

### Payment Processing Page Text Content:

**Status Message:**

- Icon: Spinning loader
- Main Title: "Processing Payment..."
- Subtitle: "Please wait while we confirm your payment. Do not close this page."

**Information Box:**

- "This may take a few moments. We'll redirect you automatically once complete."

**Buttons:**

- "Check Appointments Manually"

**Additional Info:**

- "Redirecting to appointments in 10 seconds..."
- Auto-redirect timer

---

## Summary Statistics

| Category                 | Files  | Text Content Items |
| ------------------------ | ------ | ------------------ |
| Authentication & Profile | 2      | 60+                |
| Addresses & Delivery     | 1      | 50+                |
| Shopping & Checkout      | 1      | 40+                |
| Doctors Booking          | 3      | 80+                |
| Labs & Tests             | 3      | 60+                |
| Pharmacy & Drugs         | 6      | 70+                |
| Static Pages             | 4      | 100+               |
| Payment & Transaction    | 3      | 40+                |
| **TOTAL**                | **23** | **500+**           |

---

## Translation Key Naming Convention

### Suggested Structure:

```
pages.[category].[component].[section].[item]
```

### Examples:

```
pages.auth.login.form.email
pages.auth.login.form.password
pages.auth.signup.form.fullName
pages.auth.signup.form.bloodType
pages.address.form.firstName
pages.address.states.cairo
pages.cart.summary.subtotal
pages.doctors.filter.specialty
pages.doctors.filter.experience
pages.doctors.appointment.selectDate
pages.labs.filter.service
pages.drugs.details.addToCart
pages.orders.status.delivered
pages.payment.success.message
pages.privacy.section.dataCollection
```

---

## Notes for Implementation

1. **Empty Components:** Drugs.jsx, AllDrugs.jsx, DrugOrder.jsx, and MyLabsAppointments.jsx are currently empty
2. **Dynamic Content:** Doctor/Lab names, fees, and ratings are populated dynamically from API
3. **Date Formats:** Used throughout (DD MON YYYY format for appointments)
4. **Currency:** All prices displayed in EGP (Egyptian Pound)
5. **States List:** 29 Egyptian states with associated delivery fees
6. **Status Badges:** Use color-coded system for order/appointment status
7. **Form Validation:** Multiple fields have required validation
8. **Payment Methods:** COD (Cash on Delivery) and Online Payment (Paymob/Stripe)
9. **Multi-language:** Currently supporting English and Arabic (ar) language options detected in code
