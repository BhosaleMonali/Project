package cakeapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.Order;
import cakeapi.entity.User;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	public List<Order> findByuser(User user);

}
