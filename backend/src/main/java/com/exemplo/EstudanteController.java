package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {
    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Estudante estudante) {
        if (estudante.getSenha() == null || estudante.getSenha().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Senha obrigatória"));
        }
        return ResponseEntity.ok(estudanteRepository.save(estudante));
    }

    @GetMapping
    public List<Estudante> listar() {
        return estudanteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Estudante buscarPorId(@PathVariable Long id) {
        return estudanteRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Estudante atualizar(@PathVariable Long id, @RequestBody Estudante estudante) {
        estudante.setId(id);
        return estudanteRepository.save(estudante);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deletar(@PathVariable Long id) {
        // Deleta inscrições do estudante
        inscricaoRepository.deleteAll(inscricaoRepository.findByEstudanteId(id));
        // Força o flush para garantir que as inscrições sejam removidas antes de deletar o estudante
        inscricaoRepository.flush();
        // Deleta estudante
        estudanteRepository.deleteById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO credenciais) {
        Estudante estudante = estudanteRepository.findByEmail(credenciais.getEmail());
        if (estudante != null && estudante.getSenha().equals(credenciais.getSenha())) {
            // Token simulado
            String token = "token-estudante-" + estudante.getId();
            return ResponseEntity.ok().body(Map.of(
                "token", token,
                "tipo", "estudante",
                "id", estudante.getId(),
                "nome", estudante.getNome(),
                "email", estudante.getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas"));
    }

    @GetMapping("/count")
    public long count() {
        return estudanteRepository.count();
    }

    static class LoginDTO {
        private String email;
        private String senha;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }
}
