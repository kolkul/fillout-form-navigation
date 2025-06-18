import NavigationLink from "@/src/components/shared/NavigationLink";
import Button from "@/src/components/shared/Button";

export default function Aside({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`flex flex-col justify-between gap-24 border-r border-gray-50 px-80 py-40 max-lg:hidden ${className}`}
    >
      <nav className={"flex flex-col items-stretch gap-16"}>
        <NavigationLink to={"/dashboard"} icon={"flag"}>
          Dashboard
        </NavigationLink>
        <NavigationLink to={"/forms"} icon={"clipboard"}>
          Your Forms
        </NavigationLink>
        <NavigationLink to={"/profile"} icon={"document"}>
          Profile
        </NavigationLink>
        <NavigationLink to={"/settings"} icon={"circle-check"}>
          Settings
        </NavigationLink>
      </nav>
      <div className={"flex flex-col items-stretch gap-8"}>
        <Button style={"secondary"} to={"/login"}>
          Login
        </Button>
        <Button to={"/signup"}>Sign Up</Button>
      </div>
    </aside>
  );
}
