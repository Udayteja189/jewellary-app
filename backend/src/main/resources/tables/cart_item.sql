CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cart_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_cart_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE CASCADE,

    CONSTRAINT uc_cart UNIQUE (user_id, product_id)
);