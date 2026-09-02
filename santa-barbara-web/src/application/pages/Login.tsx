import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";

import "@/ui/styles/login.css";

function Login() {
    return (
        <form 
            action="" 
            className={`
                max-w-[744px]
                w-[50%]
                min-w-[500px]
                border-1 border-solid border-[var(--light-neutral-color)]
                px-[72px] pb-[64px] pt-[36px]
                mx-auto
                rounded-[16px]
                mt-32
                mb-32

                flex
                flex-col
                gap-[24px]
            `}
        >
        
            <h1 className="py-[32px] mx-auto login__title">Login</h1>

            <div className="flex flex-col gap-[12px]">
                <label htmlFor="username" className="login__label">Nome de usuário ou Email:</label>
                <Input name="username" variant="normal" placeholder="Email ou Nome de Usuário" />
            </div>

            <div className="flex flex-col gap-[12px]">
                <label htmlFor="password" className="login__label">Senha:</label>
                <Input name="password" variant="normal" placeholder="Senha" />
            </div>

            <div className="flex flex-row w-[100%] pt-[64px]">
                <Button type="submit" className="w-[100%]">Entrar</Button>
            </div>
                
        </form>
    )
}

export default Login;