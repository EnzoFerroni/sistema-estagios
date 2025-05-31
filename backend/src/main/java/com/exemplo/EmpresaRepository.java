package com.exemplo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Empresa findByEmail(String email);

    @Query("SELECT e, COUNT(v) as totalVagas FROM Empresa e LEFT JOIN Vaga v ON v.empresa = e GROUP BY e ORDER BY totalVagas DESC")
    List<Object[]> findTopEmpresasByVagas();
}
