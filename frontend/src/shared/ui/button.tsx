import { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-ink text-white hover:bg-slate-800 focus:ring-slate-700",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        className,
      )}
      {...props}
    />
  );
}
