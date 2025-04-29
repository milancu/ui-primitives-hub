import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";
import { useGetProjectColors } from "@/features/color-customizer/hooks/queries/useGetProjectColors.ts";
import { ColorScheme } from "../../../../../packages/types";
import { GridPattern } from "@/components/magicui/grid-pattern.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";
import { useCode } from "@/features/preview/hooks/queries/useCode.ts";
import ComponentCode from "@/features/preview/components/component-code.tsx";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

type ThemeType = "light" | "dark";

const ThemePreviewBlock = ({
  theme,
  colors,
  children,
}: PropsWithChildren<{
  theme: ThemeType;
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
}>) => {
  const createStyleObject = () => {
    return Object.fromEntries(
      Object.entries(colors[theme]).map(([key, value]) => {
        const cssVarName = `--${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
        return [cssVarName, `oklch(${value.l} ${value.c} ${value.h})`];
      }),
    ) as React.CSSProperties;
  };


  return (
    <div
      style={
        createStyleObject()
      }
      data-theme={theme}
      className={`bg-background text-foreground relative w-full flex-1`}
    >
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <div data-theme={theme} className="relative flex h-full flex-col">
        <div className="bg-background relative w-full rounded-t-lg border-b p-2 text-center font-semibold">
          {theme.charAt(0).toUpperCase() + theme.slice(1)} preview
        </div>
        <div
          style={createStyleObject()}
          className="relative flex h-full items-center justify-center p-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export function Preview({ children }: PropsWithChildren) {
  const projectId = useProjectStore((state) => state.projectId);
  const componentName = useComponentStore((state) => state.componentName);
  const { data: colors, isLoading, isError } = useGetProjectColors(projectId);
  const { data: code } = useCode(projectId, componentName);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        Loading themes...
      </div>
    );
  if (isError)
    return (
      <div className="text-destructive flex h-full items-center justify-center">
        Error loading colors
      </div>
    );

  if (!colors) return null;

  return (
    <>
      <TabsContent value="preview" className={"relative z-0 h-full"}>
        <div className="Root flex h-full flex-col">
          <ThemePreviewBlock theme="light" colors={colors}>
            {children}
          </ThemePreviewBlock>
          <ThemePreviewBlock theme="dark" colors={colors}>
            {children}
          </ThemePreviewBlock>
        </div>
      </TabsContent>
      <TabsContent value="code" className={"p-2"}>
        {code && <ComponentCode code={code} />}
      </TabsContent>
    </>
  );
}

export default Preview;
