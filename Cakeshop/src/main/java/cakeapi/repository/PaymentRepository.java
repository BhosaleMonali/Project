package cakeapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	

}
