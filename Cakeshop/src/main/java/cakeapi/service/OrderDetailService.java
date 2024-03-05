package cakeapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cakeapi.entity.Order;
import cakeapi.entity.OrderDetail;
import cakeapi.entity.User;
import cakeapi.repository.OrderDetailRepository;

@Service
public class OrderDetailService {

	@Autowired
	private OrderDetailRepository orderDetailRepo;

	public OrderDetail saveOrderDetails(OrderDetail orderdetail) {
		return orderDetailRepo.save(orderdetail);
	}

	public List<OrderDetail> getAllOrderDetail() {
		return orderDetailRepo.findAll();
	}

	public OrderDetail getAllOrderDetail(Order orders) {
		return orderDetailRepo.findByOrder(orders);
	}

	public OrderDetail findByOne(int id) {
		return orderDetailRepo.findById(id).orElse(null);
	}


	public List<OrderDetail> getOrderByUser(User user) {
		return orderDetailRepo.findByuser(user);
	}
}
