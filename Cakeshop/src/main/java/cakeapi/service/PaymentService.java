package cakeapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cakeapi.entity.Payment;
import cakeapi.repository.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentRepository paymentrepo;
	
	public boolean makepayment(Payment payment) {
		boolean flag=false;
		if(payment.getCardNumber().equals("MB2104") && payment.getExpiryDate().equals("0326"))
			flag=true;
		return flag;
			
	}

	public void savedetails(Payment payment)
	{
		paymentrepo.save(payment);
	}

}
