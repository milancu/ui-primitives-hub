import { PropsWithChildren, useEffect, useMemo } from "react";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

const colors = {
  light: {
    test: "oklch(0.577 0.245 27.325)",
  },
  dark: {
    test: "oklch(0.452 0.313 264.052)",
  },
};

export function Preview({ children }: PropsWithChildren) {
  const dotPattern = useMemo(() => {
    return (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const darkStyle = document.createElement("style");

    Object.entries(colors.light).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    const darkVars = Object.entries(colors.dark)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n");

    darkStyle.innerHTML = `.dark {\n${darkVars}\n}`;
    document.head.appendChild(darkStyle);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="light bg-background text-foreground relative w-full flex-1">
        {dotPattern}
        <div data-theme="light" className="relative flex h-full flex-col">
          <div
            className={
              "bg-background relative w-full rounded-t-lg border-b p-2 text-center font-semibold"
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
        {dotPattern}
        <div data-theme="dark" className="relative flex h-full flex-col">
          <div
            className={
              "bg-background relative w-full rounded-t-lg border-b p-2 text-center font-semibold"
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
