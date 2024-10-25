package com.swp.group3.login.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.swp.group3.login.pojo.Product;

public interface IProductService {
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> searchProducts(String keyword, Pageable pageable);
    Page<Product> filterProducts(String category, Pageable pageable);
    Page<Product> sortProducts(String sortBy, Pageable pageable);
    Product getProductById(Integer id);
    List<Product> getRelatedProducts(Integer productId);
    Product addProduct(Product product); // Add this method
}
