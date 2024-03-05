package cakeapi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cakeapi.DTO.Userdto;
import cakeapi.entity.Authentication;
import cakeapi.entity.User;
import cakeapi.service.UserService;

@CrossOrigin("http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	private UserService userservice;

	@PostMapping("/user/register")
	public ResponseEntity<?> RegisterNewUser(@RequestBody User user) {
		System.out.println("controller invoked");

		userservice.createUser(user);
		return new ResponseEntity<String>("Registration Successful..!!", HttpStatus.CREATED);

	}

	@PostMapping("/user/login")
	public ResponseEntity<?> LoginUser(@RequestBody Authentication userID) {
		System.out.println("controller invoked");
		String email = userID.getEmail();
		String password = userID.getPassword();
		System.out.println(email + "   " + password);
		// User u = null;

		User u = userservice.AuthenticateUser(email);
		System.out.println("finding user" + u);
		System.out.println(email + "   " + password);
//		System.out.println(email == u.getEmail() && password == u.getPassword());
		System.out.println(email.equals(u.getEmail()) && password.equals(u.getPassword()));
		if (email.equals(u.getEmail()) && password.equals(u.getPassword()))
			return new ResponseEntity<User>(u, HttpStatus.OK);
		else

			return new ResponseEntity<String>("No such customer", HttpStatus.NOT_FOUND);

	}

	@GetMapping("/admin/allusers")
	public ResponseEntity<List<Userdto>> getalluser() {
		System.out.println("controller invoked");

		List<User> users = userservice.getAllUsers();

		List<Userdto> user_response = new ArrayList<>();

		for (User user : users) {
			Userdto userd = new Userdto();
			userd.setUserId(user.getUserId());
			userd.setFname(user.getFname());
			userd.setLname(user.getLname());
			userd.setEmail(user.getEmail());
			userd.setMobileNo(user.getMobileNo());
			userd.setCity(user.getCity());

			// Set other fields...
			user_response.add(userd);

		}
		System.out.println(user_response);
		return new ResponseEntity<List<Userdto>>(user_response, HttpStatus.OK);

	}

	@GetMapping("/admin/userdetails/{userid}")
	public ResponseEntity<?> getoneuser(@PathVariable("userid") Integer id) {
		System.out.println("controller invoked");
		User user = userservice.getUserById(id);

		if (user == null)
			return new ResponseEntity<String>("Not  such Customer ", HttpStatus.NOT_FOUND);
		else

			return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteuser(@PathVariable("id") Integer id) {
		System.out.println("controller invoked");
		boolean status = userservice.deleteById(id);
		if (status)
			return ResponseEntity.ok("Todo deleted successfully!.");
		else
			return new ResponseEntity<String>("NO such Product", HttpStatus.NOT_FOUND);

	}

}
