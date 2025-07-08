import React from 'react';
import { Heart, ShoppingCart, UserCircle } from 'lucide-react';

// Header component: Displays the SweetBite logo, a cart icon, and a user profile icon.
// It receives an 'onNavigate' prop (from MainLayout) to navigate to different sections
// and an 'onLogout' prop (from MainLayout, ultimately from App.jsx) to log out.
const Header = ({ onNavigate, onLogout }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-pink-100">
      {/* Logo and Brand Name - Clicking takes user to the main menu/dashboard */}
      <div className="flex items-center cursor-pointer" onClick={() => onNavigate('menu')} aria-label="Go to Menu">
        <Heart className="w-8 h-8 text-pink-600 fill-current mr-2" />
        <span className="text-2xl font-bold text-gray-800">SweetBite</span>
      </div>

      {/* Navigation Icons - Allow free navigation between main sections */}
      <nav className="flex items-center space-x-6">
        <button
          onClick={() => onNavigate('menu')} // Navigate to Menu
          className="text-gray-600 hover:text-pink-600 transition-colors hidden sm:block" // Hide on small screens if sidebar is present
          aria-label="View Menu"
        >
          Menu
        </button>
        <button
          onClick={() => onNavigate('cart')} // Navigate to Cart
          className="relative text-gray-600 hover:text-pink-600 transition-colors"
          aria-label="View Shopping Cart"
        >
          <ShoppingCart className="w-6 h-6" />
          {/* Example: Cart item count (can be dynamic based on actual cart state) */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button
          onClick={() => onNavigate('profile')} // Navigate to Profile
          className="text-gray-600 hover:text-pink-600 transition-colors"
          aria-label="View Profile"
        >
          <UserCircle className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate('orderHistory')} // Navigate to Order History
          className="text-gray-600 hover:text-pink-600 transition-colors hidden md:block" // Optional: Hide on smaller screens
          aria-label="View Order History"
        >
          Orders
        </button>
        <button
          onClick={onLogout} // Trigger the logout function from App.jsx
          className="bg-pink-500 text-white py-1.5 px-4 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
          aria-label="Log out"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
