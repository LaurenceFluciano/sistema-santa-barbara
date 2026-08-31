import { Button } from "@/ui/components/Button";

function Components() {
    return (
        <div className="flex flex-col">
            <h2 className="pb-8">Colors:</h2>
            
            <div className="flex flex-row gap-4">
                <div className="w-[50px] h-[50px] bg-[var(--light-neutral-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--neutral-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--foreground-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--strong-foreground-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--strong-surface-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--surface-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--brand-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--press-brand-color)]" />
                <div className="w-[50px] h-[50px] bg-[var(--hover-brand-color)]" />
            </div>


            <h2>Buttons: </h2>

            <div className="flex flex-row gap-4">
                <Button variant="normal" type="submit" onClick={() => alert("Testando")} >
                    Hello World!
                </Button>
            </div>
        </div>
    )
}

export default Components;