import React from 'react';
import { Home, User, History, ShoppingCart, Package, Bell, MessageSquare, FileText } from 'lucide-react';

// Sidebar component: Provides navigation links for different sections of the application.
// It receives 'onNavigate' to change the main content view and 'activeView' to highlight the current section.
const Sidebar = ({ onNavigate, activeView }) => {
  const navItems = [
    { name: 'Menu', icon: Home, view: 'menu' }, // Changed from Dashboard to Menu as default for e-commerce
    { name: 'Profile', icon: User, view: 'profile' },
    { name: 'Order History', icon: History, view: 'orderHistory' },
    { name: 'Cart', icon: ShoppingCart, view: 'cart' },
    { name: 'Track Order', icon: Package, view: 'orderTracking' },
    { name: 'Notifications', icon: Bell, view: 'notifications' },
    { name: 'Feedback', icon: MessageSquare, view: 'feedback' },
    { name: 'Quote Request', icon: FileText, view: 'quoteRequest' },
    // Add more items here corresponding to your other components
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r border-pink-100 shadow-sm flex flex-col">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`flex items-center w-full py-2 px-3 rounded-lg text-left transition-colors duration-200 ${
              activeView === item.view
                ? 'bg-pink-100 text-pink-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-current={activeView === item.view ? 'page' : undefined}
          >
            <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      {/* Optional: Add a section for admin/delivery specific navigation if user roles are implemented */}
    </aside>
  );
};

export default Sidebar;
