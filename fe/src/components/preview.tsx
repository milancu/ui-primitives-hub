import { PropsWithChildren } from "react";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <div className="light bg-background text-foreground relative w-full flex-1">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
        />
        <div data-theme="light" className="relative flex h-full flex-col">
          <div
            className={
              "bg-background relative w-full rounded-t-lg p-2 text-center font-semibold  border-b"
            }
          >
            Light preview
          </div>
          <div
            className={"relative flex h-full items-center justify-center p-4"}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="dark bg-background text-foreground relative w-full flex-1">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
        />
        <div data-theme="dark" className="relative flex h-full flex-col">
          <div
            className={
              "bg-background relative w-full rounded-t-lg p-2 text-center font-semibold  border-b"
            }
          >
            Dark preview
          </div>
          <div
            className={"relative flex h-full items-center justify-center p-4"}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
