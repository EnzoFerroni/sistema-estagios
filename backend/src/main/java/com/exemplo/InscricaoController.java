package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {
    @Autowired
    private InscricaoRepository inscricaoRepository;
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private VagaRepository vagaRepository;

    @PostMapping
    public Object inscrever(@RequestBody Map<String, Long> body) {
        Long estudanteId = body.get("estudanteId");
        Long vagaId = body.get("vagaId");
        if (inscricaoRepository.existsByEstudanteIdAndVagaId(estudanteId, vagaId)) {
            return Map.of("erro", "Você já está inscrito nesta vaga.");
        }
        Estudante estudante = estudanteRepository.findById(estudanteId).orElse(null);
        Vaga vaga = vagaRepository.findById(vagaId).orElse(null);
        if (estudante == null || vaga == null) {
            return Map.of("erro", "Estudante ou vaga não encontrada.");
        }
        Inscricao inscricao = new Inscricao();
        inscricao.setEstudante(estudante);
        inscricao.setVaga(vaga);
        return inscricaoRepository.save(inscricao);
    }

    @GetMapping("/estudante/{estudanteId}")
    public List<Inscricao> inscricoesPorEstudante(@PathVariable Long estudanteId) {
        return inscricaoRepository.findByEstudanteId(estudanteId);
    }

    @GetMapping("/vaga/{vagaId}")
    public List<Inscricao> inscricoesPorVaga(@PathVariable Long vagaId) {
        return inscricaoRepository.findByVagaId(vagaId);
    }

    @DeleteMapping("/{id}")
    public void deletarInscricao(@PathVariable Long id) {
        inscricaoRepository.deleteById(id);
    }
}
