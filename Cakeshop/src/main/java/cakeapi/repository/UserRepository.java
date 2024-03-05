package cakeapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cakeapi.entity.User;

//@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

}
