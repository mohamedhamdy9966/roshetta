/**
 * QUICK INTEGRATION EXAMPLES
 * 
 * Copy-paste these snippets into your components to add translations
 */

// ============================================
// EXAMPLE 1: Update Navbar.jsx
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">{t('common.roshetta')}</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/">{t('common.home')}</Link>
        <Link to="/doctors">{t('pages.doctors.title')}</Link>
        <Link to="/labs">{t('pages.labs.title')}</Link>
        <Link to="/drugs">{t('pages.drugs.title')}</Link>
        <Link to="/about">{t('common.aboutUs')}</Link>
        <Link to="/contact">{t('common.contactUs')}</Link>
        <Link to="/login">{t('buttons.login')}</Link>
      </div>
      
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;


// ============================================
// EXAMPLE 2: Update Home.jsx
// ============================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>{t('common.premiumHealthcare')}</h1>
        <p>{t('common.atYourFingertips')}</p>
        <p className="subtitle">{t('common.trustedByThousands')}</p>
        <button onClick={() => navigate('/doctors')}>
          {t('buttons.bookNow')}
        </button>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <h2>{t('pages.home.ourTopSpecialists')}</h2>
        <p>{t('pages.home.bookWithOurExperts')}</p>
        <button>{t('buttons.viewAllDoctors')}</button>
      </section>

      {/* Specialties Section */}
      <section className="specialties-section">
        <h2>{t('pages.home.findBySpecialty')}</h2>
        <p>{t('pages.home.simplyBrowse')}</p>
        <div className="specialties-grid">
          {/* Add specialty cards */}
        </div>
      </section>
    </div>
  );
};

export default Home;


// ============================================
// EXAMPLE 3: Update Login.jsx
// ============================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>{t('auth.login.title')}</h1>
        
        <input
          type="email"
          placeholder={t('auth.signup.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword 
              ? t('auth.login.hidePassword') 
              : t('auth.login.showPassword')
            }
          </button>
        </div>

        <label>
          <input type="checkbox" />
          {t('auth.login.rememberMe')}
        </label>

        <button type="submit">{t('buttons.login')}</button>
        
        <p>
          {t('auth.login.noAccount')}
          <button type="button" onClick={() => navigate('/signup')}>
            {t('auth.login.signUpHere')}
          </button>
        </p>

        <button type="button" onClick={() => navigate('/forgot-password')}>
          {t('auth.login.forgotPassword')}
        </button>
      </form>
    </div>
  );
};

export default Login;


// ============================================
// EXAMPLE 4: Update Doctors.jsx
// ============================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Doctors = () => {
  const { t } = useTranslation();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [
    'cardiology', 'dermatology', 'pediatrics', 'orthopedics', 'neurology',
    'psychiatry', 'ophthalmology', 'otolaryngology', 'generalPractitioner'
  ];

  return (
    <div className="doctors-page">
      <h1>{t('pages.doctors.title')}</h1>

      {/* Filter by Specialty */}
      <div className="filters">
        <label>{t('pages.doctors.specialties')}:</label>
        <select 
          value={selectedSpecialty} 
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">{t('common.filter')}</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>
              {t(`doctors:specialties.${spec}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="doctors-grid">
        {/* For each doctor, show: */}
        <div className="doctor-card">
          <h3>{/* doctor.name */}</h3>
          <p>{t(`doctors:specialties.cardiology`)}</p>
          <p>
            {/* doctor.experience */} {t('pages.doctors.experience')}
          </p>
          <p>{/* doctor.consultationFee */} EGP</p>
          <button>{t('buttons.bookAppointment')}</button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;


// ============================================
// EXAMPLE 5: Update AddAddress Component
// ============================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddAddress = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    type: 'home',
    street: '',
    apartment: '',
    city: '',
    governorate: '',
    postalCode: ''
  });

  const governorates = [
    'cairo', 'alexandria', 'giza', 'dakahlia', 'sharqia', 'kalyubia',
    'kafrelSheikh', 'beheira', 'ismailia', 'portSaid', 'suez',
    'newValley', 'matrouh', 'redsea', 'fayoum', 'beniSuef',
    'minufiya', 'qena', 'sohag', 'assiut', 'luxor', 'aswan'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic
  };

  return (
    <div className="add-address-form">
      <h2>{t('address:form.title')}</h2>

      <form onSubmit={handleSubmit}>
        {/* Address Type */}
        <div>
          <label>{t('address:form.addressType')}:</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="home">{t('address:form.home')}</option>
            <option value="work">{t('address:form.work')}</option>
            <option value="other">{t('address:form.other')}</option>
          </select>
        </div>

        {/* Street Address */}
        <input
          type="text"
          placeholder={t('address:form.streetAddress')}
          value={formData.street}
          onChange={(e) => setFormData({...formData, street: e.target.value})}
          required
        />

        {/* Apartment Number */}
        <input
          type="text"
          placeholder={t('address:form.apartmentNumber')}
          value={formData.apartment}
          onChange={(e) => setFormData({...formData, apartment: e.target.value})}
        />

        {/* Governorate */}
        <select
          value={formData.governorate}
          onChange={(e) => setFormData({...formData, governorate: e.target.value})}
          required
        >
          <option value="">{t('address:form.governorate')}</option>
          {governorates.map(gov => (
            <option key={gov} value={gov}>
              {t(`address:governorates.${gov}`)}
            </option>
          ))}
        </select>

        {/* City */}
        <input
          type="text"
          placeholder={t('address:form.city')}
          value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
          required
        />

        {/* Postal Code */}
        <input
          type="text"
          placeholder={t('address:form.postalCode')}
          value={formData.postalCode}
          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
        />

        {/* Save as Default */}
        <label>
          <input type="checkbox" />
          {t('address:form.saveAsDefault')}
        </label>

        <button type="submit">{t('address:form.addAddress')}</button>
      </form>
    </div>
  );
};

export default AddAddress;


// ============================================
// EXAMPLE 6: Update Footer.jsx
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>{t('common.roshetta')}</h3>
          <p>{t('common.description')}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>{t('common.home')}</h4>
          <nav>
            <Link to="/">{t('common.home')}</Link>
            <Link to="/about">{t('common.aboutUs')}</Link>
            <Link to="/contact">{t('common.contactUs')}</Link>
            <Link to="/privacypolicy">{t('common.privacyPolicy')}</Link>
          </nav>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>{t('common.contactUs')}</h4>
          <p>📞 {t('common.phone')}</p>
          <p>✉️ {t('common.email')}</p>
          <p>📍 {t('common.location')}</p>
        </div>

        {/* Emergency */}
        <div className="footer-section">
          <h4>{t('common.emergency')}</h4>
          <p>{t('common.phone')}</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>{t('common.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;

