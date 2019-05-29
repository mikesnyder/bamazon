DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(55) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(6) NOT NULL,
  PRIMARY KEY (id),
  KEY department_name (department_name)
);

INSERT INTO products VALUES(1,'Star Wars Episode IV A New Hope','Movies',10,44),(2,'Star Wars Episode I The Phantom Menace','Movies',4.99,124),(3,'Star Wars Episode V The Empire Strikes Back','Movies',11.99,19),(4,'Harry Potter and the Goblet of Fire','Books',11,25),(5,'Harry Potter and the Order of the Phoenix','Books',11,31),(6,'Harry Potter Collection Signed','Books',349.99,7),(7,'Mace Windu Lightsaber','Collector Items',175,73),(8,'Darth Vader Mask','Collector Items',225,87),(9,'Voldemort Wand Replica','Collector Items',99.99,49),(10,'Quidditch Snitch','Collector Items',24.99,101),(11,'Star Wars Lords of the Sith','Books',9.99,51);