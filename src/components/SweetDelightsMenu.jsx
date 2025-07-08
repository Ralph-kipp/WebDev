import React, { useState, useEffect } from 'react';

const SweetDelightsMenu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState('');

  // Menu data
  const menuItems = {
    cakes: [
      {
        id: 1,
        name: "Classic Vanilla Sponge",
        description: "Light, fluffy vanilla cake with rich buttercream frosting",
        price: 24.99,
        icon: "🎂",
        tags: ["Bestseller", "Classic"],
        bestseller: true,
        sizes: ["6 inch", "8 inch", "10 inch"],
        flavors: ["Vanilla", "Strawberry", "Lemon"]
      },
      {
        id: 2,
        name: "Chocolate Ganache Delight",
        description: "Rich chocolate cake with silky smooth ganache",
        price: 28.99,
        icon: "🍫",
        tags: ["Bestseller", "Chocolate"],
        bestseller: true,
        sizes: ["6 inch", "8 inch", "10 inch"],
        flavors: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"]
      },
      {
        id: 3,
        name: "Red Velvet Dream",
        description: "Moist red velvet cake with cream cheese frosting",
        price: 26.99,
        icon: "❤️",
        tags: ["Popular", "Red Velvet"],
        bestseller: false,
        sizes: ["6 inch", "8 inch", "10 inch"],
        flavors: ["Traditional", "Strawberry", "Raspberry"]
      },
      {
        id: 4,
        name: "Carrot Cake Supreme",
        description: "Spiced carrot cake with walnuts and cream cheese frosting",
        price: 25.99,
        icon: "🥕",
        tags: ["Healthy", "Nuts"],
        bestseller: false,
        sizes: ["6 inch", "8 inch", "10 inch"],
        flavors: ["Classic", "Spiced", "Tropical"]
      }
    ],
    cupcakes: [
      {
        id: 5,
        name: "Vanilla Cupcake Dozen",
        description: "12 fluffy vanilla cupcakes with buttercream swirl",
        price: 18.99,
        icon: "🧁",
        tags: ["Dozen", "Classic"],
        bestseller: true,
        sizes: ["Mini", "Regular", "Jumbo"],
        flavors: ["Vanilla", "Chocolate", "Strawberry", "Lemon"]
      },
      {
        id: 6,
        name: "Chocolate Fudge Cupcakes",
        description: "Rich chocolate cupcakes with fudge frosting",
        price: 20.99,
        icon: "🍩",
        tags: ["Chocolate", "Rich"],
        bestseller: false,
        sizes: ["Mini", "Regular", "Jumbo"],
        flavors: ["Dark Chocolate", "Milk Chocolate", "Mocha"]
      },
      {
        id: 7,
        name: "Rainbow Surprise",
        description: "Colorful cupcakes with surprise filling",
        price: 22.99,
        icon: "🌈",
        tags: ["Colorful", "Surprise"],
        bestseller: true,
        sizes: ["Mini", "Regular", "Jumbo"],
        flavors: ["Funfetti", "Strawberry", "Blueberry", "Lemon"]
      },
      {
        id: 8,
        name: "Lemon Meringue Cupcakes",
        description: "Tangy lemon cupcakes topped with fluffy meringue",
        price: 19.99,
        icon: "🍋",
        tags: ["Citrus", "Light"],
        bestseller: false,
        sizes: ["Mini", "Regular", "Jumbo"],
        flavors: ["Lemon", "Lime", "Orange"]
      }
    ],
    cookies: [
      {
        id: 9,
        name: "Chocolate Chip Cookies",
        description: "Classic homemade cookies with premium chocolate chips",
        price: 12.99,
        icon: "🍪",
        tags: ["Classic", "Homemade"],
        bestseller: true,
        sizes: ["Small (12 pack)", "Large (24 pack)", "Family (48 pack)"],
        flavors: ["Classic", "Double Chocolate", "Oatmeal Raisin"]
      },
      {
        id: 10,
        name: "Sugar Cookie Decorating Kit",
        description: "Plain sugar cookies with colorful icing and sprinkles",
        price: 15.99,
        icon: "🎨",
        tags: ["DIY", "Fun"],
        bestseller: false,
        sizes: ["Small Kit", "Large Kit", "Party Pack"],
        flavors: ["Vanilla", "Almond", "Lemon"]
      },
      {
        id: 11,
        name: "Gingerbread Cookies",
        description: "Spiced gingerbread cookies perfect for any season",
        price: 14.99,
        icon: "🍪",
        tags: ["Spiced", "Traditional"],
        bestseller: false,
        sizes: ["Small (12 pack)", "Large (24 pack)", "Family (48 pack)"],
        flavors: ["Traditional", "Molasses", "Cinnamon"]
      },
      {
        id: 12,
        name: "Macaron Selection",
        description: "Delicate French macarons in assorted flavors",
        price: 24.99,
        icon: "🥞",
        tags: ["French", "Delicate"],
        bestseller: true,
        sizes: ["6 pack", "12 pack", "24 pack"],
        flavors: ["Vanilla", "Chocolate", "Raspberry", "Pistachio", "Lavender"]
      }
    ]
  };

  const [particles, setParticles] = useState([]);

  // Generate animated particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 6
      });
    }
    setParticles(particles);
  }, []);


  // Filter items based on category, search, and price
  const getFilteredItems = () => {
    let items = [];
    
    if (activeCategory === 'all') {
      items = [...menuItems.cakes, ...menuItems.cupcakes, ...menuItems.cookies];
    } else if (activeCategory === 'bestsellers') {
      items = [...menuItems.cakes, ...menuItems.cupcakes, ...menuItems.cookies].filter(item => item.bestseller);
    } else {
      items = menuItems[activeCategory] || [];
    }

    // Apply search filter
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
      items = items.filter(item => {
        if (max) {
          return item.price >= parseFloat(min) && item.price <= parseFloat(max);
        } else {
          return item.price >= parseFloat(min);
        }
      });
    }

    return items;
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');

  const openPanel = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedSize(item.sizes[0]);
    setSelectedFlavor(item.flavors[0]);
  };

  const closePanel = () => {
    setSelectedItem(null);
    setQuantity(1);
    setSelectedSize('');
    setSelectedFlavor('');
  };

  const addToCart = () => {
    if (!selectedItem) return;

    const cartItem = {
      id: Date.now(),
      itemId: selectedItem.id,
      name: selectedItem.name,
      size: selectedSize,
      flavor: selectedFlavor,
      quantity: quantity,
      price: selectedItem.price,
      totalPrice: selectedItem.price * quantity
    };

    setCartItems(prev => [...prev, cartItem]);
    showNotification(`${selectedItem.name} added to cart!`);
    closePanel();
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty!');
      return;
    }
    showNotification('Checkout functionality would be implemented here!');
    // Here you would typically integrate with a payment processor
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200 text-white overflow-x-hidden font-serif">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-white bg-opacity-10 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 bg-opacity-90 text-white px-6 py-3 rounded-full z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-5 py-5 relative z-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
            Sweet Delights
          </h1>
          <div className="text-xl italic opacity-90 mb-5">
            Crafted with love, served with care
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center gap-5 mb-10 flex-wrap">
            {['all', 'cakes', 'cupcakes', 'cookies', 'bestsellers'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white bg-opacity-30 transform -translate-y-1 shadow-lg'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 hover:-translate-y-1 hover:shadow-lg'
                } backdrop-blur-sm`}
              >
                {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div 
          className="fixed top-5 right-5 bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-opacity-30 hover:scale-105 z-30"
          onClick={() => setShowCart(true)}
        >
          <span className="mr-3">🛒 Cart</span>
          <span className="bg-white text-pink-400 px-3 py-1 rounded-full font-bold animate-pulse">
            {cartItems.length}
          </span>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-center gap-5 mb-10 flex-wrap">
          <input
            type="text"
            placeholder="Search for sweet treats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white bg-opacity-20 backdrop-blur-sm border-none px-5 py-3 rounded-full text-white placeholder-white placeholder-opacity-70 w-80 focus:outline-none focus:bg-opacity-30 focus:scale-105 transition-all duration-300"
          />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-white bg-opacity-20 backdrop-blur-sm border-none px-5 py-3 rounded-full text-white focus:outline-none focus:bg-opacity-30 transition-all duration-300"
          >
            <option value="">Filter by Price</option>
            <option value="0-15">Under $15</option>
            <option value="15-25">$15 - $25</option>
            <option value="25-35">$25 - $35</option>
            <option value="35+">$35+</option>
          </select>
        </div>

        <div className="text-center text-4xl font-bold mb-10 relative">
          Sweet Delights Menu
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-2"></div>
        </div>

        {/* Menu Items */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-10 border border-white border-opacity-20 shadow-2xl">
          {getFilteredItems().map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-6 border-b border-white border-opacity-20 last:border-b-0 cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-15 hover:rounded-xl hover:px-5 hover:transform hover:translate-x-2 group"
              onClick={() => openPanel(item)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-xl font-bold group-hover:text-pink-100 transition-colors duration-300">
                    {item.name}
                  </h3>
                </div>
                <p className="text-white text-opacity-80 italic mb-2">{item.description}</p>
                <div className="flex gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-white bg-opacity-20 px-2 py-1 rounded-lg text-xs uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-70">from</div>
                <div className="text-2xl font-bold text-pink-100">${item.price}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPanel(item);
                  }}
                  className="mt-2 bg-white bg-opacity-20 border-2 border-white text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-white hover:text-pink-400 hover:scale-105"
                >
                  Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Details Panel */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white text-gray-800 rounded-3xl p-8 max-w-md w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b-2 border-pink-400 pb-5">
              <h2 className="text-2xl font-bold text-pink-400">Item Details</h2>
              <button
                onClick={closePanel}
                className="text-pink-400 text-3xl font-bold hover:rotate-90 transition-transform duration-300"
              >
                ×
              </button>
            </div>

            <div className="bg-gradient-to-br from-pink-400 to-pink-300 rounded-xl h-48 flex items-center justify-center mb-5 text-white text-6xl shadow-lg">
              {selectedItem.icon}
            </div>

            <h3 className="text-2xl font-bold text-pink-400 mb-3">{selectedItem.name}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>

            {/* Size Options */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-1 bg-pink-400 rounded"></span>
                Size Options
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedItem.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-xl font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-pink-400 text-white shadow-lg transform -translate-y-1'
                        : 'bg-pink-100 text-pink-400 hover:bg-pink-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Options */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-1 bg-pink-400 rounded"></span>
                Flavor Options
              </h4>
              <div className="space-y-2">
                {selectedItem.flavors.map(flavor => (
                  <label key={flavor} className="flex items-center p-3 bg-pink-50 rounded-xl cursor-pointer hover:bg-pink-100 transition-colors duration-300">
                    <input
                      type="radio"
                      name="flavor"
                      value={flavor}
                      checked={selectedFlavor === flavor}
                      onChange={() => setSelectedFlavor(flavor)}
                      className="mr-3 accent-pink-400 scale-125"
                    />
                    <span className="font-medium">{flavor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-1 bg-pink-400 rounded"></span>
                Quantity
              </h4>
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-pink-400 text-white rounded-full font-bold hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-pink-400 min-w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-pink-400 text-white rounded-full font-bold hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-pink-400 text-center mb-6">
              ${(selectedItem.price * quantity).toFixed(2)}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:from-pink-500 hover:to-pink-600 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white text-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b-2 border-pink-400 pb-5">
              <h2 className="text-2xl font-bold text-pink-400">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-pink-400 text-3xl font-bold hover:rotate-90 transition-transform duration-300"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-xl text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-all duration-300 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-bold text-pink-400 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.size} • {item.flavor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-pink-400 text-white rounded-full font-bold hover:bg-pink-500 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="font-bold min-w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-pink-400 text-white rounded-full font-bold hover:bg-pink-500 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-pink-400 min-w-16 text-right">${item.totalPrice.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-3xl font-bold text-pink-400 text-center my-8 py-5 border-t-2 border-pink-400">
                  Total: ${getCartTotal().toFixed(2)}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleCheckout}
                    className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 px-12 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:from-pink-500 hover:to-pink-600 hover:-translate-y-2 hover:shadow-xl active:translate-y-0 inline-flex items-center gap-3"
                  >
                    <span className="text-xl">🛍️</span>
                    Checkout
                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetDelightsMenu;