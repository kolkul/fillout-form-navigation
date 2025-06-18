import { ICONS } from "@/src/constants/custom-icons";

export type IconList = keyof typeof ICONS;

export default function CustomIcon({
  icon,
  className = "",
  ...rest
}: {
  icon: IconList;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return (
    <div {...rest} className={`custom-icon ${className}`}>
      <Icon className={"size-full"} />
    </div>
  );
}
