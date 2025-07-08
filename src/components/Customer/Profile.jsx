import React from 'react';

// Profile component: Displays user profile information.
// It receives an 'onNavigate' prop if it needs to navigate to other sections.
const Profile = ({ onNavigate }) => { // Added onNavigate prop
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
      <p className="text-gray-600">Manage your personal information and account settings here.</p>
      {/* Add actual profile content here */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Name:</span>
          <span className="text-gray-800">John Doe</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Email:</span>
          <span className="text-gray-800">john.doe@example.com</span>
        </div>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">Edit Profile</button>
        {/* Example navigation from Profile */}
        <button
          onClick={() => onNavigate('orderHistory')}
          className="mt-4 ml-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;
