package cakeapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.Address;

public interface AddressRepository extends JpaRepository<Address,Integer> {

}
