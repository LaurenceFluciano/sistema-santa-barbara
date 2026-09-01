import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";

function Components() {
    return (
        <div className="flex flex-col w-[80vw] mx-auto">
            <h2 className="my-8">Colors:</h2>
            
            <div className="flex flex-row gap-4">
                <div className="w-[50px] h-[50px] bg-[var(--light-neutral-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--neutral-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--foreground-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--strong-foreground-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--strong-surface-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--surface-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--brand-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--press-brand-color)] rounded-lg" />
                <div className="w-[50px] h-[50px] bg-[var(--hover-brand-color)] rounded-lg" />
            </div>


            <h2 className="my-8">Buttons: </h2>

            <div className="flex flex-row gap-4">
                <Button 
                    variant="normal"
                    type="submit" 
                    onClick={() => alert("Testando")} 
                >
                    Hello World!
                </Button>

                <Button 
                    variant="outline" 
                    type="submit" 
                    onClick={() => alert("Testando")} 
                >
                    Hello World!
                </Button>

                <Button 
                    variant="normal" 
                    type="submit" 
                    disabled
                    onClick={() => alert("Testando")} 
                >
                    Hello World!
                </Button>


                <Button 
                    variant="outline" 
                    type="submit" 
                    disabled
                    onClick={() => alert("Testando")} 
                >
                    Hello World!
                </Button>
            </div>


            <h2 className="my-8">Input: </h2>

            <div className="flex flex-col w-full gap-8">
                <Input variant="normal" placeholder="Testing" className="w-[100%]"/>
                <Input variant="normal" placeholder="Testing" className="w-[100%]" disabled/>

            </div>
        </div>
    )
}

export default Components;