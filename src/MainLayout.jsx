import React, { useState } from 'react';
import Header from './components/shared/Header';
import Sidebar from './components/shared/Sidebar';

// Import all the pages that will be accessible within the main authenticated layout
import Menu from './components/pages/Menu';
import ProductDetails from './components/shopping/ProductDetails';
import Cart from './components/shopping/Cart';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/payment/OrderConfirmation';
import Profile from './components/customer/Profile';
import OrderHistory from './components/customer/OrderHistory';
// Add imports for other components as you create them (e.g., Notifications, Feedback, AdminDashboard)
// import Notifications from './components/customer/Notifications';
// import Feedback from './components/customer/Feedback';
// import QuoteRequest from './components/customer/QuoteRequest';
// import OrderTracking from './components/customer/OrderTracking';


// MainLayout component: This acts as the main dashboard for authenticated users.
// It includes a Header, Sidebar (optional), and a dynamic content area.
// It receives 'onLogout' from App.jsx to handle logging out.
const MainLayout = ({ onLogout }) => {
  // State to manage which specific view/page is currently active within MainLayout.
  // 'menu' is a common default for an e-commerce app after login.
  const [currentView, setCurrentView] = useState('menu');

  // Function to navigate between different views/pages within the MainLayout.
  // This function will be passed to Header and other components for internal navigation.
  const handleInternalNavigate = (viewName) => {
    setCurrentView(viewName);
  };

  // Renders the appropriate component based on the 'currentView' state.
  // This switch statement defines the internal navigation logic for the authenticated part of the app.
  const renderContent = () => {
    switch (currentView) {
      case 'menu':
        return <Menu onNavigate={handleInternalNavigate} />;
      case 'productDetails':
        // In a real app, you'd pass a productId here:
        // return <ProductDetails productId={someId} onNavigate={handleInternalNavigate} />;
        return <ProductDetails onNavigate={handleInternalNavigate} />;
      case 'cart':
        return <Cart onNavigate={handleInternalNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleInternalNavigate} />;
      case 'orderConfirmation':
        return <OrderConfirmation onNavigate={handleInternalNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleInternalNavigate} />;
      case 'orderHistory':
        return <OrderHistory onNavigate={handleInternalNavigate} />;
      // Add more cases for all your other components here from the provided list
      // case 'notifications': return <Notifications onNavigate={handleInternalNavigate} />;
      // case 'feedback': return <Feedback onNavigate={handleInternalNavigate} />;
      // case 'quoteRequest': return <QuoteRequest onNavigate={handleInternalNavigate} />;
      // case 'orderTracking': return <OrderTracking onNavigate={handleInternalNavigate} />;


      default:
        // Fallback to the menu page or a "Not Found" message if an unknown viewName is encountered.
        return (
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">View Not Found</h2>
            <p className="text-gray-600">The requested section could not be loaded. Please select an option from the header or sidebar.</p>
            <button
              onClick={() => handleInternalNavigate('menu')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to Menu
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
      {/* Header component: Always visible at the top.
          It receives handleInternalNavigate for internal page changes and onLogout for logging out of the app. */}
      <Header onNavigate={handleInternalNavigate} onLogout={onLogout} />

      <div className="flex flex-1">
        {/* Sidebar component: Optional, but good for secondary navigation.
            It also receives handleInternalNavigate. */}
        <Sidebar onNavigate={handleInternalNavigate} activeView={currentView} />

        {/* Main content area: This is where the currently selected page/view is rendered. */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;