import { ModeToggle } from "@/components/mode-toggle.tsx";
import User from "@/features/user/components/user.tsx";
import SearchInput from "@/features/search-input/components/search-input.tsx";
import { Link, useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils.ts";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";

const initialActiveTabs = [
  { id: "1", name: "Marketing Web" },
  { id: "2", name: "E-commerce App" },
  { id: "3", name: "Mobile Dashboard" },
];

const Header = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  console.log(pathname);

  return (
    <div className={"bg-background border-border w-full border-b"}>
      <div className={"px-4 flex items-center justify-between"}>
        <div className={"flex items-center h-full"}>
          <Link to={"/"}>
            <ThemeLogo />
          </Link>
          <div className={"flex items-center border-l border-r"}>
            {initialActiveTabs.map((tab) => (
              <Link
                to={`${tab.id}`}
                key={tab.id}
                className={cn(
                  pathname === `/${tab.id}` && "bg-gray-50",
                  "group data-[state=active]:bg-accent/70 relative flex h-7 items-center gap-2 p-4 transition-all duration-200",
                )}
              >
                <span className="max-w-[100px] truncate text-xs">
                  {tab.name}
                </span>
                <X className="text-muted-foreground h-3 w-3 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
        <div className={"flex items-center gap-2"}>
          <SearchInput />
          <ModeToggle />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Header;
