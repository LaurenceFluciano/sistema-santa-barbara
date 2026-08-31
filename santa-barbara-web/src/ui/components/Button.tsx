import "@/ui/styles/button.css";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "normal" | "outline";

export interface ButtonProps 
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>, 
        "onClick" | "onKeyDown" | "onKeyUp" | "onKeyDownCapture" | "onKeyUpCapture"
    > {
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

    async function handleClick() {
        if (isLoading) return;

        try {
            setIsLoading(true);
            if (onClick) await onClick();
        } finally {
            setIsLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    }

    const pressedClass = isLoading ? `button-${variant}--pressed` : "";
    const classNames = `button button-${variant} ${pressedClass} ${className}`.trim();

    return (
        <button 
            onClick={handleClick} 
            onKeyDown={handleKeyDown}
            className={classNames} 
            disabled={disabled || isLoading}
            {...props}
        >
            {children}
        </button>
    );
}