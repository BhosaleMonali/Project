package cakeapi.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cakeapi.entity.Product;
import cakeapi.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productrepo;
	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";

	public Product addProduct(Product p, MultipartFile file) throws IOException {
		System.out.println("Product Service invoked");
		// String photo=storageService.store(pic);
		String originalFilename = file.getOriginalFilename();
		System.out.println(originalFilename);
		Path fileNameAndPath = Paths.get(uploadDirectory, originalFilename);
		Files.write(fileNameAndPath, file.getBytes());
		p.setImagePath(originalFilename);
//		System.out.println();
//		p.setImagePath(photo);
		return productrepo.save(p);
	}

	public Product getProductById(Integer product) {
		return productrepo.findById(product).orElse(null);
	}

	public List<Product> findAllProduct() {
		return productrepo.findAll();

	}

	public boolean deleteById(Integer id) {
		boolean flag = false;
		Product p = productrepo.findById(id).orElse(null);
		if (p != null) {

//				File filePath = new File(uploadDirectory, p.getImagePath());
			// Path fileNameAndPath=Paths.get(uploadDirectory,p.getImagePath());

//						System.out.println(filepath);
//				if(fileNameAndPath.exists())
//					filePath.delete();
			productrepo.deleteById(id);
			flag = true;
		}

		return flag;
	}

}
