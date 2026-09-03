package br.org.bandasantabarbara.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "membro_credencial")
public class MembroCredencial {

    @Id
    @Getter
    private UUID id;

    @Getter
    @Column(name = "hash_password", nullable = false)
    private String hashSenha;

    @Getter
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @Getter
    @Column(name = "atualizado_em", nullable = false)
    private Instant atualizadoEm;

    /*
     *
     * RELAÇÕES
     *
     */

    @OneToOne
    @MapsId
    @JoinColumn(name = "membro_id") // Define o nome da coluna física no banco de dados
    public Membro membro;

    protected MembroCredencial() {
        criadoEm = Instant.now();
        atualizadoEm = Instant.now();
    }

    public static MembroCredencial criar(Membro membro) {
        var membroCredencial = new MembroCredencial();
        membroCredencial.membro = membro;

        return membroCredencial;
    }


    public void alterarHashSenha(String hashSenha) {
        this.hashSenha = hashSenha;
        this.atualizadoEm = Instant.now();
    }


}
