    import React from 'react';

    // ProductDetails component: Displays details of a single product.
    // It receives an 'onNavigate' prop to navigate to the cart.
    const ProductDetails = ({ onNavigate }) => {
      // In a real application, product data would be fetched based on a product ID prop.
      const product = {
        id: 1,
        name: 'Gourmet Chocolate Donut',
        price: 3.50,
        description: 'A delightful gourmet donut, freshly baked and topped with a rich chocolate glaze and colorful sprinkles. Perfect for a sweet treat!',
        imageUrl: 'https://placehold.co/400x300/FFC0CB/000000?text=Gourmet+Donut',
        specifications: [
          'Weight: 100g',
          'Ingredients: Flour, Sugar, Eggs, Chocolate, Sprinkles',
          'Allergens: Gluten, Dairy, Eggs'
        ],
        relatedProducts: [
          { id: 2, name: 'Vanilla Bean Cupcakes', imageUrl: 'https://placehold.co/100x75/FFB6C1/000000?text=Cupcakes' },
          { id: 3, name: 'Strawberry Delight Donut', imageUrl: 'https://placehold.co/100x75/FF69B4/000000?text=Donut' },
        ]
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-8 font-inter">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Product Details</h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image Gallery */}
              <div className="md:w-1/2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                {/* Add more images here if it were a gallery */}
                <div className="flex gap-2 justify-center">
                  <img src="https://placehold.co/80x60/FFC0CB/000000?text=Img1" alt="Thumbnail 1" className="w-20 h-15 rounded-md cursor-pointer border border-pink-200 hover:border-pink-500" />
                  <img src="https://placehold.co/80x60/FFC0CB/000000?text=Img2" alt="Thumbnail 2" className="w-20 h-15 rounded-md cursor-pointer border border-pink-200 hover:border-pink-500" />
                </div>
              </div>

              {/* Product Information */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <p className="text-4xl font-extrabold text-pink-600">${product.price.toFixed(2)}</p>

                {/* Add to Cart functionality */}
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => onNavigate('cart')} // Navigate to Cart page
                    className="bg-pink-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-pink-600 transition-colors transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Product Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Specifications</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-12 border-t border-pink-100 pt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">You might also like...</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {product.relatedProducts.map(related => (
                  <div key={related.id} className="w-40 text-center border border-pink-100 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                       onClick={() => console.log(`Navigating to details for ${related.name}`)} // In a real app, this would navigate to the related product's details
                  >
                    <img src={related.imageUrl} alt={related.name} className="w-full h-24 object-cover rounded-md mb-2" />
                    <p className="text-sm font-semibold text-gray-800">{related.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => onNavigate('menu')} // Navigate back to Menu
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-300 transition-colors transform hover:scale-105"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default ProductDetails;
    