import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React, { useCallback, useMemo } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern.tsx";
import { cn } from "@/lib/utils.ts";
import { ColorScheme } from "../../../../../packages/types";

const ThemeDemoComponents = () => (
  <CardContent className="space-y-4">
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>

    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-2 rounded-md border p-4">
        <p className="text-muted-foreground text-sm">Tab content 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-2 rounded-md border p-4">
        <p className="text-muted-foreground text-sm">Tab content 2</p>
      </TabsContent>
    </Tabs>

    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="switch1" />
        <label htmlFor="switch1" className="text-sm">
          Switch
        </label>
      </div>
      <Input placeholder="Input field" className="max-w-xs" />
    </div>

    <ColorGrid />
  </CardContent>
);

const ColorGrid = () => (
  <div className="grid grid-cols-2 gap-2">
    {[
      { className: "bg-primary text-primary-foreground", label: "Primary" },
      {
        className: "bg-secondary text-secondary-foreground",
        label: "Secondary",
      },
      { className: "bg-accent text-accent-foreground", label: "Accent" },
      { className: "bg-muted text-muted-foreground", label: "Muted" },
      {
        className: "bg-destructive text-destructive-foreground",
        label: "Destructive",
      },
      { className: "border-border border", label: "Border" },
    ].map(({ className, label }) => (
      <div key={label} className={`${className} rounded-md p-2 text-center`}>
        {label}
      </div>
    ))}
  </div>
);

const ThemePreviewBlock = ({
  theme,
  dotPattern,
  style,
}: {
  theme: "light" | "dark";
  dotPattern: React.ReactElement;
  style?: React.CSSProperties;
}) => (
  <div
    className={`${theme} bg-background text-foreground relative w-full flex-1`}
  >
    {dotPattern}
    <div data-theme={theme} className="relative flex h-full flex-col">
      <div className="relative flex h-full items-center justify-center p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              This shows how your theme will look
            </CardDescription>
          </CardHeader>
          <div style={style}>
            <ThemeDemoComponents />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const ColorPreview = ({
  lightColors,
  darkColors,
}: {
  lightColors: ColorScheme;
  darkColors: ColorScheme;
}) => {
  const dotPattern = useMemo(
    () => (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
    ),
    [],
  );

  const createStyleObject = useCallback((colors: ColorScheme) => {
    return Object.fromEntries(
      Object.entries(colors).map(([key, value]) => {
        const cssVarName = `--${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
        return [cssVarName, `oklch(${value.l} ${value.c} ${value.h})`];
      }),
    ) as React.CSSProperties;
  }, []);

  return (
    <div className="flex h-full flex-col">
      <ThemePreviewBlock
        theme="light"
        dotPattern={dotPattern}
        style={createStyleObject(lightColors)}
      />
      <ThemePreviewBlock
        theme="dark"
        dotPattern={dotPattern}
        style={createStyleObject(darkColors)}
      />
    </div>
  );
};

export default ColorPreview;
