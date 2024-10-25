package com.swp.group3.login.gui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.swp.group3.login.pojo.Product;
import com.swp.group3.login.service.IProductService;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("/getAll")
    public Page<Product> getAllProducts(@PageableDefault(size = 10) Pageable pageable) {
        return productService.getAllProducts(pageable);
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String keyword, @PageableDefault(size = 10) Pageable pageable) {
        return productService.searchProducts(keyword, pageable);
    }

    @GetMapping("/filter")
    public Page<Product> filterProducts(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10) Pageable pageable) {
        return productService.filterProducts(category, pageable);
    }

    @GetMapping("/sort")
    public Page<Product> sortProducts(@RequestParam String sortBy, @PageableDefault(size = 10) Pageable pageable) {
        return productService.sortProducts(sortBy, pageable);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/{id}/related")
    public List<Product> getRelatedProducts(@PathVariable Integer id) {
        return productService.getRelatedProducts(id);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            Product newProduct = productService.addProduct(product);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", newProduct);
            response.put("message", "Product added successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to add product: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
