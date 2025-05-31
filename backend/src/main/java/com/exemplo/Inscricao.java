package com.exemplo;

import jakarta.persistence.*;

@Entity
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Estudante estudante;

    @ManyToOne
    private Vaga vaga;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Estudante getEstudante() { return estudante; }
    public void setEstudante(Estudante estudante) { this.estudante = estudante; }
    public Vaga getVaga() { return vaga; }
    public void setVaga(Vaga vaga) { this.vaga = vaga; }
}
