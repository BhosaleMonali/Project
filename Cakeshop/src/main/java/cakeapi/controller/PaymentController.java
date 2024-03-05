package cakeapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cakeapi.entity.Payment;
import cakeapi.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

	@Autowired
	private PaymentService paymentservice;

	@PostMapping
	public ResponseEntity<?> processPayment(@RequestBody Payment paymentRequest) {
		System.out.println("Payemtcontroller invokedand send towards  service");

		boolean flag = paymentservice.makepayment(paymentRequest);
		System.out.println(flag);

		if (flag) {
			
			paymentRequest.setPaymentstatus("done");
			paymentservice.savedetails(paymentRequest);
		}

		else
			paymentRequest.setPaymentstatus(" failed");

		System.out.println(paymentRequest.getPaymentstatus());
		return ResponseEntity.ok(paymentRequest.getPaymentstatus());
	}
}
