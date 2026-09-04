package br.org.bandasantabarbara.infrastructure.controller;


import br.org.bandasantabarbara.application.AutenticarMembroUseCase;
import br.org.bandasantabarbara.application.LoginRequest;
import br.org.bandasantabarbara.application.TokenResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private final AutenticarMembroUseCase autenticarMembroUseCase;

    public AutenticacaoController(AutenticarMembroUseCase autenticarMembroUseCase) {
        this.autenticarMembroUseCase = autenticarMembroUseCase;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid LoginRequest request) {
        TokenResponse response = autenticarMembroUseCase.executar(request);
        return ResponseEntity.ok(response);
    }
}