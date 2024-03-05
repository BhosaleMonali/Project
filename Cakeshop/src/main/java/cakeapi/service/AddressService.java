package cakeapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cakeapi.entity.Address;
import cakeapi.repository.AddressRepository;

@Service
public class AddressService {
	@Autowired
	private AddressRepository addressrepo;

	public Address saveAddress(Address address) {
		return addressrepo.save(address);

	}

	public Address findAddress(int id) {
		return addressrepo.findById(id).orElse(null);
	}

}
