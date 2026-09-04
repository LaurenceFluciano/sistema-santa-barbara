package br.org.bandasantabarbara.infrastructure.controller;

import br.org.bandasantabarbara.application.DefaultMessageResponse;
import br.org.bandasantabarbara.application.DomainExceptionResponse;
import br.org.bandasantabarbara.exception.DomainException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<DomainExceptionResponse> handleDomainException(DomainException ex) {
        log.warn("Exceção de domínio capturada: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new DomainExceptionResponse(ex.getMessage(), ex.getErrors())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<DefaultMessageResponse> handleGenericException(Exception ex) {
        log.error("Ocorreu um erro não esperado no sistema:", ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new DefaultMessageResponse("Ocorreu um erro interno no servidor.")
        );
    }
}