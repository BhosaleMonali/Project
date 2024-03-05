package cakeapi.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cakeapi.entity.Product;
import cakeapi.service.ProductService;

//@CrossOrigin(local)

@RestController
@CrossOrigin("*")
public class ProductController {

	@Autowired
	private ProductService pservice;

	@PostMapping("/admin/product")
	public ResponseEntity<?> saveProduct(@ModelAttribute Product product, @RequestParam("image") MultipartFile pic)
			throws IOException {
		System.out.println("Controller Invoked");
		pservice.addProduct(product, pic);
		return new ResponseEntity<String>("Product Added Successfully..!!", HttpStatus.CREATED);
	}

	@DeleteMapping("/product/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") Integer id) {
		boolean status = pservice.deleteById(id);
		System.out.println(status);
		if (status)

			return new ResponseEntity<String>("Todo deleted successfully!", HttpStatus.OK);
		else
			return new ResponseEntity<String>("NO such Product", HttpStatus.NOT_FOUND);

	}

	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getStudentByTitle(@PathVariable("id") Integer id) {
		Product product = pservice.getProductById(id);
		return ResponseEntity.ok().body(product);
	}

	@GetMapping("products")
	public ResponseEntity<?> getallproduct() {

		System.out.println("controller invoked");
		List<Product> products = pservice.findAllProduct();

		if (products != null)
			return ResponseEntity.ok(products);
		else
			return (ResponseEntity<?>) ResponseEntity.notFound();

	}

}
