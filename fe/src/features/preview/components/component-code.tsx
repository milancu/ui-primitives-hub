import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";
import CommandCopy from "@/features/preview/components/command-copy.tsx";
import { useStore } from "@tanstack/react-store";
import { componentStore } from "@/store/component.store.ts";

const ComponentCode = ({ code }: { code: string }) => {
  const { copy, copied } = useCopyToClipboard();
  const componentName = useStore(componentStore)

  return (
    <div className={"space-y-2 px-2 pb-2"}>
      <CommandCopy componentName={componentName}/>
      <div className="relative flex h-full flex-col overflow-auto">
        <pre className="bg-muted overflow-x-auto rounded-lg p-2 font-mono text-sm">
          {code}
        </pre>
        <Button
          size="icon"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => copy(code)}
        >
          <div
            className={cn(
              "transition-all",
              copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
            )}
          >
            <Check
              className="stroke-emerald-500"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <div
            className={cn(
              "absolute transition-all",
              copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
            )}
          >
            <Copy size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ComponentCode;
