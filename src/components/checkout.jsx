import React, { useState } from 'react';
import { CreditCard, Truck, MapPin, Shield, Clock, Check, Heart, Star } from 'lucide-react';
const SweetBitesCheckout = () => {
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Kenya'
  });

  // Existing customer information
  const customerInfo = {
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+254 712 345 678'
  };

  // Current delivery address
  const currentAddress = {
    address: '123 Westlands Avenue, Apartment 4B',
    city: 'Nairobi',
    postalCode: '00100',
    country: 'Kenya',
    label: 'Home'
  };

  // Sample dessert cart items
  const cartItems = [
    { id: 1, name: 'Chocolate Fudge Brownie', price: 12.99, quantity: 2, image: '🍫', category: 'Brownies' },
    { id: 2, name: 'Strawberry Cheesecake', price: 18.99, quantity: 1, image: '🍰', category: 'Cheesecakes' },
    { id: 3, name: 'Vanilla Cupcake (6-pack)', price: 15.99, quantity: 1, image: '🧁', category: 'Cupcakes' },
    { id: 4, name: 'Chocolate Chip Cookies', price: 8.99, quantity: 1, image: '🍪', category: 'Cookies' }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Sweet Standard',
      description: 'Fresh delivery in 3-5 days',
      price: 4.99,
      icon: '🚚',
      badge: 'Most Popular'
    },
    {
      id: 'express',
      name: 'Sugar Rush Express',
      description: 'Quick delivery in 1-2 days',
      price: 9.99,
      icon: '⚡',
      badge: 'Fast'
    },
    {
      id: 'same-day',
      name: 'Sweet Emergency',
      description: 'Same day delivery',
      price: 19.99,
      icon: '🎯',
      badge: 'Urgent'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOptions.find(option => option.id === selectedDelivery)?.price || 0;
  const tax = subtotal * 0.16; // 16% VAT for Kenya
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎉 Sweet! Your order has been placed successfully! Total: $${total.toFixed(2)}`);
  };

  const handlePickDifferentAddress = () => {
    setShowAddressForm(true);
  };

  const handleChooseOnMap = () => {
    alert('📍 Opening map to select delivery location...');
    // Here you would integrate with a map service like Google Maps
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      cvv: value
    }));
  };

  const handleSaveAddress = () => {
    if (formData.address && formData.city && formData.postalCode) {
      setShowAddressForm(false);
      alert('📍 Address saved successfully!');
    } else {
      alert('Please fill in all address fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-orange-500 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🍰</div>
              <div>
                <h1 className="text-2xl font-bold">SweetBites</h1>
                <p className="text-pink-100">Almost there! Complete your sweet order</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Cart</span>
              <span>→</span>
              <span className="bg-white text-pink-600 px-3 py-1 rounded-full font-semibold">Checkout</span>
              <span>→</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Enjoy!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Contact Information - Display Only */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full p-2 mr-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mr-3">👤</div>
                  <div>
                    <div className="font-semibold text-gray-800">{customerInfo.firstName} {customerInfo.lastName}</div>
                    <div className="text-sm text-gray-600">Customer</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mr-3">📧</div>
                  <div>
                    <div className="font-semibold text-gray-800">{customerInfo.email}</div>
                    <div className="text-sm text-gray-600">Email</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mr-3">📱</div>
                  <div>
                    <div className="font-semibold text-gray-800">{customerInfo.phone}</div>
                    <div className="text-sm text-gray-600">Phone</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full p-2 mr-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
              </div>
              
              {!showAddressForm ? (
                <div className="space-y-4">
                  {/* Current Address Display */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">🏠</div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-bold text-gray-800">{currentAddress.label}</span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-2">Selected</span>
                        </div>
                        <div className="text-gray-700 font-medium">{currentAddress.address}</div>
                        <div className="text-gray-600 text-sm">
                          {currentAddress.city}, {currentAddress.postalCode}
                        </div>
                        <div className="text-gray-600 text-sm">{currentAddress.country}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handlePickDifferentAddress}
                      className="flex items-center justify-center px-4 py-3 border-2 border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all"
                    >
                      <div className="text-lg mr-2">📍</div>
                      Pick Different Address
                    </button>
                    <button
                      onClick={handleChooseOnMap}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      <div className="text-lg mr-2">🗺️</div>
                      Choose on Map
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Enter new delivery address</span>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                    />
                  </div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                  </select>
                  <button
                    onClick={handleSaveAddress}
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-orange-600 transition-all"
                  >
                    Save Address
                  </button>
                </div>
              )}
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full p-2 mr-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Delivery Options</h2>
              </div>
              <div className="space-y-4">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedDelivery(option.id)}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                      selectedDelivery === option.id
                        ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-orange-50 shadow-md'
                        : 'border-pink-200 hover:border-pink-300'
                    }`}
                  >
                    {option.badge && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {option.badge}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">{option.icon}</div>
                        <div>
                          <div className="font-bold text-gray-800">{option.name}</div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {option.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-pink-600">${option.price.toFixed(2)}</div>
                        {selectedDelivery === option.id && (
                          <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full p-2 mr-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`p-4 border-2 rounded-xl text-center transition-all transform hover:scale-105 ${
                      selectedPayment === 'card'
                        ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-orange-50 text-pink-700'
                        : 'border-pink-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="font-semibold">Credit Card</div>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('mpesa')}
                    className={`p-4 border-2 rounded-xl text-center transition-all transform hover:scale-105 ${
                      selectedPayment === 'mpesa'
                        ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-orange-50 text-pink-700'
                        : 'border-pink-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">📱</div>
                    <div className="font-semibold">M-Pesa</div>
                  </button>
                </div>

                {selectedPayment === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        maxLength="5"
                        className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleCvvChange}
                        maxLength="3"
                        className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === 'mpesa' && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📱</div>
                      <div>
                        <p className="font-semibold text-green-800">M-Pesa Payment</p>
                        <p className="text-sm text-green-700">
                          You'll receive a prompt on your phone to complete the payment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 sticky top-4">
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-3">🛒</div>
                <h2 className="text-xl font-bold text-gray-800">Your Sweet Order</h2>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{item.name}</div>
                      <div className="text-sm text-pink-600 font-medium">{item.category}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-pink-600">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-gray-500">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t-2 border-pink-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (VAT 16%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-pink-200 pt-3 flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center text-sm text-gray-600 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                <span>🔒 Secure checkout with SSL encryption</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                🎉 Complete Sweet Order - ${total.toFixed(2)}
              </button>

              {/* Satisfaction Guarantee */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  100% Satisfaction Guarantee • Fresh & Delicious Promise
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <h3 className="font-bold text-gray-800 mb-4 text-center">Why Choose SweetBites?</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-semibold text-gray-700">Award Winning</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mb-2">🌟</div>
                  <div className="text-sm font-semibold text-gray-700">5-Star Reviews</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="text-sm font-semibold text-gray-700">Fast Delivery</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-2xl mb-2">💝</div>
                  <div className="text-sm font-semibold text-gray-700">Gift Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetBitesCheckout;