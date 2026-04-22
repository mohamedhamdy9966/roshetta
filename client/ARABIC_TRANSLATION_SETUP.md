# 🌍 Arabic Translation Integration Guide

## Overview

Your Roshetta app now has full support for English and Arabic (RTL). This guide will help you complete the setup and integrate translations into your components.

## ✅ What's Already Done

1. ✅ **Translation files created** - All 10 JSON files in `src/locals/en/` and `src/locals/ar/`
2. ✅ **i18n configuration** - Setup in `src/i18n.js`
3. ✅ **Language Switcher component** - Ready to use
4. ✅ **RTL support** - Automatically switches between RTL (Arabic) and LTR (English)

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd client
npm install
```

This installs:

- `i18next` - Translation framework
- `react-i18next` - React integration
- `google-translate-api-x` - For future auto-translation updates

### Step 2: Add Language Switcher to Navbar

Edit your **Navbar.jsx**:

```jsx
import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">{t("common.roshetta")}</Link>

        {/* Other navbar items */}
        <Link to="/doctors">{t("pages.doctors.title")}</Link>
        <Link to="/labs">{t("pages.labs.title")}</Link>
        <Link to="/drugs">{t("pages.drugs.title")}</Link>

        {/* Add Language Switcher */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
```

### Step 3: Use Translations in Components

Edit any component (e.g., **Home.jsx**):

```jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("pages.home.ourTopSpecialists")}</h1>
      <p>{t("pages.home.bookWithOurExperts")}</p>
      <button>{t("buttons.bookNow")}</button>
    </div>
  );
};

export default Home;
```

### Step 4: Test It Out

```bash
npm run dev
```

- Open your app at http://localhost:5173
- Click the language switcher to toggle between English and Arabic
- The page should automatically:
  - Switch to RTL for Arabic
  - Update all text
  - Switch back to LTR for English

## 📖 Translation File Structure

Your translations are organized by category:

```
src/locals/
├── en/                          # English translations
│   ├── buttons.json            # All buttons
│   ├── common.json             # Common UI text
│   ├── pages.json              # Page-specific content
│   ├── auth.json               # Auth & medical history
│   ├── doctors.json            # Doctor specialties & bookings
│   ├── labs.json               # Lab services & tests
│   ├── drugs.json              # Drug categories & shopping
│   ├── static.json             # Privacy policy content
│   ├── payment.json            # Payment-related text
│   └── address.json            # Address form & governorates
└── ar/                          # Arabic translations (same structure)
```

## 📝 How to Use Translations in Components

### Basic Usage

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("common.roshetta")}</h1>;
}
```

### With Namespaces (more organized)

By default, `t()` searches in the 'common' namespace. To use other namespaces:

```jsx
function MyComponent() {
  const { t } = useTranslation();

  // Automatically from 'common' namespace
  t("roshetta");

  // Explicitly from other namespaces
  t("pages:pages.home.ourTopSpecialists");
  t("buttons:signUp");
  t("auth:signup.email");
}
```

### Dynamic Translations

```jsx
function Doctor({ specialty }) {
  const { t } = useTranslation();

  return <p>Specialty: {t(`doctors:specialties.${specialty}`)}</p>;
}
```

### Changing Language Programmatically

```jsx
function MyComponent() {
  const { i18n } = useTranslation();

  const switchToArabic = () => {
    i18n.changeLanguage("ar");
  };

  const switchToEnglish = () => {
    i18n.changeLanguage("en");
  };

  return (
    <>
      <button onClick={switchToArabic}>عربي</button>
      <button onClick={switchToEnglish}>English</button>
    </>
  );
}
```

## 🔄 Integration Checklist

Go through these components and update them:

### Priority 1 (User-facing pages)

- [ ] `pages/Home.jsx` - Hero section, specialties
- [ ] `pages/Doctors.jsx` - Doctor list, filters
- [ ] `pages/Labs.jsx` - Lab list, filters
- [ ] `pages/Drugs.jsx` - Drug list, categories
- [ ] `components/Navbar.jsx` - Navigation menu
- [ ] `components/Footer.jsx` - Footer links & content

### Priority 2 (Forms & Input)

- [ ] `pages/Login.jsx` - Login/signup forms
- [ ] `pages/MyProfile.jsx` - Profile edit form
- [ ] `components/AddAddress.jsx` - Address form (already has all address translations)

### Priority 3 (Pages & Features)

- [ ] `pages/About.jsx` - About page content
- [ ] `pages/Contact.jsx` - Contact page
- [ ] `pages/DoctorAppointment.jsx` - Appointment booking
- [ ] `pages/LabAppointment.jsx` - Lab appointment booking
- [ ] `pages/DrugOrder.jsx` - Drug ordering
- [ ] `pages/PaymentSuccess.jsx` - Payment feedback pages
- [ ] `pages/PaymentCancel.jsx`
- [ ] `pages/PaymentProcessing.jsx`

