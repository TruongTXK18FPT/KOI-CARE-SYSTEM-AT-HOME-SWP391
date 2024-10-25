import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaSort, FaShoppingCart } from 'react-icons/fa';
import ProductDetails from './ProductDetails'; // Import the ProductDetails component
import Cart from './Cart'; // Import the Cart component
import '../styles/ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    'Aquarium Supplies',
    'Aquarium Decor',
    'Fish Food',
    'Aquarium Equipment',
    'Fish Healthcare'
  ];

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/getAll?page=${currentPage}&size=10`);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts, currentPage]);

  const handleSearch = () => {
    return products.filter(product =>
      product.productName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (!category || product.category === category)
    );
  };

  const handleSort = useCallback(async () => {
    if (!sortBy) return;
    
    try {
      const response = await axios.get(`http://localhost:8080/product/sort?sortBy=${sortBy}&page=${currentPage}&size=10`);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error sorting products:', error);
    }
  }, [sortBy, currentPage]);

  useEffect(() => {
    if (sortBy) {
      handleSort();
    }
  }, [sortBy, handleSort]);

  const handleFilter = useCallback(async () => {
    if (!category) return;
    
    try {
      const response = await axios.get(`http://localhost:8080/product/filter`, {
        params: {
          category,
          page: currentPage,
          size: 10,
        },
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  }, [category, currentPage]);

  useEffect(() => {
    if (category) {
      handleFilter();
    }
  }, [category, handleFilter]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const filteredProducts = handleSearch();

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">Shop</h1>
        <div className="cart-icon" onClick={handleCartOpen}>
          <FaShoppingCart />
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className="shop-controls">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="sort-bar">
          <FaSort className="icon" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
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
                className={`category-box ${category === cat ? 'selected' : ''}`}
                onClick={() => setCategory(cat)}
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
            <img src={product.imageUrl} alt={product.productName} className="product-image" />
            <button className="view-details-button" onClick={() => viewProductDetails(product)}>
              View Details
            </button>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {isCartOpen && (
        <Cart 
          cartItems={cart} 
          onClose={handleCartClose} 
        />
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;


