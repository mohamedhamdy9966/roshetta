# Roshetta MonoRepo - Healthcare Platform.

A comprehensive healthcare platform built as a graduation project for ITI ITP Team 5. Roshetta provides a complete solution for healthcare services including doctor appointments, lab tests, drug ordering, and administrative management across web and mobile platforms.

## 🚀 Features

### For Patients
- **User Registration & Authentication**: Secure login with email/password, Google OAuth, and Apple Sign-In
- **Doctor Appointments**: Browse doctors, view profiles, and book appointments
- **Lab Tests**: Search and book laboratory tests
- **Drug Ordering**: Order medications with prescription management
- **Medical Records**: Access personal health records and test results
- **Payment Integration**: Multiple payment options (Stripe, Paymob, Cash on Delivery)
- **Real-time Chat**: Communicate with healthcare providers
- **Multi-language Support**: Arabic and English interface

### For Doctors
- **Profile Management**: Complete doctor profiles with specialties and availability
- **Appointment Management**: View and manage appointments
- **Patient Communication**: Chat with patients
- **Prescription Management**: Issue digital prescriptions

### For Laboratories
- **Test Management**: Manage available lab tests and pricing
- **Order Processing**: Handle test orders and results
- **Quality Control**: Maintain test standards

### Admin Dashboard
- **User Management**: Manage patients, doctors, and labs
- **Order Oversight**: Monitor all orders and payments
- **Analytics**: View platform statistics and reports
- **Content Management**: Manage drugs, tests, and system data

## 🛠️ Tech Stack

### Backend (Server)
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt, Google OAuth, Apple Sign-In
- **File Storage**: Cloudinary
- **Payments**: Stripe, Paymob
- **Email**: Nodemailer
- **Rate Limiting**: Express Rate Limit
- **Session Management**: Express Session with MongoDB store

### Frontend (Client)
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Bootstrap, Material-UI
- **State Management**: React Context
- **Forms**: Formik with Yup validation
- **Charts**: Chart.js, Recharts
- **PDF Generation**: jsPDF, React-PDF
- **Icons**: FontAwesome, Lucide React
- **Animations**: Framer Motion

### Admin Panel
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Forms**: Formik with Yup validation
- **Notifications**: React Hot Toast, React Toastify

### Mobile App
- **Framework**: React Native with Expo
- **Navigation**: Expo Router with React Navigation
- **UI Components**: Expo Vector Icons
- **Platform Support**: iOS, Android, Web

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Git**
- **Expo CLI** (for mobile development)

### Environment Variables

Create `.env` files in the respective directories with the following variables:

#### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/roshetta
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
PAYMOB_API_KEY=your_paymob_key
PAYMOB_HMAC_SECRET=your_paymob_hmac
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
APPLE_CLIENT_ID=your_apple_client_id
```

#### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Admin (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mohamedhamdy9966/roshetta.git
cd roshetta
```

### 2. Install Dependencies

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd ../client
npm install
```

#### Admin Panel
```bash
cd ../admin
npm install
```

#### Mobile App
```bash
cd ../mobile
npm install
```

### 3. Database Setup
Make sure MongoDB is running locally or update the connection string in `server/.env` for a cloud instance.

### 4. Run the Applications

#### Start Backend Server
```bash
cd server
npm run server  # Uses nodemon for development
# or
npm start       # Production mode
```
Server will run on `http://localhost:5000`

#### Start Client (Web App)
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

#### Start Admin Panel
```bash
cd admin
npm run dev
```
Admin will run on `http://localhost:5174`

#### Start Mobile App
```bash
cd mobile
npm start
```
Follow the Expo CLI instructions to run on device/emulator.

## 📱 API Documentation

The API endpoints are organized as follows:

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/doctors` - Doctor profiles and appointments
- `/api/labs` - Laboratory services
- `/api/drugs` - Drug catalog and orders
- `/api/orders` - Order management
- `/api/payments` - Payment processing
- `/api/admin` - Administrative functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**ITI Team**
- Mohamed Hamdy (Project Lead & Backend Developer)
- Team Members: [Ahmed Aamer Front-End developer, Ahmed Abd El Aziz Fronte-End Developer, Youssef Hesham Front-End Devloper]

## 📞 Support

For support, email mohamedhamdymansour2@gmail.com or create an issue in this repository.

---

**Note**: This is a graduation project developed for educational purposes. For production use, additional security measures and testing should be implemented.

### respect for PR all review
