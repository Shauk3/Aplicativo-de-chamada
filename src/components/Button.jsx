import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        />
    );
}
