package com.lab.itemservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final List<Map<String, Object>> items = new ArrayList<>(List.of(
            Map.of("id", 0, "name", "Book"),
            Map.of("id", 1, "name", "Laptop"),
            Map.of("id", 2, "name", "Phone")
    ));
    private final AtomicInteger idCounter = new AtomicInteger(3);

    @GetMapping
    public List<Map<String, Object>> getItems() {
        return items;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody Map<String, Object> body) {
        Map<String, Object> item = new java.util.HashMap<>(body);
        item.put("id", idCounter.getAndIncrement());
        items.add(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getItem(@PathVariable int id) {
        return items.stream()
                .filter(i -> ((Number) i.get("id")).intValue() == id)
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
