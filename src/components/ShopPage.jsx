import React, { useState } from 'react';
import '../styles/ShopPage.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import ProductDetails from './ProductDetails'; // Import the ProductDetails component

const products = [
  { id: 1, name: 'Koi Fish Food Prenium', price: 25.00, description: 'High-quality food to enhance Koi fish growth and color.', imageUrl: 'https://pondmax.com.au/cdn/shop/products/fishfood5.5kg6mm_2048x.jpg?v=1620624725' },
  { id: 2, name: 'Goldfish Flakes', price: 15.00, description: 'Nutritious flakes for Goldfish.', imageUrl: 'https://www.vietpet.net/wp-content/uploads/2019/11/thuc-an-cho-ca-vang-tetrafin-goldfish-flakes.jpg' },
  { id: 3, name: 'Aquarium Plants Set', price: 40.00, description: 'A set of live plants to beautify your aquarium.', imageUrl: 'https://java-plants.com/wp-content/uploads/2023/12/IMG_7337-2-600x450.jpeg' },
  { id: 4, name: 'Fish Tank Heater', price: 30.00, description: 'Submersible heater for maintaining water temperature.', imageUrl: 'https://image1.slideserve.com/3123451/fresh-water-aquarium-equipment-l.jpg' },
  { id: 5, name: 'Water Conditioner', price: 12.00, description: 'Removes harmful chemicals from tap water.', imageUrl: 'https://premiumaquatics.com/category_image/premiumaquatics.com/0x0/690_1654633197.jpg' },
  { id: 6, name: 'Koi Pond Filter', price: 150.00, description: 'Efficient filter for keeping your Koi pond clean.', imageUrl: 'https://www.shutterstock.com/image-vector/aquarium-equipment-external-fish-tank-260nw-684131755.jpg' },
  { id: 7, name: 'Fish Net', price: 5.00, description: 'Durable net for catching fish.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxS9kWxKb6aldYrJ3Ca22IpqsNzsjaMAgFQ&' },
  { id: 8, name: 'Aquarium Gravel', price: 8.00, description: 'Colorful gravel for decorating your aquarium.', imageUrl: 'https://i5.walmartimages.com/seo/Aqua-Culture-Aquarium-Gravel-Mix-Neon-Starry-Night-5-Pound_52a0154c-e4f4-4bb8-91a2-47d886636eac_3.71b4130e1bba402dbf7d62fd74fc32ae.jpeg' },
  { id: 9, name: 'Fish Tank Decorations', price: 20.00, description: 'Assorted decorations for your fish tank.', imageUrl: 'https://i.pinimg.com/550x/28/dd/79/28dd79036dc21ad5e54e261021a4ca87.jpg' },
  { id: 10, name: 'Fish Tank Light', price: 18.00, description: 'LED light for illuminating your fish tank.', imageUrl: 'https://images-cdn.ubuy.com.sa/635bcfc7a8c9fb67682bf017-kritne-led-led-aquarium-light-fish-tank.jpg' },
];

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">Shop</h1>
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <button className="view-details-button" onClick={() => setSelectedProduct(product)}>
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

      <div className="cart-container">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ShopPage.css'; // Import the CSS file

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, [currentPage]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/getAll?page=${currentPage}&size=10`);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/search?keyword=${searchKeyword}&page=${currentPage}&size=10`);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleSort = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/sort?sortBy=${sortBy}&page=${currentPage}&size=10`);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error sorting products:', error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/filter`, {
        params: {
          category,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          page: currentPage,
          size: 10,
        },
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const viewProductDetails = (product) => {
    // Implement view product details logic
    console.log('Viewing product details:', product);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="shop-title">Shop</h1>
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className="shop-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="sort-bar">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
          <button onClick={handleSort}>Sort</button>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.productName}</h2>
            <p className="product-price">${product.price}</p>
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

      <div className="cart-container">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.productName} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopPage;*/


