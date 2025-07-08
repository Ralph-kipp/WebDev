import React from 'react';

// Menu component: Displays a list of products.
// It receives an 'onNavigate' prop to navigate to product details or cart.
const Menu = ({ onNavigate }) => {
  const products = [
    { id: 1, name: 'Chocolate Fudge Cake', price: 25.00, imageUrl: 'https://placehold.co/300x200/FFC0CB/000000?text=Chocolate+Cake' },
    { id: 2, name: 'Vanilla Bean Cupcakes', price: 3.50, imageUrl: 'https://placehold.co/300x200/FFB6C1/000000?text=Vanilla+Cupcakes' },
    { id: 3, name: 'Strawberry Delight Donut', price: 2.75, imageUrl: 'https://placehold.co/300x200/FF69B4/000000?text=Strawberry+Donut' },
    { id: 4, name: 'Blueberry Muffin', price: 2.00, imageUrl: 'https://placehold.co/300x200/FF1493/000000?text=Blueberry+Muffin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Delicious Menu</h1>
        <p className="text-gray-600 mb-8 text-center">Explore our wide range of sweet treats!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border border-pink-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-700 text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => onNavigate('productDetails')} // Navigate to ProductDetails page
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('cart')} // Navigate to Cart page
            className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
