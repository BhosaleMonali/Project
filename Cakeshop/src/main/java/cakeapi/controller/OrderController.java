package cakeapi.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



import cakeapi.DTO.Cart;
import cakeapi.DTO.PlaceOrderdto;
import cakeapi.DTO.UpdateOrderStatus;
import cakeapi.entity.Address;
import cakeapi.entity.Order;
import cakeapi.entity.OrderDetail;
import cakeapi.entity.Product;
import cakeapi.entity.User;
import cakeapi.service.AddressService;
import cakeapi.service.EmailSenderService;
import cakeapi.service.OrderDetailService;
import cakeapi.service.OrderService;
import cakeapi.service.ProductService;
import cakeapi.service.UserService;

@CrossOrigin("*")
@RestController
public class OrderController {

	@Autowired
	private AddressService addressService;
	@Autowired
	private OrderDetailService orderDetailService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	@Autowired
	private ProductService productService;
	
	@Autowired
	private EmailSenderService mailService;

	/*
	 * post methodjson format { "address": { "city":"Warje", "state":"Maharashtra",
	 * "pincode":412901, "mobileno":9970744170 }, "cart": { "product_id":7,
	 * "quantity":1, "weight":1, "message":"happy birthday baba",
	 * "orderStatus":"pending" }, "user_id":5
	 * 
	 * }
	 */
	@PostMapping("/user/placeorder")
	public ResponseEntity<?> saveorder(@RequestBody PlaceOrderdto dto) {
		System.out.println("placeorder called");
//	Address address = new Address();

		Address address = dto.getAddress();

		System.out.println(address);
		addressService.saveAddress(address);

		var order = new Order();
		order.setOrderDate(new Date());
		System.out.println("date placed at " + order.getOrderDate());
		order.setAddress(address);
		User customer = userService.getUserById(dto.getUser_id());
		System.out.println("user data" + customer);
		order.setUser(customer);
		Order orders = orderService.savenewOrder(order);
		System.out.println("order" + orders);

		Cart cart = dto.getCart();

		var od = new OrderDetail();
		od.setOrder(orders);
		System.out.println(cart.getMessage());
		od.setMessage(cart.getMessage());
		System.out.println(od.getMessage());
		od.setQuantity(cart.getQuantity());
		od.setWeight(cart.getWeight());
		Product product = productService.getProductById(cart.getProduct_id());
		od.setProduct(product);
		od.setUser(customer);
		double temp = (cart.getQuantity() * cart.getWeight() * product.getPricepercake());
		od.setAmount(2 * temp);
		od.setOrderStatus(cart.getOrderStatus());
		OrderDetail orderdetail = orderDetailService.saveOrderDetails(od);
		System.out.println("orderdetail" + orderdetail);

		return ResponseEntity.ok("Order is in  processing");

	}

	@GetMapping("/user/getorder/{custid}")
	public ResponseEntity<?> findAllOrders(@PathVariable(name = "custid") Optional<Integer> custid) {
		System.out.println("user order called" + custid);
		List<Order> result = null;
		List<OrderDetail> orderdetails = null; // Initialize the list

		if (custid.isPresent()) {
			User customer = userService.getUserById(custid.get());
			System.out.println(customer);

			// Assuming getAllOrderDetail returns a list, use addAll to add all elements
			orderdetails = orderDetailService.getOrderByUser(customer);

			System.out.println(result);
			return ResponseEntity.ok(orderdetails);
		} else {
			System.out.println(custid.isPresent());
			return ResponseEntity.notFound().build(); // Use build() to create the response entity
		}
	}

	@PutMapping("/admin/updatestatus")
	public ResponseEntity<OrderDetail> updateOrderStatus(@RequestBody UpdateOrderStatus status) {
		System.out.println("updatestatus" + status.getId());
		var userorderdeatil = orderDetailService.findByOne(status.getId());
		userorderdeatil.setOrderStatus(status.getStatus());
		orderDetailService.saveOrderDetails(userorderdeatil);
		String subject = "Order Status Updated ";
		String body = "Thank you for aprroching us . Your  Order has been \n"+ status.getStatus() + ".from Sweet cakes Shop";
		mailService.sendSimpleEmail(userorderdeatil.getUser().getEmail(),body,subject);
		return ResponseEntity.ok(userorderdeatil);
	}

	@RequestMapping(value = "/admin/updatestatus", method = RequestMethod.OPTIONS)
	public ResponseEntity<?> handleOptions() {
		return ResponseEntity.ok().build();
	}

	@GetMapping("admin/allorders")
	public ResponseEntity<?> getAllOrders1() {
		System.out.println("in getAllOrders new ");
		List<OrderDetail> list = orderDetailService.getAllOrderDetail();
		return new ResponseEntity<List<OrderDetail>>(list, HttpStatus.OK);
	}

}
