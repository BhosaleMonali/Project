package cakeapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.Order;
import cakeapi.entity.OrderDetail;
import cakeapi.entity.Product;
import cakeapi.entity.User;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

	public Product findByProduct(Product p);

	public OrderDetail findByOrder(Order orders);

	public List<OrderDetail> findByuser(User user);

}
