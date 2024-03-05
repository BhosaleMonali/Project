package cakeapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Integer> {

}
