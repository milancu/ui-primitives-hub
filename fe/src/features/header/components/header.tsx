import { ModeToggle } from "@/components/mode-toggle.tsx";
import User from "@/features/user/components/user.tsx";
import SearchInput from "@/features/search-input/components/search-input.tsx";
import { Link } from "@tanstack/react-router";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import ProjectTabs from "@/features/header/components/project-tabs.tsx";

const Header = () => {
  return (
    <div className={"bg-background border-border h-[3.5rem] w-full border-b"}>
      <div className={"flex h-full items-center justify-between px-2"}>
        <div className={"flex h-full items-center"}>
          <Link
            to={"/"}
            className={"flex w-[16rem] items-center justify-center"}
          >
            <ThemeLogo />
          </Link>
          <ProjectTabs/>
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
