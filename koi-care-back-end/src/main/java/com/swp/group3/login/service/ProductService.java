package com.swp.group3.login.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.swp.group3.login.pojo.Product;
import com.swp.group3.login.repository.ProductRepository;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> searchProducts(String keyword, Pageable pageable) {
        return productRepository.findByProductName(keyword, keyword, pageable);
    }

    @Override
    public Page<Product> filterProducts(String category, Pageable pageable) {
        if (category == null || category.isEmpty()) {
            return productRepository.findAll(pageable);
        }

        return productRepository.findByCategory(category, pageable);
    }

    @Override
    public Page<Product> sortProducts(String sortBy, Pageable pageable) {
        Sort sort;
        switch (sortBy) {
            case "price_desc":
                sort = Sort.by(Sort.Direction.DESC, "price");
                break;
            case "price_asc":
                sort = Sort.by(Sort.Direction.ASC, "price");
                break;
            case "name_desc":
                sort = Sort.by(Sort.Direction.DESC, "productName");
                break;
            case "name_asc":
                sort = Sort.by(Sort.Direction.ASC, "productName");
                break;
            default:
                sort = Sort.by(Sort.Direction.ASC, "price");
        }

        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return productRepository.findAll(pageableWithSort);
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getRelatedProducts(Integer productId) {
        Product product = getProductById(productId);
        if (product != null) {
            return productRepository.findAll().stream()
                    .filter(p -> p.getCategory().equals(product.getCategory()) && p.getProductID() != productId)
                    .limit(5)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}
