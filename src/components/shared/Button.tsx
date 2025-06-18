import Link, { type LinkProps } from "next/link";
import type { MouseEvent } from "react";
import CustomIcon, { IconList } from "@/src/components/shared/CustomIcon";

/**
 * Button props.
 *
 * - If `to` is provided, a router link (e.g., <Link>) is rendered.
 * - If `href` is provided, a regular link tag (<a>) is rendered.
 * - Otherwise, a <button> is rendered.
 */
type ButtonProps = {
  /** Used `to` for router navigation (e.g., Next.js or React Router) */
  to?: LinkProps["href"];
  /** Used for external or absolute links */
  href?: string;

  type?: "button" | "submit" | "reset";
  disabled?: boolean;

  icon?: IconList;
  size?: "m" | "l" | "s";
  style?: "primary" | "secondary";

  className?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
};

export default function Button({
  to,
  href,

  type = "button",
  disabled,

  icon,
  size = "m",
  style = "primary",

  className = "",
  children,
  onClick,

  ...props
}: ButtonProps): React.ReactElement {
  const sizeClass: string = {
    l: `h-54 px-24 text-body-m rounded-16`,
    m: `h-40 px-16 text-body-s rounded-8`,
    s: "h-32 px-10 text-body rounded-8",
  }[size];

  const styleClass: string = {
    primary: "border-gray-50 shadow hover:shadow-active hover:border-blue",
    secondary: "bg-gray-100/15 border-transparent shadow hover:bg-gray-100/35",
  }[style];

  const classes = `button flex items-center cursor-pointer whitespace-nowrap justify-center gap-8 select-none border duration-300 ${styleClass} ${sizeClass} ${className}`;

  return to ? (
    <Link href={to} className={classes} {...props}>
      {icon && <CustomIcon className={"size-20"} icon={icon} />}
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={classes} {...props} onClick={onClick}>
      {icon && <CustomIcon className={"size-20"} icon={icon} />}
      {children}
    </a>
  ) : (
    <button
      disabled={disabled}
      type={type}
      className={`disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none ${classes}`}
      {...props}
      onClick={onClick}
    >
      {icon && <CustomIcon className={"size-20"} icon={icon} />}
      {children}
    </button>
  );
}
