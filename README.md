# Sistema Santa Barbara

Sistema de escola de música. 

# dev-cli Usage

Para instalar docker (provavelmente você teria que instalar manualmente):
```bash
./dev-cli install
```

Para Inicar:
```bash
./dev-cli init
```

Para Começar:
```bash
./dev-cli run
```

Para Parar:
```bash
./dev-cli stop
```

Para Limpar Todos os serviços:
```bash
./dev-cli destroy
```

# Docker Usage

Para iniciar:
```bash
docker compose up -d
```

Para limpar tudo:
```bash
docker compose down -v
```

Para ver todas as tabelas:
```bash
docker exec -it sb-postgres psql -U postgres -d postgres -c "\dt"
```

Para parar a execução:
```bash
docker compose stop
```

Para voltar com a execução:
```bash
docker compose start
```

Para listar os serviços em execução:
```bash
docker compose ls
```

Para listar todos os serviços:
```bash
docker compose ls -a
```
