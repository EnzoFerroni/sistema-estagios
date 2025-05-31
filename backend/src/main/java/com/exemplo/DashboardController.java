package com.exemplo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private VagaRepository vagaRepository;
    @Autowired
    private InscricaoRepository inscricaoRepository;

    @GetMapping
    public Map<String, Object> dashboard() {
        long totalEstudantes = estudanteRepository.count();
        long totalEmpresas = empresaRepository.count();
        long totalVagas = vagaRepository.count();
        long totalInscricoes = inscricaoRepository.count();
        List<Object[]> topEmpresasRaw = empresaRepository.findTopEmpresasByVagas();
        List<Map<String, Object>> topEmpresas = new ArrayList<>();
        for (int i = 0; i < Math.min(10, topEmpresasRaw.size()); i++) {
            Object[] obj = topEmpresasRaw.get(i);
            Empresa e = (Empresa) obj[0];
            Long total = (Long) obj[1];
            topEmpresas.add(Map.of(
                "id", e.getId(),
                "nome", e.getNome(),
                "totalVagas", total
            ));
        }
        return Map.of(
            "totalEstudantes", totalEstudantes,
            "totalEmpresas", totalEmpresas,
            "totalVagas", totalVagas,
            "totalInscricoes", totalInscricoes,
            "topEmpresas", topEmpresas
        );
    }
}
