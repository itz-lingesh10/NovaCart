package com.example.demo.controller;

import com.example.demo.dto.CartRequest;
import com.example.demo.dto.CartResponse;
import com.example.demo.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartResponse>> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartByUser(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<CartResponse> addToCart(Authentication authentication, @Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(authentication.getName(), request));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCartAdd(Authentication authentication, @Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(authentication.getName(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartResponse> updateCartItem(@PathVariable Long id, Authentication authentication,
                                                         @Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.updateCartItem(id, authentication.getName(), request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long id, Authentication authentication) {
        cartService.removeCartItem(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