## 🌐 Translation Keys Reference

### Common Keys

```jsx
// Buttons
t("buttons.bookNow");
t("buttons.login");
t("buttons.signUp");
t("buttons.save");

// Navigation
t("common.home");
t("common.aboutUs");
t("common.contactUs");

// Messages
t("common.loading");
t("common.error");
t("common.success");
```

### Page-Specific Keys

```jsx
// Home page
t("pages.home.ourTopSpecialists");
t("pages.home.bookWithOurExperts");

// Auth
t("auth.signup.fullName");
t("auth.signup.email");
t("auth.validation.invalidEmail");

// Doctors
t("doctors.doctorProfile.experience");
t("doctors.specialties.cardiology");
```

See the JSON files for all available keys.

## 🎨 RTL CSS Handling

The app automatically:

1. Sets `document.documentElement.dir` to `rtl` for Arabic
2. Sets it to `ltr` for English
3. Saves preference to `localStorage`

### CSS for RTL Support

Use CSS custom properties or classes:

```css
/* You can use directional properties */
.container {
  margin-left: 10px; /* Works for LTR */
  margin-right: 10px; /* Works for RTL */
}

/* Or use logical properties (modern approach) */
.container {
  margin-inline-start: 10px; /* Automatically switches for RTL */
}

/* Or target RTL explicitly */
html[dir="rtl"] .sidebar {
  float: right;
  margin-right: 20px;
}
```

## 🤖 Updating/Adding More Translations

### Option 1: Manual Translation

Edit the JSON files directly. For medical terms, consult with a native Arabic-speaking medical professional.

### Option 2: Auto-Translation (Advanced)

If you add new English strings to `src/locals/en/`, you can auto-translate them:

1. Update the English JSON files
2. Run:

```bash
npm run translate
```

This uses Google Translate API to auto-translate all new strings (requires internet connection).

### Tips for Medical Translation

- Medical terms should be professionally translated
- Test translations with native Arabic speakers
- Some terms might need multiple variations depending on context
- British English medical terms differ from American - choose one standard

## 🔍 Available Translations

### Specialties (Doctors)

- Cardiology, Dermatology, Pediatrics, Orthopedics, Neurology, Psychiatry, Ophthalmology, Otolaryngology, General Practitioner, Dentistry, Urology, Gastroenterology, Pulmonology, Nephrology, Oncology

### Lab Tests

- Blood Test, Ultrasound, X-Ray, MRI, CT Scan, ECG, Echocardiogram

### Drug Categories

- Pain Relief, Cold and Flu, Digestion, Skin Care, Vitamins & Supplements, Antibiotics, Antacids

### Egyptian Governorates (22 provinces)

- Cairo, Alexandria, Giza, Dakahlia, Sharqia, Kalyubia, Kafr El-Sheikh, Beheira, Ismailia, Port Said, Suez, New Valley, Matrouh, Red Sea, Fayoum, Beni Suef, Minufiya, Qena, Sohag, Assiut, Luxor, Aswan

### Blood Types

- A+, A-, B+, B-, AB+, AB-, O+, O-

## 📱 Mobile App

For the mobile app, you can:

1. Use Expo's `i18n-js` or similar
2. Reference the same translation files if using React Native with appropriate loaders
3. Or create separate translation files for mobile

## 🐛 Troubleshooting

### Issue: Translations not showing

```jsx
// Check if i18n is initialized
import i18n from "./i18n";

// In your main.jsx, make sure i18n is imported BEFORE rendering
import "./i18n"; // This line should be at the top
```

### Issue: Language won't switch

```jsx
const { i18n } = useTranslation();
console.log(i18n.language); // Check current language
console.log(i18n.languages); // Should be ['en', 'ar']
```

### Issue: Missing translation key warning

```
i18next: key "buttons.notfound" for languages "ar" missing.
```

Add the key to your JSON files:

```json
// src/locals/en/buttons.json
{
  "notfound": "Not Found"
}

// src/locals/ar/buttons.json
{
  "notfound": "غير موجود"
}
```

## 📚 Resources

- [i18next documentation](https://www.i18next.com/)
- [react-i18next documentation](https://react.i18next.com/)
- [Right-to-Left (RTL) guide](https://www.w3.org/International/questions/qa-html-dir.en)

## ✨ Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Add LanguageSwitcher to your Navbar
3. ✅ Start integrating translations into components (use the checklist above)
4. ✅ Test thoroughly with both languages
5. ✅ Have native speakers review medical terminology

---

**Questions?** Check the translation files or refer to the examples in `src/components/TranslationExample.jsx`
