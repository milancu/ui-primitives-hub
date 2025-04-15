import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Check, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";

const commands = {
  pnpm: `pnpm dlx @milancu/ui-primitives-hub add -c`,
  npm: `npx @milancu/ui-primitives-hub add -c`,
  yarn: `npx @milancu/ui-primitives-hub add -c`,
};

type CommandCopyProps = {
  componentName?: string;
};

const CommandCopy = ({ componentName }: CommandCopyProps) => {
  const { copy, copied } = useCopyToClipboard();
  const [packageManager, setPackageManager] = useState("pnpm");

  return (
    <Tabs
      className={"bg-muted flex flex-col gap-0 rounded-lg"}
      defaultValue={packageManager}
      onValueChange={setPackageManager}
    >
      <TabsList className={"relative flex h-full w-full items-center p-2"}>
        <TabsTrigger value={"pnpm"} className={"w-14 flex-grow-0 p-2"}>
          pnpm
        </TabsTrigger>
        <TabsTrigger value={"npm"} className={"w-14 flex-grow-0 p-2"}>
          npm
        </TabsTrigger>
        <TabsTrigger value={"yarn"} className={"w-14 flex-grow-0 p-2"}>
          yarn
        </TabsTrigger>
        <Button
          size="icon"
          className="ml-auto cursor-pointer"
          onClick={() => copy(`${commands[packageManager]} ${componentName}`)}
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
      </TabsList>
      <Separator />
      <div className={"p-4"}>
        {Object.keys(commands).map((key) => {
          return (
            <TabsContent value={key} key={key} className={"font-mono text-sm"}>
              {commands[key]} {componentName}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

export default CommandCopy;
