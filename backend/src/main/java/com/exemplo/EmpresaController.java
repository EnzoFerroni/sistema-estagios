package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Empresa empresa) {
        if (empresa.getSenha() == null || empresa.getSenha().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Senha obrigatória"));
        }
        return ResponseEntity.ok(empresaRepository.save(empresa));
    }

    @GetMapping
    public List<Empresa> listar() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Empresa buscarPorId(@PathVariable Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Empresa atualizar(@PathVariable Long id, @RequestBody Empresa empresa) {
        empresa.setId(id);
        return empresaRepository.save(empresa);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deletar(@PathVariable Long id) {
        // Busca todas as vagas da empresa
        List<Vaga> vagas = vagaRepository.findAll().stream()
            .filter(v -> v.getEmpresa() != null && v.getEmpresa().getId().equals(id))
            .toList();
        // Deleta inscrições das vagas da empresa
        for (Vaga vaga : vagas) {
            inscricaoRepository.deleteAll(inscricaoRepository.findByVagaId(vaga.getId()));
        }
        // Deleta vagas da empresa
        for (Vaga vaga : vagas) {
            vagaRepository.deleteById(vaga.getId());
        }
        // Deleta empresa
        empresaRepository.deleteById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Empresa credenciais) {
        Empresa empresa = empresaRepository.findByEmail(credenciais.getEmail());
        if (empresa != null && empresa.getSenha().equals(credenciais.getSenha())) {
            // Token simulado
            String token = "token-empresa-" + empresa.getId();
            return ResponseEntity.ok().body(Map.of(
                "token", token,
                "tipo", "empresa",
                "id", empresa.getId(),
                "nome", empresa.getNome(),
                "email", empresa.getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas"));
    }

    @GetMapping("/top-vagas")
    public List<Map<String, Object>> topEmpresasPorVagas() {
        List<Object[]> results = empresaRepository.findTopEmpresasByVagas();
        return results.stream().limit(10).map(obj -> {
            Empresa e = (Empresa) obj[0];
            Long total = (Long) obj[1];
            return Map.<String, Object>of(
                "id", e.getId(),
                "nome", e.getNome(),
                "totalVagas", total
            );
        }).toList();
    }

    @GetMapping("/count")
    public long count() {
        return empresaRepository.count();
    }
}
