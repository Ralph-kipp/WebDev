import React from 'react';

// OrderHistory component: Displays past orders.
// It receives an 'onNavigate' prop if it needs to navigate to other sections.
const OrderHistory = ({ onNavigate }) => { // Added onNavigate prop
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Order History</h2>
      <p className="text-gray-600">View your past orders and their details.</p>
      {/* Add actual order history content here */}
      <div className="mt-6 space-y-4">
        <div className="border p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">Order #12345</p>
            <p className="text-sm text-gray-600">Date: 2025-07-08</p>
          </div>
          <span className="text-lg font-bold text-green-600">$25.00</span>
        </div>
        <div className="border p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">Order #12344</p>
            <p className="text-sm text-gray-600">Date: 2025-07-07</p>
          </div>
          <span className="text-lg font-bold text-green-600">$15.50</span>
        </div>
      </div>
      {/* Example navigation from Order History */}
      <button
        onClick={() => onNavigate('menu')}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default OrderHistory;
