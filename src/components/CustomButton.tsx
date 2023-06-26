import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type CustomButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function CustomButton({
  small,
  gray,
  className = "",
  ...props
}: CustomButtonProps) {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2fon bold";
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-gray-400 focus-visible:bg-gray-400";

  return <button className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed diabled: opacity-50 text-white ${sizeClasses} ${colorClasses} ${className}`} {...props}></button>;
}
