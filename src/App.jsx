import React, { useState } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import MainLayout from './MainLayout'; // Import the new MainLayout component

// App component: The main entry point of your application.
// It manages the overall authentication state and renders either auth forms or the main app.
const App = () => {
  // State to track if the user is authenticated.
  // In a real app, this would be managed by actual authentication tokens/sessions.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false by default

  // State to determine which authentication-related page to show initially.
  const [authPage, setAuthPage] = useState('login'); // Start with login page

  // Function to handle successful login/registration.
  // This will be passed to Login/Register components to transition to the main app.
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout.
  // This will be passed to MainLayout and then to Header to allow logging out.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthPage('login'); // Go back to login page after logout
  };

  // Renders the appropriate top-level component based on authentication state.
  const renderAppContent = () => {
    if (isLoggedIn) {
      // If logged in, show the MainLayout (which handles internal app navigation)
      return <MainLayout onLogout={handleLogout} />;
    } else {
      // If not logged in, show the appropriate authentication page
      switch (authPage) {
        case 'login':
          // Pass handleLoginSuccess to Login, and setAuthPage for navigation within auth flow
          return <Login onNavigate={setAuthPage} onLoginSuccess={handleLoginSuccess} />;
        case 'register':
          // Pass handleLoginSuccess to Register, and setAuthPage for navigation within auth flow
          return <Register onNavigate={setAuthPage} onRegisterSuccess={handleLoginSuccess} />;
        case 'forgotPassword':
          // Pass setAuthPage for navigation within auth flow
          return <ForgotPassword onNavigate={setAuthPage} />;
        default:
          return <Login onNavigate={setAuthPage} onLoginSuccess={handleLoginSuccess} />;
      }
    }
  };

  return (
    // The main container for the entire application.
    <div className="App">
      {renderAppContent()}
    </div>
  );
};

export default App;
