package com.exemplo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findByEstudanteId(Long estudanteId);
    List<Inscricao> findByVagaId(Long vagaId);
    boolean existsByEstudanteIdAndVagaId(Long estudanteId, Long vagaId);
    long count();
}
