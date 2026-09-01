#!/usr/bin/env python3
from pathlib import Path
import platform
import subprocess
import shutil
import sys
import argparse
import webbrowser

current_dir = Path.cwd()
current_os = platform.system()

paths = {
    "frontend": current_dir / "santa-barbara-web"
}

class AppState:
    is_docker_run = False

    @staticmethod
    def shut_down():
        if AppState.is_docker_run:
            print("\n> Desligando serviços Docker...")
            try:
                run_command(["docker", "compose", "stop"])
                AppState.is_docker_run = False
            except Exception as e:
                print(f"Erro ao parar o Docker: {e}")

def run_command(command_list, working_dir=None, wait_and_capture=True):
    """Executa comandos do sistema gerenciando a saída"""
    try:
        if wait_and_capture:
            result = subprocess.run(
                command_list, 
                cwd=working_dir, 
                capture_output=True, 
                text=True, 
                check=True
            )
            if result.stdout:
                print(result.stdout.strip())
        else:
            subprocess.run(command_list, cwd=working_dir, check=True)
            
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar {' '.join(command_list)}:")
        if wait_and_capture and e.stderr:
            print(e.stderr)
        raise

def install():
    """Instala o Docker e Docker Compose automaticamente caso não estejam presentes"""
    print(f"--- Checando Ferramentas ({current_os}) ---")

    docker_exists = shutil.which("docker") is not None
    compose_exists = False

    if docker_exists:
        try:
            res = subprocess.run(["docker", "compose", "version"], capture_output=True, text=True)
            compose_exists = res.returncode == 0
        except Exception:
            compose_exists = False

    if docker_exists and compose_exists:
        print("Docker e Docker Compose já estão instalados e prontos para uso.")
        return

    print("Docker não foi detectado. Iniciando processo de instalação...")

    try:
        if current_os == "Linux":
            print("Distro Linux identificada. Não é possível realizar instalação automática.")
            print("> Por favor, instale o Docker manualmente em: https://docs.docker.com/engine/install/")
            sys.exit(1)

        elif current_os == "Darwin":
            print("> Instalando Docker Desktop via Homebrew...")
            
            if not shutil.which("brew"):
                print("\nHomebrew não encontrado no sistema.")
                print("Instale o Docker manualmente em: https://docs.docker.com/desktop/install/mac-install/")
                sys.exit(1)

            try:
                subprocess.run(["brew", "install", "--cask", "docker"], check=True)
                print("Docker Desktop instalado no macOS com sucesso!")
            except subprocess.CalledProcessError as e:
                print(f"\nErro na instalação via Homebrew: {e}")
                print("> Abrindo a página de download oficial no seu navegador...\n")
                print("Instale o Docker manualmente em: https://docs.docker.com/desktop/install/mac-install/")
                sys.exit(1)

        elif current_os == "Windows":
            try:
                print("> Instalando Docker Desktop via Winget...")
                comando = ["winget", "install", "Docker.DockerDesktop", "--accept-source-agreements", "--silent"]
                
                subprocess.run(comando, check=True)
                print("Docker Desktop instalado com sucesso no Windows!")
                print("Nota: Pode ser necessário reiniciar o computador para ativar o WSL2/Hyper-V.")
                
            except subprocess.CalledProcessError as e:
                print(f"\nErro na instalação automática: {e}")
                print("Certifique-se de que está executando o terminal como ADMINISTRADOR ou instale manualmente.")

                print("Instale o Docker manualmente em: https://docs.docker.com/desktop/install/windows-install/")


    except subprocess.CalledProcessError:
        print("\nFalha na instalação automática. Certifique-se de executar com permissões administrativas.")
        sys.exit(1)
    

def init():
    """Prepara o ambiente: baixa containers Docker e instala dependências npm"""
    print(f"--- Inicializando o Ambiente ({current_os}) ---")
    try:
        print("> Subindo containers Docker para download de imagens...")
        run_command(["docker", "compose", "up", "-d"])
        
        print("> Parando containers após inicialização...")
        run_command(["docker", "compose", "stop"])
        AppState.is_docker_run = False

        print("> Instalando dependências do Frontend (npm install)...")
        run_command(["npm", "install"], working_dir=paths["frontend"])

        print("\nAmbiente inicializado com sucesso! Execute './dev-cli run' para iniciar.")
    except Exception:
        print("\nProcesso de inicialização abortado devido a um erro.")

def run():
    """Inicia os serviços Docker e o servidor Frontend"""
    print(f"--- Rodando o Sistema Santa Bárbara ({current_os}) ---")
    try:
        print("> Rodando serviços Docker...")
        run_command(["docker", "compose", "start"])
        AppState.is_docker_run = True

        print("> Iniciando servidor Frontend (npm run dev)...")
        run_command(["npm", "run", "dev"], working_dir=paths["frontend"], wait_and_capture=False)
    
    except Exception:
        print("\nProcesso de execução abortado.")
        AppState.shut_down()

def stop():
    """Para todos os serviços Docker"""
    print(f"--- Parando Serviços ---")
    try:
        AppState.shut_down()
        print("Serviços parados com sucesso.")
    except Exception:
        print("Erro ao parar serviços Docker.")

def destroy():
    """Remove volumes Docker e apaga node_modules"""
    print(f"--- Limpando todo o ambiente ---")
    try:
        print("> Removendo todos os serviços e volumes do Docker...")
        run_command(["docker", "compose", "down", "-v"])
        AppState.is_docker_run = False

        print("> Removendo node_modules do Frontend...")
        node_modules_path = paths["frontend"] / "node_modules"
        
        if node_modules_path.exists():
            shutil.rmtree(node_modules_path, ignore_errors=True)
            print("  ✔ node_modules removido.")
            
        print("\nLimpeza completa concluída!")
    except Exception:
        print("\nProcesso de destruição abortado devido a um erro.")

def main():
    if current_os not in ["Windows", "Linux", "Darwin"]:
        print(f"[ OS não suportado ]: {current_os}")
        sys.exit(1)

    parser = argparse.ArgumentParser(description="CLI de Desenvolvimento - Sistema Santa Bárbara")
    parser.add_argument(
        "command", 
        choices=["init", "run", "stop", "destroy", "install"], 
        help="Comando a ser executado: install, init, run, stop ou destroy"
    )

    args = parser.parse_args()

    try:
        if args.command == "install":
            install()
        elif args.command == "init":
            init()
        elif args.command == "run":
            run()
        elif args.command == "stop":
            stop()
        elif args.command == "destroy":
            destroy()

            
    except KeyboardInterrupt:
        AppState.shut_down()
        print("\n\nServidor encerrado pelo usuário.")
        sys.exit(0)

if __name__ == "__main__":
    main()