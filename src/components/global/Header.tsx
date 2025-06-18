import Image from "next/image";

export default function Header({ className = "" }: { className?: string }) {
  return (
    <header
      className={`border-b border-gray-50 px-80 py-32 max-lg:px-20 max-lg:py-20 ${className}`}
    >
      <Image
        className={"block h-40 w-auto max-lg:h-32"}
        width={100}
        height={40}
        src="/logo.png"
        alt="Fillout"
      />
    </header>
  );
}
