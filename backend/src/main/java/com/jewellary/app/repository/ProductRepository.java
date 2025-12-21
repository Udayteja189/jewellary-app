package com.jewellary.app.repository;

import com.jewellary.app.Entity.Product;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query("SELECT p FROM Product p")
    List<Product> getAllProducts();

    @Query("SELECT p FROM Product p WHERE p.category = :category")
    List<Product> getProductsByCategory(@Param("category") String category);

//    @Query("select p from Product p where p.isWishlisted = true")
//    List<Product> getWishlistedProducts();
//
//    @Query("SELECT p FROM Product p WHERE p.isAddedToCart = true")
//    List<Product> getProductsInCart();

    @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Product getProductById(@Param("productId") Integer productId);

}
