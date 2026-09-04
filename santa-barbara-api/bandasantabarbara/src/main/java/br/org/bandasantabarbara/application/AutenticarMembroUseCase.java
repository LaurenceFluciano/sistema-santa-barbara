package br.org.bandasantabarbara.application;

import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticarMembroUseCase {

    private final MembroCredencialRepository credencialRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AutenticarMembroUseCase(
            MembroCredencialRepository credencialRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService) {
        this.credencialRepository = credencialRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional(readOnly = true)
    public TokenResponse executar(LoginRequest request) {
        var credencial = credencialRepository.findByUsername(request.username())
                .orElseThrow(CredenciaisInvalidasException::new);

        // O passwordEncoder.matches extrai os parâmetros (salt, custo) do hash Argon2
        // e valida se a senha em texto puro gera o mesmo hash.
        boolean senhaValida = passwordEncoder.matches(request.senha(), credencial.getHashPassword());

        if (!senhaValida) {
            throw new CredenciaisInvalidasException();
        }

        String token = tokenService.gerarToken(credencial.getMembro());
        return TokenResponse.bearer(token, tokenService.getTempoExpiracaoSegundos());
    }
}