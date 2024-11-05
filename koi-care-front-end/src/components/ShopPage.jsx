import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaSort, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import '../styles/ShopPage.css';

const ShopPage = () => {
  const [state, setState] = useState({
    products: [],
    cart: [],
    cartTotal: 0,
    totalPages: 0,
    error: '',
    loading: false
  });
  
  const [filters, setFilters] = useState({
    searchKeyword: '',
    sortBy: '',
    category: '',
    currentPage: 0
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const token = localStorage.getItem('token');
  const userFullName = localStorage.getItem('userFullName');
  const accountId = localStorage.getItem('accountId');

  const categories = [
    'Aquarium Supplies',
    'Aquarium Decor',
    'Fish Food',
    'Aquarium Equipment',
    'Fish Healthcare',
  ];

  const publicAxios = axios.create({
    baseURL: 'http://localhost:8080'
  });

  const privateAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchProducts = async () => {
    try {
      let url = '/product/getAll?';
      if (filters.category) {
        url = `/product/filter?category=${filters.category}&`;
      } else if (filters.sortBy) {
        url = `/product/sort?sortBy=${filters.sortBy}&`;
      }
      url += `page=${filters.currentPage}&size=10`;

      const response = await publicAxios.get(url);
      setState(prev => ({
        ...prev,
        products: response.data.content,
        totalPages: response.data.totalPages,
        error: ''
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to fetch products',
        products: []
      }));
    }
  };

  const fetchCart = async () => {
    if (!token || !accountId) return;

    try {
      const response = await privateAxios.get(`/api/cart/getCart?accountId=${accountId}`);
      setState(prev => ({
        ...prev,
        cart: response.data.cartItems,
        cartTotal: response.data.cartTotal
      }));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.currentPage, filters.category, filters.sortBy]);

  useEffect(() => {
    if (token && accountId) {
      fetchCart();
    }
  }, [token, accountId]);

  const addToCart = async (product) => {
    if (!token || !accountId) {
      setState(prev => ({ ...prev, error: 'Please login to add items to cart' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await privateAxios.post('/api/cart/add', {
        productId: product.productID,
        quantity: 1
      }, {
        params: { accountId }
      });

      setState(prev => ({
        ...prev,
        cart: response.data.cartItems,
        cartTotal: response.data.cartTotal,
        error: '',
        loading: false
      }));
    } catch (error) {
      console.error('Error adding to cart:', error);
      setState(prev => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to add item to cart',
        loading: false
      }));
    }
  };

  const removeFromCart = async (productId) => {
    if (!token || !accountId) {
      setState(prev => ({ ...prev, error: 'Please login to remove items from cart' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await privateAxios.delete(`/api/cart/remove/${productId}`, {
        params: { accountId }
      });

      setState(prev => ({
        ...prev,
        cart: response.data.cartItems,
        cartTotal: response.data.cartTotal,
        error: '',
        loading: false
      }));
    } catch (error) {
      console.error('Error removing from cart:', error);
      setState(prev => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to remove item from cart',
        loading: false
      }));
    }
  };

  const clearCart = async () => {
    if (!token || !accountId) {
      setState(prev => ({ ...prev, error: 'Please login to clear the cart' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    try {
      await privateAxios.delete('/api/cart/clear', {
        params: { accountId }
      });
      
      setState(prev => ({
        ...prev,
        cart: [],
        cartTotal: 0,
        error: '',
        loading: false
      }));
    } catch (error) {
      console.error('Error clearing cart:', error);
      setState(prev => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to clear cart',
        loading: false
      }));
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      currentPage: 0
    }));
  };

  const handleCategoryClick = (selectedCategory) => {
    handleFiltersChange({
      category: selectedCategory === filters.category ? '' : selectedCategory
    });
  };

  const handleSortChange = (value) => {
    handleFiltersChange({ sortBy: value });
  };

  const handleSearchChange = (value) => {
    handleFiltersChange({ searchKeyword: value });
  };

  const filteredProducts = state.products.filter(
    (product) =>
      product.productName.toLowerCase().includes(filters.searchKeyword.toLowerCase())
  );

  const getProductQuantityInCart = (productId) => {
    const cartItem = state.cart.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">Shop</h1>
        <div className="user-info">
          {userFullName ? (
            <span>Welcome, {userFullName}</span>
          ) : (
            <span>Please login to use cart features</span>
          )}
        </div>
        <div 
          className="cart-icon" 
          onClick={() => token ? setIsCartOpen(true) : setState(prev => ({ ...prev, error: 'Please login to view cart' }))}
        >
          <FaShoppingCart />
          <span className="cart-count">
            {state.cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>
        <Link to="/order-history" className="order-history-button">
          View Order History
        </Link>
      </div>

      {state.error && <div className="error-message">{state.error}</div>}
      {state.loading && <div className="loading">Processing...</div>}

      <div className="shop-controls">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchKeyword}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="sort-bar">
          <FaSort className="icon" />
          <select 
            value={filters.sortBy} 
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>

        <div className="filter-bar">
          <FaFilter className="icon" />
          <div className="category-boxes">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-box ${filters.category === cat ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.productID} className="product-card">
            <h2 className="product-name">{product.productName}</h2>
            <p className="product-price">{product.price} VND</p>
            <p className="product-description">{product.description}</p>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="product-image"
            />
            <div className="quantity-info">
              In Cart: {getProductQuantityInCart(product.productID)}
            </div>
            <button
              className="view-details-button"
              onClick={() => setSelectedProduct(product)}
            >
              View Details
            </button>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
              disabled={state.loading || !token}
            >
              {!token ? 'Login to Add' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isLoggedIn={!!token}
          quantityInCart={getProductQuantityInCart(selectedProduct.productID)}
        />
      )}

      {isCartOpen && (
        <Cart
          cartItems={state.cart}
          total={state.cartTotal}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          loading={state.loading}
        />
      )}

      <div className="pagination">
        {Array.from({ length: state.totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === filters.currentPage ? 'active' : ''}`}
            onClick={() => handleFiltersChange({ currentPage: index })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;