package br.org.bandasantabarbara.model;

import lombok.Getter;

public class Senha {

    @Getter
    private String value;

    protected Senha(String value) {
        this.value = value;
    }

    public static Senha deHashPronto(String hash) {
        return new Senha(hash);
    }

    protected static Senha criar(String password) {
        // TO-DO: Adicionar regras de negócio:
        // minimo 8 letras,
        // 1 simbolo especial,
        // numero e letra maiuscula.

        return new Senha(password);
    }
}
