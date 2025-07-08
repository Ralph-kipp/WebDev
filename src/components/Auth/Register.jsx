import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Heart, Check } from 'lucide-react';

// Register component: Handles user registration.
// It receives 'onNavigate' to switch between auth pages (login)
// and 'onRegisterSuccess' to signal successful registration to App.jsx.
const Register = ({ onNavigate, onRegisterSuccess }) => { // Added onRegisterSuccess prop
  // State management for form data, UI interactions, and messages
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    acceptTerms: false,
    receivePromotions: false
  });

  // UI state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state for loading and form submission status
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Controls multi-step form progression

  // State for displaying success or error messages to the user
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Handles changes to form input fields, updating the formData state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value // Handle checkboxes differently
    }));
  };

  // Handles the form submission logic
  const handleSubmit = async () => {
    // Basic validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Error: Passwords do not match. Please try again.');
      setMessageType('error');
      return; // Stop submission if passwords don't match
    }
    if (!formData.acceptTerms) {
        setMessage('You must accept the Terms of Service and Privacy Policy to register.');
        setMessageType('error');
        return;
    }

    setIsLoading(true); // Activate loading state
    setMessage(''); // Clear any previous messages
    setMessageType('');

    try {
      // Simulate an API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      console.log('Registration attempt:', formData); // Log form data for debugging

      // On successful registration, signal App.jsx to set isLoggedIn to true
      onRegisterSuccess();

    } catch (error) {
      // Handle potential API errors
      console.error('Registration failed:', error);
      setMessage('Registration failed. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false); // Deactivate loading state
    }
  };

  // Moves the form to the next step, if not on the last step
  const nextStep = () => {
    // Basic validation before moving to the next step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setMessage('Please fill in all personal information fields.');
        setMessageType('error');
        return;
      }
      // Simple email validation regex (can be more robust)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage('Please enter a valid email address.');
        setMessageType('error');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.password || !formData.confirmPassword || !formData.address) {
        setMessage('Please fill in all security and address fields.');
        setMessageType('error');
        return;
      }
      if (formData.password.length < 6) { // Example password strength
        setMessage('Password must be at least 6 characters long.');
        setMessageType('error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match.');
        setMessageType('error');
        return;
      }
    }
    setMessage(''); // Clear any previous messages
    setMessageType('');
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  // Moves the form to the previous step, if not on the first step
  const prevStep = () => {
    setMessage(''); // Clear any messages when navigating back
    setMessageType('');
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    // Main container for the registration page, applying full-screen background and centering
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full">
        {/* Logo and Brand Section: Displays the SweetBite logo and tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-200 rounded-full mb-4">
            <Heart className="w-8 h-8 text-pink-600 fill-current" aria-label="SweetBite logo heart icon" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SweetBite</h1>
          <p className="text-gray-600">Create your account to start ordering delicious treats!</p>
        </div>

        {/* Registration Form Card: The main container for the multi-step form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
          {/* Progress Steps Indicator: Shows the user their current position in the registration process */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                    step <= currentStep
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  aria-current={currentStep === step ? 'step' : undefined}
                >
                  {step < currentStep ? <Check className="w-4 h-4" aria-hidden="true" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                      step < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Message Display: Shows success or error messages to the user */}
          {message && (
            <div
              className={`p-3 mb-6 rounded-lg text-sm font-medium ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
              role="alert"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          {/* Step 1: Personal Information Form */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Personal Details</h2>
                <p className="text-gray-600 text-sm">Please tell us a bit about yourself.</p>
              </div>

              {/* Name Fields: First Name and Last Name inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                      placeholder="e.g., John"
                      aria-label="First Name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                    placeholder="e.g., Doe"
                    aria-label="Last Name"
                    required
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                    placeholder="e.g., john.doe@example.com"
                    aria-label="Email Address"
                    required
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                    placeholder="e.g., +1 (555) 123-4567"
                    aria-label="Phone Number"
                    required
                  />
                </div>
              </div>

              {/* Navigation Button for Step 1 */}
              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Continue to Security
              </button>
            </div>
          )}

          {/* Step 2: Password & Address Form */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Security & Delivery Address</h2>
                <p className="text-gray-600 text-sm">Set up your account password and primary delivery address.</p>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                    placeholder="Create a strong password (min. 6 characters)"
                    aria-label="Create Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                    placeholder="Re-enter your password to confirm"
                    aria-label="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Delivery Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" aria-hidden="true" />
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all resize-none"
                    placeholder="Enter your full delivery address (e.g., Street, City, Postal Code)"
                    aria-label="Delivery Address"
                    required
                  />
                </div>
              </div>

              {/* Navigation Buttons for Step 2 */}
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  Back to Personal Info
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  Review & Confirm
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Terms & Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Almost Done!</h2>
                <p className="text-gray-600 text-sm">Please review your details and confirm your registration.</p>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <label htmlFor="acceptTerms" className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600 bg-pink-50 border-pink-300 rounded focus:ring-pink-500 focus:ring-2 mt-1"
                    required
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the{' '}
                    <span
                      className="text-pink-600 hover:text-pink-800 font-medium cursor-pointer"
                      onClick={() => console.log('Terms of Service clicked')} // Simulate opening terms modal/page
                      role="button"
                      tabIndex="0"
                      aria-label="Read Terms of Service"
                    >
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span
                      className="text-pink-600 hover:text-pink-800 font-medium cursor-pointer"
                      onClick={() => console.log('Privacy Policy clicked')} // Simulate opening privacy modal/page
                      role="button"
                      tabIndex="0"
                      aria-label="Read Privacy Policy"
                    >
                      Privacy Policy
                    </span>
                  </span>
                </label>
              </div>

              {/* Promotional Emails Checkbox */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <label htmlFor="receivePromotions" className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    id="receivePromotions"
                    name="receivePromotions"
                    checked={formData.receivePromotions}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600 bg-pink-50 border-pink-300 rounded focus:ring-pink-500 focus:ring-2 mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I'd like to receive promotional emails about new products and special offers.
                  </span>
                </label>
              </div>

              {/* Account Summary: Displays a summary of the entered information */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <h3 className="font-medium text-gray-800 mb-3">Account Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="text-gray-800 font-semibold">{formData.firstName || '[Not entered]'} {formData.lastName || ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-800 font-semibold">{formData.email || '[Not entered]'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-800 font-semibold">{formData.phone || '[Not entered]'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="text-gray-800 font-semibold text-right max-w-[60%] truncate">{formData.address || '[Not entered]'}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons for Step 3 */}
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  Back to Security
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms || isLoading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}

          {/* Sign In Link: Provides an option for existing users to log in */}
          <div className="text-center mt-8 pt-6 border-t border-pink-100">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <span
                className="text-pink-600 hover:text-pink-800 font-medium cursor-pointer"
                onClick={() => onNavigate('login')} // Navigate to 'login' page
                role="link"
                tabIndex="0"
                aria-label="Sign in to your existing account"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
