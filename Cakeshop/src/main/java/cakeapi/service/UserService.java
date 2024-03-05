package cakeapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cakeapi.entity.User;
import cakeapi.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public User createUser(User user) {
		return userRepository.save(user);
	}

	public User AuthenticateUser(String email) {

		User user = userRepository.findByEmail(email);
		return user;
	}

	public List<User> getAllUsers() {
		System.out.println("service invoked");
		return userRepository.findAll();
	}

	public User getUserById(Integer id) {
		return userRepository.findById(id).orElse(null);
	}

	public boolean deleteById(Integer id) {
		boolean flag = false;
		Optional<User> optionalRef = userRepository.findById(id);
		if (!optionalRef.isEmpty()) {
			userRepository.deleteById(id);
			flag = true;
		}

		return flag;
	}

}
