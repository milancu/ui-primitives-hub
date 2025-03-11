import { PropsWithChildren } from "react";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full grid-cols-1 border-l col-span-2">
      <div className="relative light bg-background text-foreground flex-1 w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
        />
        <div data-theme="light" className="relative flex flex-col h-full">
          <div className={'w-full p-2 border-b text-center font-semibold relative bg-background'}>
            Light preview
          </div>
          <div className={'relative p-4 flex items-center justify-center h-full'}>
            {children}
          </div>
        </div>
      </div>
      <div className="relative dark bg-background text-foreground flex-1 w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <div data-theme="dark" className="relative flex flex-col h-full">
          <div className={'w-full p-2 border-b text-center font-semibold relative bg-background'}>
            Dark preview
          </div>
          <div className={'relative p-4 flex items-center justify-center h-full'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
