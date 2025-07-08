import React from 'react';

// Cart component: Manages items in the shopping cart.
// It receives an 'onNavigate' prop to navigate to checkout or back to menu.
const Cart = ({ onNavigate }) => {
  // Example cart items (these would typically come from global state)
  const cartItems = [
    { id: 1, name: 'Chocolate Fudge Cake', price: 25.00, quantity: 1, imageUrl: 'https://placehold.co/80x60/FFC0CB/000000?text=Cake' },
    { id: 2, name: 'Vanilla Bean Cupcakes', price: 3.50, quantity: 3, imageUrl: 'https://placehold.co/80x60/FFB6C1/000000?text=Cupcakes' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-8 font-inter">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Shopping Cart</h1>
        <p className="text-gray-600 mb-8 text-center">Review your items before proceeding to checkout.</p>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
            <button
              onClick={() => onNavigate('menu')}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items List */}
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-pink-600 font-bold">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => console.log(`Remove ${item.name}`)} // Simulate remove item
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="bg-pink-50 rounded-lg p-6 border border-pink-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax ({taxRate * 100}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-pink-200 pt-3">
                <span>Total:</span>
                <span className="text-pink-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => onNavigate('menu')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => onNavigate('checkout')} // Navigate to Checkout page
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; // <--- THIS LINE IS CRUCIAL
