package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/admins")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Admin admin) {
        if (admin.getSenha() == null || admin.getSenha().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Senha obrigatória"));
        }
        return ResponseEntity.ok(adminRepository.save(admin));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin credenciais) {
        Admin admin = adminRepository.findByEmail(credenciais.getEmail());
        if (admin != null && admin.getSenha().equals(credenciais.getSenha())) {
            String token = "token-admin-" + admin.getId();
            return ResponseEntity.ok().body(Map.of(
                "token", token,
                "tipo", "admin",
                "id", admin.getId(),
                "nome", admin.getNome(),
                "email", admin.getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas"));
    }

    @GetMapping
    public java.util.List<Admin> listar() {
        return adminRepository.findAll();
    }

    @GetMapping("/{id}")
    public Admin buscarPorId(@PathVariable Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Admin atualizar(@PathVariable Long id, @RequestBody Admin admin) {
        admin.setId(id);
        return adminRepository.save(admin);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        adminRepository.deleteById(id);
    }
}
