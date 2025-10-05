import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
  style?: React.CSSProperties; // Added for style prop support
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white outline-offset-2 px-5 py-2 text-base";

const variants = {
  primary:
    "bg-black text-white hover:bg-gray-900 border border-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-100",
  secondary:
    "bg-white text-black hover:bg-gray-100 border border-black dark:bg-black dark:text-white dark:border-white dark:hover:bg-gray-900",
  outline:
    "bg-transparent text-black border border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black",
  ghost:
    "bg-transparent text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900 border border-transparent",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  href,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  rounded = false,
  ariaLabel,
  tabIndex,
  style,
}: ButtonProps) {
  const classes = clsx(
    baseStyles,
    variants[variant],
    fullWidth && "w-full",
    rounded ? "rounded-full" : "rounded-lg",
    disabled && "opacity-60 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        role="button"
        style={style}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading && (
        <span className="loader mr-2" aria-hidden="true">
          <svg
            className="animate-spin h-4 w-4 text-current"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10h2zm2 5.291A7.962 7.962 0 014 12H0c0 3.61 2.35 6.69 5.57 7.65l.43-2.359z"
            />
          </svg>
        </span>
      )}
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
}