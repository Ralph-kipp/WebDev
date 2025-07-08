import React, { useState, useEffect } from 'react';

const SweetDelightsDashboardSystem = () => {
  const [currentView, setCurrentView] = useState('registration');
  const [currentStep, setCurrentStep] = useState(1);
  const [userRole, setUserRole] = useState('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    // Registration fields
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    
    // Profile fields
    city: '',
    sugar: '',
    dietary: [],
    otherPreferences: '',
    referral: '',
    
    // Staff login fields
    staffId: '',
    department: '',
    workEmail: '',
    workPhone: '',
    role: 'chef'
  });
  
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const cities = [
    'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'meru',
    'thika', 'malindi', 'machakos', 'kitale', 'garissa', 'nyeri'
  ];

  const dietaryOptions = [
    { id: 'glutenFree', value: 'gluten-free', label: 'Gluten-Free' },
    { id: 'vegan', value: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', value: 'vegetarian', label: 'Vegetarian' },
    { id: 'lactoseFree', value: 'lactose-free', label: 'Lactose-Free' },
    { id: 'nutFree', value: 'nut-free', label: 'Nut-Free' },
    { id: 'keto', value: 'keto', label: 'Keto' }
  ];

  const referralOptions = [
    { value: 'google', label: 'Google Search' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'friend', label: 'Friend/Family Referral' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'blog', label: 'Blog/Article' },
    { value: 'email', label: 'Email Newsletter' },
    { value: 'event', label: 'Event/Conference' },
    { value: 'other', label: 'Other' }
  ];

  const departments = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'administration', label: 'Administration' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'management', label: 'Management' }
  ];

  const staffRoles = [
    { value: 'chef', label: 'Chef' },
    { value: 'delivery-agent', label: 'Delivery Agent' },
    { value: 'administrator', label: 'Administrator' },
    { value: 'manager', label: 'Manager' }
  ];

  const sugarDescriptions = {
    '1': 'No sugar - Pure and natural',
    '2': 'Light sweetness - Just a hint',
    '3': 'Moderate sweetness - Balanced',
    '4': 'Sweet - Satisfying sweetness',
    '5': 'Very sweet - Maximum sweetness'
  };

  useEffect(() => {
    const password = formData.password;
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        dietary: checked 
          ? [...prev.dietary, value]
          : prev.dietary.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, phone, username, password } = formData;
    const allRequirements = Object.values(passwordRequirements).every(req => req);
    
    return firstName && lastName && email && phone && username && password && allRequirements;
  };

  const validateStep2 = () => {
    const { city, sugar, referral } = formData;
    return city && sugar && referral;
  };

  const validateStaffLogin = () => {
    const { staffId, department, workEmail, workPhone, role } = formData;
    return staffId && department && workEmail && workPhone && role;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    } else {
      alert('Please fill in all required fields and meet password requirements');
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsLoggedIn(true);
      setUserRole('customer');
      setCurrentView('dashboard');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    if (validateStaffLogin()) {
      setIsLoggedIn(true);
      setUserRole(formData.role);
      setCurrentView('dashboard');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
    setUserRole('customer');
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('registration');
    setCurrentStep(1);
    setFormData({
      firstName: '', middleName: '', lastName: '', email: '', phone: '', username: '', password: '',
      city: '', sugar: '', dietary: [], otherPreferences: '', referral: '',
      staffId: '', department: '', workEmail: '', workPhone: '', role: 'chef'
    });
  };

  const getStepClass = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'inactive';
  };

  const getConnectorClass = (step) => {
    return step < currentStep ? 'completed' : '';
  };

  const RequirementItem = ({ isValid, text }) => (
    <div className={`flex items-center mb-2 text-sm transition-all duration-300 ${isValid ? 'opacity-70' : ''}`}>
      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center text-xs transition-all duration-300 ${
        isValid ? 'bg-green-500 text-white' : 'bg-white bg-opacity-20 text-white'
      }`}>
        {isValid ? '✓' : '✗'}
      </div>
      <span>{text}</span>
    </div>
  );

  // Customer Dashboard
  const CustomerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome back, {formData.firstName}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🛒</div>
            <h3 className="font-semibold text-pink-600">Active Orders</h3>
            <p className="text-2xl font-bold text-pink-600">3</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-pink-600">Loyalty Points</h3>
            <p className="text-2xl font-bold text-pink-600">1,250</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold text-pink-600">Favorite Items</h3>
            <p className="text-2xl font-bold text-pink-600">12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Browse Menu
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Track Order
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Order History
            </button>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Profile Summary</h3>
          <div className="space-y-2 text-white">
            <p><strong>City:</strong> {formData.city.charAt(0).toUpperCase() + formData.city.slice(1)}</p>
            <p><strong>Sugar Preference:</strong> {formData.sugar}/5</p>
            <p><strong>Dietary Preferences:</strong> {formData.dietary.length > 0 ? formData.dietary.join(', ') : 'None'}</p>
            <button className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Chef Dashboard
  const ChefDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-4">Chef Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-pink-600">Pending Orders</h3>
            <p className="text-2xl font-bold text-pink-600">8</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-pink-600">In Progress</h3>
            <p className="text-2xl font-bold text-pink-600">5</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold text-pink-600">Completed Today</h3>
            <p className="text-2xl font-bold text-pink-600">23</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-pink-600">Avg. Prep Time</h3>
            <p className="text-2xl font-bold text-pink-600">12m</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Kitchen Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              View Order Queue
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Update Order Status
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Inventory Check
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Recipe Book
            </button>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Current Orders</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1234</p>
              <p className="text-sm">Chocolate Cake - Priority</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1235</p>
              <p className="text-sm">Fruit Tart - Regular</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1236</p>
              <p className="text-sm">Cupcake Set - Regular</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Administrator Dashboard
  const AdministratorDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-4">Administrator Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-pink-600">Total Users</h3>
            <p className="text-2xl font-bold text-pink-600">1,247</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-pink-600">Daily Orders</h3>
            <p className="text-2xl font-bold text-pink-600">156</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💼</div>
            <h3 className="font-semibold text-pink-600">Staff Members</h3>
            <p className="text-2xl font-bold text-pink-600">45</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-pink-600">Revenue Today</h3>
            <p className="text-2xl font-bold text-pink-600">$2,340</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">System Management</h3>
          <div className="space-y-3">
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              User Management
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Staff Management
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Order Analytics
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              System Settings
            </button>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">New user registration</p>
              <p className="text-sm">john.doe@email.com - 2 min ago</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order completed</p>
              <p className="text-sm">Order #1234 - 5 min ago</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Staff login</p>
              <p className="text-sm">Chef Mary - 10 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Delivery Agent Dashboard
  const DeliveryAgentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-4">Delivery Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold text-pink-600">Ready for Pickup</h3>
            <p className="text-2xl font-bold text-pink-600">6</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="font-semibold text-pink-600">In Transit</h3>
            <p className="text-2xl font-bold text-pink-600">3</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold text-pink-600">Delivered Today</h3>
            <p className="text-2xl font-bold text-pink-600">18</p>
          </div>
          <div className="bg-yellow-50 bg-opacity-80 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold text-pink-600">Rating</h3>
            <p className="text-2xl font-bold text-pink-600">4.9</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Delivery Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              View Available Orders
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Update Delivery Status
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Navigation & Routes
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Delivery History
            </button>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30">
          <h3 className="text-xl font-bold text-white mb-4">Active Deliveries</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1234</p>
              <p className="text-sm">Westlands - ETA: 15 min</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1235</p>
              <p className="text-sm">Karen - ETA: 25 min</p>
            </div>
            <div className="bg-yellow-50 bg-opacity-50 rounded-xl p-3 text-gray-700">
              <p className="font-semibold">Order #1236</p>
              <p className="text-sm">Kilimani - ETA: 30 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case 'customer':
        return <CustomerDashboard />;
      case 'chef':
        return <ChefDashboard />;
      case 'administrator':
        return <AdministratorDashboard />;
      case 'delivery-agent':
        return <DeliveryAgentDashboard />;
      default:
        return <CustomerDashboard />;
    }
  };

  if (currentView === 'dashboard' && isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 p-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white border-opacity-30">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white font-serif">Sweet Delights</h1>
                <p className="text-white text-opacity-80 capitalize">{userRole.replace('-', ' ')} Dashboard</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white font-semibold">{formData.firstName} {formData.lastName}</p>
                  <p className="text-white text-opacity-80 text-sm">{formData.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 border border-white border-opacity-30"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {renderDashboard()}
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-5">
        <div className="bg-white bg-opacity-20 backdrop-blur-3xl rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white border-opacity-30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-2 font-serif tracking-wide">Welcome Back</h1>
            <p className="text-white text-opacity-90 text-lg italic">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Username or Email</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white border-opacity-30 hover:border-opacity-50 text-lg uppercase tracking-wide"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-white border-opacity-20">
            <p className="text-white text-opacity-90">
              Don't have an account? 
              <button 
                onClick={() => setCurrentView('registration')}
                className="text-white font-semibold ml-2 hover:underline transition-all duration-300"
              >
                Register here
              </button>
            </p>
            <p className="text-white text-opacity-90 mt-2">
              Are you a staff member? 
              <button 
                onClick={() => setCurrentView('staff-login')}
                className="text-white font-semibold ml-2 hover:underline transition-all duration-300"
              >
                Staff Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'staff-login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-5">
        <div className="bg-white bg-opacity-20 backdrop-blur-3xl rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white border-opacity-30">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-2 font-serif tracking-wide">Staff Portal</h1>
            <p className="text-white text-opacity-90 text-lg italic">Enter your work credentials</p>
          </div>

          <form onSubmit={handleStaffLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Staff ID</label>
              <input
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                placeholder="Enter your staff ID"
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              >
                <option value="">Select your department</option>
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              >
                <option value="">Select your role</option>
                {staffRoles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Work Email</label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleInputChange}
                placeholder="Enter your work email"
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Work Phone</label>
              <input
                type="tel"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleInputChange}
                placeholder="Enter your work phone"
                className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white border-opacity-30 hover:border-opacity-50 text-lg uppercase tracking-wide"
            >
              Access Staff Portal
            </button>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-white border-opacity-20">
            <p className="text-white text-opacity-90">
              Not a staff member? 
              <button 
                onClick={() => setCurrentView('login')}
                className="text-white font-semibold ml-2 hover:underline transition-all duration-300"
              >
                Customer Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-5">
        <div className="bg-white bg-opacity-20 backdrop-blur-3xl rounded-3xl p-12 max-w-md w-full shadow-2xl border border-white border-opacity-30 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">Welcome!</h1>
          <p className="text-white text-opacity-90 text-lg mb-8">
            Your Sweet Delights account has been created successfully. Get ready for a delicious journey!
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => {
                setIsLoggedIn(true);
                setUserRole('customer');
                setCurrentView('dashboard');
              }}
              className="w-full bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => {
                setCurrentStep(1); 
                setFormData({
                  firstName: '', middleName: '', lastName: '', email: '', phone: '', username: '', password: '',
                  city: '', sugar: '', dietary: [], otherPreferences: '', referral: '',
                  staffId: '', department: '', workEmail: '', workPhone: '', role: 'chef'
                });
              }}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-5">
      <div className="bg-white bg-opacity-20 backdrop-blur-3xl rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white border-opacity-30 animate-fade-in">
        
        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base mx-2 transition-all duration-300 ${
            getStepClass(1) === 'completed' ? 'bg-yellow-100 text-pink-600 shadow-lg' :
            getStepClass(1) === 'active' ? 'bg-pink-600 text-white transform scale-110 shadow-lg' :
            'bg-white bg-opacity-50 text-gray-400'
          }`}>
            1
          </div>
          <div className={`w-10 h-0.5 ${getConnectorClass(1) ? 'bg-yellow-100' : 'bg-white bg-opacity-30'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base mx-2 transition-all duration-300 ${
            getStepClass(2) === 'completed' ? 'bg-yellow-100 text-pink-600 shadow-lg' :
            getStepClass(2) === 'active' ? 'bg-pink-600 text-white transform scale-110 shadow-lg' :
            'bg-white bg-opacity-50 text-gray-400'
          }`}>
            2
          </div>
          <div className={`w-10 h-0.5 ${getConnectorClass(2) ? 'bg-yellow-100' : 'bg-white bg-opacity-30'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base mx-2 transition-all duration-300 ${
            getStepClass(3) === 'completed' ? 'bg-yellow-100 text-pink-600 shadow-lg' :
            getStepClass(3) === 'active' ? 'bg-pink-600 text-white transform scale-110 shadow-lg' :
            'bg-white bg-opacity-50 text-gray-400'
          }`}>
            3
          </div>
        </div>

        {/* Step 1 - Registration */}
        {currentStep === 1 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-white mb-2 font-serif tracking-wide">Join Sweet Delights</h1>
              <p className="text-white text-opacity-90 text-lg italic">Create your account to start your sweet journey</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  className="w-full p-4 rounded-xl bg-yellow-50 text-gray-700 border-2 border-transparent focus:border-white focus:border-opacity-60 transition-all duration-300 focus:outline-none focus:shadow-lg focus:transform focus:scale-105"
                  required
                />
                
                <div className="mt-4 bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20">
                  <h4 className="text-white font-medium mb-3">Password Requirements:</h4>
                  <RequirementItem isValid={passwordRequirements.length} text="At least 8 characters long" />
                  <RequirementItem isValid={passwordRequirements.uppercase} text="Contains uppercase letter" />
                  <RequirementItem isValid={passwordRequirements.lowercase} text="Contains lowercase letter" />
                  <RequirementItem isValid={passwordRequirements.number} text="Contains a number" />
                  <RequirementItem isValid={passwordRequirements.special} text="Contains special character (!@#$%^&*)" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleStep1Submit}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white border-opacity-30 hover:border-opacity-50 text-lg uppercase tracking-wide mt-6"
              >
                Create Account
              </button>
            </div>

            <div className="text-center mt-6 pt-5 border-t border-white border-opacity-20">
              <p className="text-white text-opacity-90">
                Already have an account? 
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-white font-semibold ml-2 hover:underline transition-all duration-300"
                >
                  Sign in here
                </button>
              </p>
              <p className="text-white text-opacity-90 mt-2">
                Are you a staff member? 
                <button 
                  onClick={() => setCurrentView('staff-login')}
                  className="text-white font-semibold ml-2 hover:underline transition-all duration-300"
                >
                  Staff Login
                </button>
              </p>
            </div>
          </>
        )}

        {/* Step 2 - Profile */}
        {currentStep === 2 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif text-white mb-2 font-semibold">Tell Us About You</h1>
              <p className="text-white text-opacity-90 text-lg italic">Help us personalize your experience</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Select Your City <span className="text-white">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-yellow-50 text-gray-700 border-none focus:outline-none focus:shadow-lg transition-all duration-300 font-medium"
                  required
                >
                  <option value="">Choose your city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Sugar Preference <span className="text-white">*</span>
                </label>
                <p className="text-white text-opacity-80 text-sm mb-4">How much sugar do you prefer in your drinks?</p>
                <div className="flex justify-center gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <div key={num} className="relative">
                      <input
                        type="radio"
                        id={`sugar${num}`}
                        name="sugar"
                        value={num.toString()}
                        checked={formData.sugar === num.toString()}
                        onChange={handleInputChange}
                        className="appearance-none w-10 h-10 rounded-full border-2 border-white border-opacity-50 bg-yellow-50 cursor-pointer transition-all duration-300 hover:border-white hover:bg-yellow-100 checked:border-white checked:bg-yellow-100 checked:shadow-lg"
                        required
                      />
                      <div className={`absolute inset-0 rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ${
                        formData.sugar === num.toString() ? 'bg-pink-600' : ''
                      }`}>
                        {formData.sugar === num.toString() && (
                          <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                        )}
                      </div>
                      <label htmlFor={`sugar${num}`} className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-opacity-90 text-xs cursor-pointer">
                        {num}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-white text-opacity-90 mt-8">
                  <span>No Sugar</span>
                  <span>Very Sweet</span>
                </div>
                {formData.sugar && (
                  <p className="text-center text-white text-opacity-90 text-sm mt-2 italic">
                    {sugarDescriptions[formData.sugar]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Dietary Preferences</label>
                <p className="text-white text-opacity-80 text-sm mb-4">Select any that apply to you</p>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map(option => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={option.id}
                        name="dietary"
                        value={option.value}
                        checked={formData.dietary.includes(option.value)}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded accent-yellow-50 cursor-pointer"
                      />
                      <label htmlFor={option.id} className="text-white text-sm cursor-pointer hover:text-opacity-80 transition-all duration-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Other Preferences</label>
                <textarea
                  name="otherPreferences"
                  value={formData.otherPreferences}
                  onChange={handleInputChange}
                  placeholder="Tell us about any other dietary restrictions, allergies, or preferences we should know about..."
                  className="w-full p-4 rounded-2xl bg-yellow-50 text-gray-700 border-none focus:outline-none focus:shadow-lg transition-all duration-300 min-h-24 resize-y"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  How did you hear about us? <span className="text-white">*</span>
                </label>
                <select
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-yellow-50 text-gray-700 border-none focus:outline-none focus:shadow-lg transition-all duration-300 font-medium"
                  required
                >
                  <option value="">Please select</option>
                  {referralOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 border-2 border-white border-opacity-30 hover:border-opacity-50 uppercase tracking-wide"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Submit}
                  className="flex-1 bg-yellow-50 hover:bg-yellow-100 text-pink-600 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SweetDelightsDashboardSystem;