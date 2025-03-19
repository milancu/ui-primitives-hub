import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { useId } from "react";

function InputComponentSwitcher() {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Input with end select</Label>
      <div className="flex rounded-lg shadow-sm shadow-black/5">
        <div className="relative inline-flex">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <span>P</span>
          </div>
        </div>
        <Input
          id={id}
          className="peer -me-px rounded-e-none ps-9 shadow-none focus-visible:z-10"
          placeholder="padding"
          type="number"
          min={0}
        />
        <div className="relative inline-flex">
          <select
            className="peer border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/20 inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border ps-3 pe-8 text-sm transition-shadow focus:z-10 focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Domain suffix"
          >
            <option>rem</option>
            <option>px</option>
          </select>
          <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
            <ChevronDown
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="img"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default InputComponentSwitcher;
