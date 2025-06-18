import Link, { type LinkProps } from "next/link";
import CustomIcon, { IconList } from "@/src/components/shared/CustomIcon";

export default function NavigationLink({
  to,
  href,
  icon,

  className = "",
  children,
  ...props
}: {
  to?: LinkProps["href"];
  href?: string;
  icon?: IconList;

  className?: string;
  children: React.ReactNode;
}) {
  const classes = `text-body-m hover:text-blue flex cursor-pointer items-center justify-start gap-8 text-black duration-300 ${className}`;

  return to ? (
    <Link href={to} className={classes} {...props}>
      {icon && <CustomIcon className={"size-24 min-w-24"} icon={icon} />}
      {children}
    </Link>
  ) : (
    <a href={href} className={classes} {...props}>
      {icon && <CustomIcon className={"size-24 min-w-24"} icon={icon} />}
      {children}
    </a>
  );
}
