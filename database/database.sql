-- Tabela principal de músicas
CREATE TABLE musica (
    id UUID PRIMARY KEY NOT NULL,
    titulo VARCHAR(256) NOT NULL,
    compositor VARCHAR(256) NOT NULL,
    iswc VARCHAR(256),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabela de gêneros musicais
CREATE TABLE genero (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(256) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabela de relacionamento: Uma música pode ter vários gêneros
CREATE TABLE genero_musica (
    id_musica UUID NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_musica, id_genero),
    FOREIGN KEY (id_musica) REFERENCES musica(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES genero(id) ON DELETE CASCADE
);
 
-- ============================================================================
-- TABELAS DE PARTITURAS
-- ============================================================================
 
-- Tabela de partituras (arranjos de músicas)
CREATE TABLE partitura (
    id UUID PRIMARY KEY NOT NULL,
    id_musica UUID NOT NULL,
    titulo VARCHAR(256) NOT NULL,
    url VARCHAR(2000) NOT NULL,
    arranjador VARCHAR(256),
    dificuldade INT,
    tipo_material_performace VARCHAR(256),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletado_em TIMESTAMP,
    FOREIGN KEY (id_musica) REFERENCES musica(id) ON DELETE CASCADE
);
 
-- Tabela de instrumentos
CREATE TABLE instrumento (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(256) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabela de relacionamento: Uma partitura pode ser para vários instrumentos
CREATE TABLE partitura_instrumento (
    id_partitura UUID NOT NULL,
    id_instrumento INT NOT NULL,
    PRIMARY KEY (id_partitura, id_instrumento),
    UNIQUE (id_partitura, id_instrumento),
    FOREIGN KEY (id_partitura) REFERENCES partitura(id) ON DELETE CASCADE,
    FOREIGN KEY (id_instrumento) REFERENCES instrumento(id) ON DELETE CASCADE
);
 
-- ============================================================================
-- TABELAS DE MEMBROS E CREDENCIAIS
-- ============================================================================
 
-- Tabela principal de membros
CREATE TABLE membro (
    id UUID PRIMARY KEY NOT NULL,
    nome_legal VARCHAR(256) NOT NULL,
    sobrenome_legal VARCHAR(256),
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(256),
    nome_usuario VARCHAR(256) UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(256) UNIQUE NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabela de credenciais de acesso (senha)
CREATE TABLE membro_credencial (
    membro_id UUID PRIMARY KEY NOT NULL,
    hash_password VARCHAR(256) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (membro_id) REFERENCES membro(id) ON DELETE CASCADE
);
 
-- ============================================================================
-- TABELAS DE PAPÉIS E RESPONSABILIDADE
-- ============================================================================
 
-- Tabela de papéis (roles) no sistema
CREATE TABLE papel (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(256) NOT NULL UNIQUE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabela de relacionamento: Um membro pode ter vários papéis
CREATE TABLE membro_papel (
    id_papel INT NOT NULL,
    id_membro UUID NOT NULL,
    PRIMARY KEY (id_papel, id_membro),
    UNIQUE (id_papel, id_membro),
    FOREIGN KEY (id_papel) REFERENCES papel(id) ON DELETE CASCADE,
    FOREIGN KEY (id_membro) REFERENCES membro(id) ON DELETE CASCADE
);
 
-- Tabela de responsabilidade (menores de idade)
CREATE TABLE membro_responsavel (
    id_responsavel UUID NOT NULL,
    id_membro_menor UUID NOT NULL,
    PRIMARY KEY (id_responsavel, id_membro_menor),
    CHECK (id_responsavel != id_membro_menor),
    FOREIGN KEY (id_responsavel) REFERENCES membro(id) ON DELETE CASCADE,
    FOREIGN KEY (id_membro_menor) REFERENCES membro(id) ON DELETE CASCADE
);
 
-- ============================================================================
-- TABELAS DE RELACIONAMENTO: MEMBROS E INSTRUMENTOS
-- ============================================================================
 
-- Tabela de relacionamento: Um membro pode tocar vários instrumentos
CREATE TABLE instrumento_membro (
    id_membro UUID NOT NULL,
    id_instrumento INT NOT NULL,
    PRIMARY KEY (id_membro, id_instrumento),
    UNIQUE (id_membro, id_instrumento),
    FOREIGN KEY (id_membro) REFERENCES membro(id) ON DELETE CASCADE,
    FOREIGN KEY (id_instrumento) REFERENCES instrumento(id) ON DELETE CASCADE
);
