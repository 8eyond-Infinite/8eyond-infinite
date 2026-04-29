import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black hover:bg-zinc-200",
      secondary: "bg-accent text-white hover:bg-accent/90",
      outline: "border border-white/10 bg-transparent hover:bg-white/5",
      ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-13 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
