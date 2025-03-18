import { Input } from "@/components/ui/input";
import { useMenuContext } from "@/features/command-menu/components/CommandMenuContext.tsx";

const SearchInput = () => {
  const { setOpen } = useMenuContext();

  return (
    <div className="min-w-[300px] space-y-2">
      <div className="relative">
        <Input
          placeholder="Search..."
          type="search"
          onClick={() => {
            setOpen(true);
          }}
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
          <kbd className="border-border text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
