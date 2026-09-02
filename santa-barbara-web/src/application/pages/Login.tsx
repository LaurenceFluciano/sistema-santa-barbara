import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";

import "@/ui/styles/login.css";

function Login() {
    return (
        <form 
            action="" 
            className={`
                w-[90%]
                xl:w-[35%]
                h-fit

                border-1 border-solid border-[var(--light-neutral-color)]
                
                2xl:px-[72px] 2xl:pb-[64px] 2xl:pt-[36px]
                xl:px-[48px] xl:pb-[32px] xl:pt-[18px]
                px-[32px] pb-[16px] pt-[9px]
                
                rounded-[16px]
                
                mx-auto
                my-auto
                gap-[24px]

                flex
                flex-col
            `}
        >
        
            <h1 className="2xl:py-[32px] py-[16px] mx-auto login__title">Login</h1>

            <div className="flex flex-col 2xl:gap-[12px] gap-[6px]">
                <label htmlFor="username" className="login__label">Nome de usuário ou Email:</label>
                <Input name="username" variant="normal" placeholder="Email ou Nome de Usuário" />
            </div>

            <div className="flex flex-col 2xl:gap-[12px] gap-[6px]">
                <label htmlFor="password" className="login__label">Senha:</label>
                <Input name="password" variant="normal" placeholder="Senha" />
            </div>

            <div className="flex flex-row w-[100%] 2xl:pt-[64px] pt-[24px]">
                <Button type="submit" className="w-[100%]">Entrar</Button>
            </div>
                
        </form>
    )
}

export default Login;