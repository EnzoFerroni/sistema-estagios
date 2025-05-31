package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vagas")
public class VagaController {
    @Autowired
    private VagaRepository vagaRepository;

    @GetMapping
    public List<Vaga> listar(@RequestParam(value = "empresaId", required = false) Long empresaId) {
        if (empresaId != null) {
            return vagaRepository.findAll().stream()
                .filter(v -> v.getEmpresa() != null && v.getEmpresa().getId().equals(empresaId))
                .toList();
        }
        return vagaRepository.findAll();
    }

    @PostMapping
    public Vaga criar(@RequestBody Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    @GetMapping("/{id}")
    public Vaga buscarPorId(@PathVariable Long id) {
        return vagaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Vaga atualizar(@PathVariable Long id, @RequestBody Vaga vaga) {
        vaga.setId(id);
        return vagaRepository.save(vaga);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        vagaRepository.deleteById(id);
    }

    @GetMapping("/count")
    public long count() {
        return vagaRepository.count();
    }
}
