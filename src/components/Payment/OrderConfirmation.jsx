import React from 'react';
import { CheckCircle } from 'lucide-react';

// OrderConfirmation component: Displays details after a successful order.
// It receives an 'onNavigate' prop to allow navigation back to the menu or order history.
const OrderConfirmation = ({ onNavigate }) => {
  // Example order details (these would typically come from state or props after checkout)
  const orderId = 'SB-20250708-001';
  const totalAmount = '45.75';
  const estimatedDelivery = '30-45 minutes';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-green-100 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-700 mb-2">Thank you for your SweetBite order!</p>
        <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-left space-y-2 mb-8">
          <p className="text-gray-700">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Total Amount:</span> ${totalAmount}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Estimated Delivery:</span> {estimatedDelivery}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('menu')}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => onNavigate('orderHistory')} // Navigate to OrderHistory page
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
