package br.org.bandasantabarbara.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "membro")
public class Membro {
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.VERSION_7)
    @Getter
    private UUID id;

    @Getter
    @Setter
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Getter
    @Setter
    @Column(name = "nome_legal")
    private String nome;

    @Getter
    @Setter
    @Column(name = "sobrenome_legal")
    private String sobrenome;

    @Getter
    @Setter
    @Column(name = "nome_usuario", unique = true)
    private String nomeDeUsuario;

    @Getter
    @Setter
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Getter
    @Setter
    @Column(name = "endereco")
    private String endereco;

    @Getter
    @Setter
    @Column(name = "telefone")
    private String telefone;

    @Getter
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @Getter
    @Column(name = "atualizado_em", nullable = false)
    private Instant atualizadoEm;

    /*
    *
    * CONSTRUTORES
    *
     */

    public Membro(String email, String nomeDeUsuario) {
        this();
        this.email = email;
        this.nomeDeUsuario = nomeDeUsuario;
    }

    protected Membro() {
        criadoEm = Instant.now();
        atualizadoEm = Instant.now();
    }

}
