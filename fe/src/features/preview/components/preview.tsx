import React, { PropsWithChildren, useCallback } from "react";
import { cn } from "@/lib/utils.ts";
import { useGetProjectColors } from "@/features/color-customizer/hooks/queries/useGetProjectColors.ts";
import { useStore } from "@tanstack/react-store";
import { projectStore } from "@/store/project.store.ts";
import { ColorScheme } from "../../../../../packages/types";
import { GridPattern } from "@/components/magicui/grid-pattern.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";
import { useCode } from "@/features/preview/hooks/queries/useCode.ts";
import { componentStore } from "@/store/component.store.ts";
import ComponentCode from "@/features/preview/components/component-code.tsx";

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
  const createThemeStyle = useCallback(
    (theme: ThemeType) => {
      const themeColors = colors?.[theme];
      if (!themeColors) return {};

      return Object.fromEntries(
        Object.entries(themeColors).map(([key, value]) => [
          `--${key}`,
          `oklch(${value.l} ${value.c} ${value.h})`,
        ]),
      ) as React.CSSProperties;
    },
    [colors],
  );

  return (
    <div
      className={`${theme} bg-background text-foreground relative w-full flex-1`}
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
          style={createThemeStyle(theme)}
          className="relative flex h-full items-center justify-center p-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export function Preview({ children }: PropsWithChildren) {
  const id = useStore(projectStore);
  const componentName = useStore(componentStore);
  const { data: colors, isLoading, isError } = useGetProjectColors(id);
  const { data: code } = useCode(id, componentName);

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
        <div className="flex h-full flex-col">
          <ThemePreviewBlock theme="light" colors={colors}>
            {children}
          </ThemePreviewBlock>
          <ThemePreviewBlock theme="dark" colors={colors}>
            {children}
          </ThemePreviewBlock>
        </div>
      </TabsContent>
      <TabsContent value="code" className={'p-2'}>
        {code && <ComponentCode code={code} />}
      </TabsContent>
    </>
  );
}

export default Preview;
