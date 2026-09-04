package br.org.bandasantabarbara.repositories;

import br.org.bandasantabarbara.model.Membro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;
import java.util.UUID;

public interface MembroRepository extends Repository<Membro, UUID> {

    Membro save(Membro membro);

    Optional<Membro> findById(UUID id);


    @Query("""
        SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END 
        FROM Membro m 
        JOIN m.papeis p 
        WHERE p.nome = 'SUPER_ADMIN'
    """)
    boolean existeAdminCadastrado();
}
