import CodePreview from "@/features/color-customizer/components/code-preview.tsx";
import ColorPreview from "@/features/color-customizer/components/color-preview.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { ColorCard } from "@/features/color-customizer/components/color-card.tsx";
import { useState } from "react";

const colors = [
  "background",
  "foreground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "success",
  "warning",
  "border",
];

const defaultLightColors = {
  background: { value: "0.97 0.02 240" },
  foreground: { value: "0.2 0.05 250" },
  primary: { value: "0.6 0.2 260" },
  primaryForeground: { value: "1 0 0" },
  secondary: { value: "0.75 0.18 290" },
  secondaryForeground: { value: "1 0 0" },
  muted: { value: "0.85 0.03 210" },
  mutedForeground: { value: "0.4 0.04 220" },
  accent: { value: "0.7 0.22 350" },
  accentForeground: { value: "1 0 0" },
  destructive: { value: "0.55 0.25 20" },
  destructiveForeground: { value: "1 0 0" },
  success: { value: "0.6 0.22 150" },
  warning: { value: "0.75 0.3 80" },
  border: { value: "0.9 0.02 240" },
};

const defaultDarkColors = {
  background: { value: "0.12 0.02 240" },
  foreground: { value: "0.95 0.02 250" },
  primary: { value: "0.7 0.25 260" },
  primaryForeground: { value: "0 0 0" },
  secondary: { value: "0.6 0.22 290" },
  secondaryForeground: { value: "0 0 0" },
  muted: { value: "0.25 0.05 210" },
  mutedForeground: { value: "0.7 0.04 220" },
  accent: { value: "0.75 0.3 350" },
  accentForeground: { value: "0 0 0" },
  destructive: { value: "0.65 0.3 20" },
  destructiveForeground: { value: "0 0 0" },
  success: { value: "0.7 0.3 150" },
  warning: { value: "0.85 0.35 80" },
  border: { value: "0.3 0.02 240" },
};

const ColorCustomizerPage = () => {
  const [selectedColor, setSelectedColor] = useState("primary");

  const getForegroundColor = (oklch: string): string => {
    const [l] = oklch.split(" ").map(parseFloat);
    return l > 0.6 ? "#000000" : "#FFFFFF";
  };

  return (
    <div
      className={
        "grid h-full w-full grid-cols-1 items-start gap-4 p-4 lg:grid-cols-4"
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {colors.map((colorKey, index) => {
          const lightColor = defaultLightColors[colorKey];
          const lightDisplayColor = `oklch(${lightColor.value})`;
          const lightForegroundColor = getForegroundColor(lightColor.value);

          return (
            <div className="flex gap-2" key={index}>
              <ColorCard
                key={colorKey}
                name={colorKey.replace(/([A-Z])/g, " $1").toLowerCase()}
                mainColor={lightDisplayColor}
                textColor={lightForegroundColor}
                onClick={() => setSelectedColor(colorKey)}
                active={selectedColor === colorKey}
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((colorKey, index) => {
          const darkColor = defaultDarkColors[colorKey];
          const darkDisplayColor = `oklch(${darkColor.value})`;
          const darkForegroundColor = getForegroundColor(darkColor.value);

          return (
            <div className="flex gap-2" key={index}>
              <ColorCard
                key={colorKey}
                name={colorKey.replace(/([A-Z])/g, " $1").toLowerCase()}
                mainColor={darkDisplayColor}
                textColor={darkForegroundColor}
                onClick={() => setSelectedColor(colorKey)}
                active={selectedColor === colorKey}
              />
            </div>
          );
        })}
      </div>
      <Tabs className={"h-full col-span-2"} defaultValue={"theme"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theme">Theme Preview</TabsTrigger>
          <TabsTrigger value="code">Code Preview</TabsTrigger>
        </TabsList>
        <TabsContent
          value="theme"
          className={"overflow-hidden rounded-md border"}
        >
          <ColorPreview />
        </TabsContent>
        <TabsContent
          value="code"
          className={"overflow-hidden rounded-md border"}
        >
          <CodePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorCustomizerPage;
