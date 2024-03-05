package cakeapi.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_detail")
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id", unique = true, nullable = false, length = 10)
	private int id;

	@Column(name = "title", nullable = false, length = 50, unique = true)
	private String title;

	@Column(name = "product_image", length = 400)
	private String imagePath;

	@Column(name = "price_per_unit", precision = 12)
	private double pricepercake;

	@Column(nullable = false, length = 10)
	private int quantity;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(int id, String title, String imagePath, double pricepercake, int quantity) {
		super();
		this.id = id;
		this.title = title;
		this.imagePath = imagePath;
		this.pricepercake = pricepercake;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public double getPricepercake() {
		return pricepercake;
	}

	public void setPricepercake(double pricepercake) {
		this.pricepercake = pricepercake;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", title=" + title + ", imagePath=" + imagePath + ", pricepercake=" + pricepercake
				+ ", quantity=" + quantity + "]";
	}

}
