import "@/ui/styles/button.css";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "normal" | "outline";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    variant?: ButtonVariant;
    children: ReactNode;
    onClick?: () => Promise<void> | void; 
}

export function Button({ 
    onClick, 
    variant = "normal", 
    children, 
    disabled,
    className = "",
    ...props 
}: ButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (!onClick || isLoading) return;

        try {
            setIsLoading(true);
            await onClick();
        } finally {
            setIsLoading(false);
        }
    }

    const pressedClass = isLoading ? `button-${variant}--pressed` : "";
    const classNames = `button button-${variant} ${pressedClass} ${className}`.trim();

    return (
        <button 
            onClick={handleClick} 
            className={classNames} 
            disabled={disabled || isLoading}
            {...props}
        >
            {children}
        </button>
    );
}