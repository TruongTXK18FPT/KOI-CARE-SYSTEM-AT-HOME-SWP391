package com.swp.group3.login.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.swp.group3.login.pojo.Product;

import java.util.List;

public interface IProductService {
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> searchProducts(String keyword, Pageable pageable);
    Page<Product> filterProducts(String category, Pageable pageable);
    Page<Product> sortProducts(String sortBy, Pageable pageable);
    Product getProductById(Integer id);
    List<Product> getRelatedProducts(Integer id);
    Product addProduct(Product product);
    Product updateProduct(Integer id, Product product); // Add this method
}