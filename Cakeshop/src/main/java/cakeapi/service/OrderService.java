package cakeapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cakeapi.entity.Order;
import cakeapi.entity.User;
import cakeapi.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepo;

	public Order savenewOrder(Order order) {
		return orderRepo.save(order);

	}

	public List<Order> getAllOrder() {
		return orderRepo.findAll();
	}

	public List<Order> getOrderByUser(User user) {
		return orderRepo.findByuser(user);
	}
}
