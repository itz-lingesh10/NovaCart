-- ========================================================
-- NovaCart - Dynamic Headless E-Commerce Platform
-- Database Schema & Initial Data for MySQL 8+
-- ========================================================

CREATE DATABASE IF NOT EXISTS novacart_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE novacart_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    category_id BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT uk_cart_user_product UNIQUE (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Seed Data
-- Passwords are encrypted with BCrypt for 'admin123' and 'password123'
-- $2a$10$w095a5g3t92UeE8xT7KfeecqS6X7V2u7eF67kC6hCq7wD/cK7J4yK (admin123 / password123)
INSERT INTO users (username, password, email, role, first_name, last_name)
VALUES
('admin', '$2a$10$5oKkM5Bq7Zk6dG39o/wUveL4i7L7KqMhGz4J6t7wD8hC9u2rQ8qC2', 'admin@novacart.com', 'ROLE_ADMIN', 'System', 'Admin'),
('lingeshk10', '$2a$10$5oKkM5Bq7Zk6dG39o/wUveL4i7L7KqMhGz4J6t7wD8hC9u2rQ8qC2', 'lingesh@novacart.com', 'ROLE_USER', 'Lingesh', 'K'),
('ney', '$2a$10$5oKkM5Bq7Zk6dG39o/wUveL4i7L7KqMhGz4J6t7wD8hC9u2rQ8qC2', 'ney@novacart.com', 'ROLE_USER', 'Neymar', 'Junior')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO categories (id, name, slug, description)
VALUES
(1, 'Gaming Consoles', 'gaming-consoles', 'Next-gen video game consoles, bundles, and components.'),
(2, 'Peripherals', 'peripherals', 'High-performance controllers, keyboards, mice, and monitors.'),
(3, 'Gaming Rigs', 'gaming-rigs', 'Custom pre-built powerhouse battle stations.'),
(4, 'Accessories', 'accessories', 'Headsets, cables, chargers, and gaming add-ons.')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO products (id, name, slug, description, price, stock, image_url, category_id)
VALUES
(1, 'PS5 Console', 'ps5-console', 'Sony PlayStation 5 Console with ultra-high speed SSD, haptic feedback, and Tempest 3D Audio.', 499.00, 25, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80', 1),
(2, 'DualSense Controller', 'dualsense-controller', 'Wireless controller with immersive haptic feedback and dynamic triggers.', 59.00, 50, 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80', 2),
(3, 'Wireless Mouse', 'wireless-mouse', 'Ergonomic ultra-low latency wireless gaming mouse with 25K DPI sensor.', 19.99, 65, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80', 2),
(4, 'Mechanical Keyboard', 'mechanical-keyboard', 'RGB mechanical gaming keyboard with responsive linear optical switches.', 129.99, 30, 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80', 2),
(5, 'PS5 Game', 'ps5-game', 'Action-packed exclusive PlayStation 5 adventure title.', 69.99, 45, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', 1),
(6, 'RTX 4090 Gaming Rig', 'rtx-4090-gaming-rig', 'Liquid-cooled powerhouse workstation with Intel Core i9 and NVIDIA RTX 4090.', 2499.00, 10, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80', 3),
(7, 'Gaming Headset Pro', 'gaming-headset-pro', 'Spatial audio wireless gaming headset with noise-canceling microphone.', 89.99, 40, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80', 4),
(8, '4K 144Hz Gaming Monitor', '4k-gaming-monitor', '32-inch IPS UHD gaming monitor with 1ms response and FreeSync Premium Pro.', 449.99, 18, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80', 2)
ON DUPLICATE KEY UPDATE id=id;
