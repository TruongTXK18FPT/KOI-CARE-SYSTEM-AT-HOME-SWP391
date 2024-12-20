import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ productName: '', category: '', price: '', description: '', imageUrl: '', stockQuantity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    searchKeyword: '',
    sortBy: '',
    category: ''
  });

  const token = localStorage.getItem('token');

  const fetchProducts = async (page = 0) => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/product/getAll?page=${page}&size=10`;
      if (filters.category) {
        url = `http://localhost:8080/product/filter?category=${filters.category}&page=${page}&size=10`;
      } else if (filters.sortBy) {
        url = `http://localhost:8080/product/sort?sortBy=${filters.sortBy}&page=${page}&size=10`;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = isEditing
        ? await axios.put(`http://localhost:8080/product/update/${editProductId}`, form, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        : await axios.post('http://localhost:8080/product/add', form, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

      setSuccessMessage(isEditing ? 'Product updated successfully' : 'Product added successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      setForm({ productName: '', category: '', price: '', description: '', imageUrl: '', stockQuantity: '' });
      setIsEditing(false);
      setEditProductId(null);
      fetchProducts(currentPage);
      setError(null);
    } catch (err) {
      setError('Failed to submit product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditProductId(product.productID);
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/product/delete/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchProducts(currentPage);
      setError(null);
    } catch (err) {
      setError('Failed to delete product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleCategoryClick = (selectedCategory) => {
    handleFiltersChange({
      category: selectedCategory === filters.category ? '' : selectedCategory,
      currentPage: 0
    });
  };

  const handleSortChange = (value) => {
    handleFiltersChange({ sortBy: value, currentPage: 0 });
  };

  const handleSearchChange = (value) => {
    handleFiltersChange({ searchKeyword: value, currentPage: 0 });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(filters.searchKeyword.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-management-container">
      <h1 className="product-management-title">Product Management</h1>
      
      {error && (
        <div className="alert alert-error" role="alert">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search by product name..."
          value={filters.searchKeyword}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <select value={filters.sortBy} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
        <div className="category-boxes">
          {['Aquarium Supplies', 'Aquarium Decor', 'Fish Food', 'Aquarium Equipment', 'Fish Healthcare'].map((cat) => (
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

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="image-url-input"
        />
        <input
          type="number"
          name="stockQuantity"
          value={form.stockQuantity}
          onChange={handleInputChange}
          placeholder="Stock Quantity"
          required
        />
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.productID}>
              <td>{product.productID}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                {product.imageUrl && <img src={product.imageUrl} alt={product.productName} className="product-management-image" />}
              </td>
              <td>{product.stockQuantity}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(product.productID)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default ProductManagement;