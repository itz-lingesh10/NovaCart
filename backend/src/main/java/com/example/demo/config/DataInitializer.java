package com.example.demo.config;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        log.info("Initializing default NovaCart data...");

        // 1. Users
        User admin = new User(null, "admin", passwordEncoder.encode("admin123"), "admin@novacart.com", "ROLE_ADMIN", "System", "Admin", "+1234567890", "123 Admin Way");
        User lingesh = new User(null, "lingeshk10", passwordEncoder.encode("password123"), "lingesh@novacart.com", "ROLE_USER", "Lingesh", "K", "+919876543210", "Coimbatore, India");
        User ney = new User(null, "ney", passwordEncoder.encode("password123"), "ney@novacart.com", "ROLE_USER", "Neymar", "Jr", "+551199999999", "Santos, Brazil");
        User user1 = new User(null, "user1", passwordEncoder.encode("password123"), "user1@novacart.com", "ROLE_USER", "Alex", "Gamer", "+1234567891", "456 Player Ave");
        User neymar10 = new User(null, "neymar10", passwordEncoder.encode("password123"), "neymar10@novacart.com", "ROLE_USER", "Neymar", "Da Silva", "+551188888888", "Paris, France");
        User neymarjr = new User(null, "neymarjr", passwordEncoder.encode("password123"), "neymarjr@novacart.com", "ROLE_USER", "Ney", "Junior", "+551177777777", "Riyadh, Saudi Arabia");

        userRepository.saveAll(List.of(admin, lingesh, ney, user1, neymar10, neymarjr));

        // 2. Categories
        Category consoles = new Category(null, "Gaming Consoles", "gaming-consoles", "Next-gen consoles, bundles, and premium edition machines.");
        Category peripherals = new Category(null, "Peripherals", "peripherals", "Precision controllers, wireless mice, mechanical keyboards, and displays.");
        Category rigs = new Category(null, "Gaming Rigs", "gaming-rigs", "Pre-built tournament-grade battlestations and workstations.");
        Category accessories = new Category(null, "Accessories", "accessories", "Immersive 3D audio headsets, cables, and fast charging docks.");

        categoryRepository.saveAll(List.of(consoles, peripherals, rigs, accessories));

        // 3. Products
        Product ps5 = new Product(null, "PS5 Console", "ps5-console",
                "Sony PlayStation 5 Console with ultra-high speed SSD, haptic feedback, adaptive triggers, and 3D Audio.",
                new BigDecimal("499.00"), 25,
                "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
                consoles, LocalDateTime.now(), LocalDateTime.now());

        Product dualsense = new Product(null, "DualSense Controller", "dualsense-controller",
                "Wireless controller for PlayStation 5 with haptic feedback, built-in microphone, and ergonomic grip.",
                new BigDecimal("59.00"), 50,
                "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80",
                peripherals, LocalDateTime.now(), LocalDateTime.now());

        Product mouse = new Product(null, "Wireless Mouse", "wireless-mouse",
                "Ultra-lightweight wireless esports gaming mouse with 26K DPI optical sensor and PTFE feet.",
                new BigDecimal("19.99"), 65,
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
                peripherals, LocalDateTime.now(), LocalDateTime.now());

        Product keyboard = new Product(null, "Mechanical Keyboard", "mechanical-keyboard",
                "Hot-swappable RGB mechanical gaming keyboard with lubed linear switches and double-shot PBT keycaps.",
                new BigDecimal("129.99"), 30,
                "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
                peripherals, LocalDateTime.now(), LocalDateTime.now());

        Product game = new Product(null, "PS5 Game", "ps5-game",
                "Next-generation blockbuster title featuring ray tracing, 60fps fidelity, and instantaneous loading.",
                new BigDecimal("69.99"), 45,
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
                consoles, LocalDateTime.now(), LocalDateTime.now());

        Product rig = new Product(null, "RTX 4090 Gaming Rig", "rtx-4090-gaming-rig",
                "Flagship custom PC with liquid-cooled Intel Core i9-14900K, 64GB DDR5 RAM, and RTX 4090 24GB.",
                new BigDecimal("2499.00"), 10,
                "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
                rigs, LocalDateTime.now(), LocalDateTime.now());

        Product headset = new Product(null, "Gaming Headset Pro", "gaming-headset-pro",
                "Spatial audio headset with planar magnetic drivers and clear broadcast-grade detachable microphone.",
                new BigDecimal("89.99"), 40,
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
                accessories, LocalDateTime.now(), LocalDateTime.now());

        Product monitor = new Product(null, "4K 144Hz Gaming Monitor", "4k-gaming-monitor",
                "32-inch IPS UHD gaming display featuring 1ms response time, HDR 600, and G-Sync compatibility.",
                new BigDecimal("449.99"), 18,
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
                peripherals, LocalDateTime.now(), LocalDateTime.now());

        productRepository.saveAll(List.of(ps5, dualsense, mouse, keyboard, game, rig, headset, monitor));

        // 4. Sample Orders matching screenshots in the report
        createSampleOrder(lingesh, OrderStatus.DELIVERED, new BigDecimal("1000.00"), List.of(new SampleItem(ps5, 2, new BigDecimal("499.00")), new SampleItem(mouse, 1, new BigDecimal("19.99"))));
        createSampleOrder(user1, OrderStatus.CONFIRMED, new BigDecimal("1000.00"), List.of(new SampleItem(ps5, 2, new BigDecimal("499.00"))));
        createSampleOrder(neymar10, OrderStatus.SHIPPED, new BigDecimal("30000.00"), List.of(new SampleItem(rig, 12, new BigDecimal("2499.00"))));
        createSampleOrder(neymarjr, OrderStatus.PENDING, new BigDecimal("40000.00"), List.of(new SampleItem(rig, 16, new BigDecimal("2499.00"))));
        createSampleOrder(ney, OrderStatus.DELIVERED, new BigDecimal("5039.98"), List.of(new SampleItem(ps5, 5, new BigDecimal("1000.00")), new SampleItem(mouse, 2, new BigDecimal("19.99"))));
        createSampleOrder(ney, OrderStatus.CONFIRMED, new BigDecimal("80000.00"), List.of(new SampleItem(game, 2, new BigDecimal("40000.00"))));
        createSampleOrder(ney, OrderStatus.PENDING, new BigDecimal("150000.00"), List.of(new SampleItem(rig, 60, new BigDecimal("2499.00"))));

        log.info("NovaCart data initialization complete with users, categories, products, and sample orders.");
    }

    private void createSampleOrder(User user, OrderStatus status, BigDecimal total, List<SampleItem> items) {
        Order order = new Order();
        order.setUser(user);
        order.setStatus(status);
        order.setTotalAmount(total);
        order.setOrderDate(LocalDateTime.now().minusDays((long) (Math.random() * 5 + 1)));

        for (SampleItem it : items) {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(it.product);
            oi.setQuantity(it.quantity);
            oi.setPrice(it.price);
            order.getOrderItems().add(oi);
        }

        orderRepository.save(order);
    }

    private static class SampleItem {
        final Product product;
        final int quantity;
        final BigDecimal price;

        SampleItem(Product product, int quantity, BigDecimal price) {
            this.product = product;
            this.quantity = quantity;
            this.price = price;
        }
    }
}
