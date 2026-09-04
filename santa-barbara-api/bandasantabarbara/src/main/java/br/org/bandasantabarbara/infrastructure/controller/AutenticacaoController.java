package br.org.bandasantabarbara.infrastructure.controller;


import br.org.bandasantabarbara.application.AutenticarMembroUseCase;
import br.org.bandasantabarbara.application.LoginRequest;
import br.org.bandasantabarbara.application.MeResponse;
import br.org.bandasantabarbara.application.TokenResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/me")
    public ResponseEntity<MeResponse> obterDadosDoMembroAutenticado(@AuthenticationPrincipal Jwt jwt) {
        String id = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String nomeUsuario = jwt.getClaimAsString("nomeUsuario");

        return ResponseEntity.ok(new MeResponse(id, nomeUsuario, email));
    }
}