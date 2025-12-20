CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    originalPrice DECIMAL(10, 2) NOT NULL,
    discountPrice DECIMAL(10, 2),
    image VARCHAR(500)
);