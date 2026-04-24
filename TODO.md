# Fix ESLint Errors & Warnings - TODO

## In Progress

### Batch 1: Simple fixes (derived state → useMemo, move module-level code)

- [ ] client/src/components/Navbar.jsx - Move CartIcon outside Navbar
- [ ] client/src/components/chatbot/Chatbot.jsx - Move axios.defaults, fix effects
- [ ] client/src/components/doctor/DoctorSpecialty.jsx - Remove data state & effect
- [ ] client/src/components/doctor/RelatedDoctors.jsx - Replace state+effect with useMemo
- [ ] client/src/pages/AddAddress.jsx - Remove setAddress effect
- [ ] client/src/pages/PaymentCancel.jsx - Replace state+effect with useMemo
- [ ] client/src/pages/PaymentSuccess.jsx - Replace state+effect with useMemo
- [ ] client/src/pages/drug/DrugDetails.jsx - Replace related products effect with useMemo

### Batch 2: Context and complex pages

- [ ] client/src/context/AppContext.jsx - Wrap async calls in IIFEs
- [ ] client/src/pages/Cart.jsx - useMemo for cartArray, IIFE for getUserAddress
- [ ] client/src/pages/doctor/DoctorAppointment.jsx - useMemo for docInfo and docSlots
- [ ] client/src/pages/doctor/Doctors.jsx - useMemo for filterDoc
- [ ] client/src/pages/doctor/MyDoctorsAppointments.jsx - IIFE for getUserAppointments
- [ ] client/src/pages/drug/MyOrders.jsx - IIFE for fetchMyOrders
- [ ] client/src/pages/lab/LabAppointment.jsx - useMemo for labSlots
- [ ] client/src/pages/lab/Labs.jsx - IIFE for fetchLabs

## Done
