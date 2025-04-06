import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils.ts";
import { ColorScheme } from "../../../../../packages/types";
import { GridPattern } from "@/components/magicui/grid-pattern.tsx";

const ThemeDemoComponents = () => (
  <CardContent className="space-y-2">
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
    </Tabs>

    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="switch1" className={"data-[state=unchecked]:bg-muted"} />
        <label htmlFor="switch1" className="text-sm">
          Switch
        </label>
      </div>
      <Input placeholder="Input field" className={"border-border"} />
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
        className: "bg-destructive text-[var(--destructive-foreground)]",
        label: "Destructive",
      },
      { className: "bg-[var(--success)] text-foreground", label: "Success" },
    ].map(({ className, label }) => (
      <div key={label} className={`${className} rounded-md p-1 text-center`}>
        {label}
      </div>
    ))}
  </div>
);

const ThemePreviewBlock = ({
  theme,
  style,
}: {
  theme: "light" | "dark";
  style?: React.CSSProperties;
}) => (
  <div
    style={style}
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
      <div className="relative flex h-full items-center justify-center p-4">
        <Card className={"bg-background text-foreground border-border"}>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              This shows how your theme will look
            </CardDescription>
          </CardHeader>
          <div>
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
  const createStyleObject = (colors: ColorScheme) => {
    return Object.fromEntries(
      Object.entries(colors).map(([key, value]) => {
        const cssVarName = `--${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
        return [cssVarName, `oklch(${value.l} ${value.c} ${value.h})`];
      }),
    ) as React.CSSProperties;
  };

  return (
    <div className="flex h-full flex-col">
      <ThemePreviewBlock theme="light" style={createStyleObject(lightColors)} />
      <ThemePreviewBlock theme="dark" style={createStyleObject(darkColors)} />
    </div>
  );
};

export default ColorPreview;
