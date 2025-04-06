import CssPreview from "@/features/color-customizer/components/css-preview.tsx";
import ColorPreview from "@/features/color-customizer/components/color-preview.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { ColorCard } from "@/features/color-customizer/components/color-card.tsx";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { useGetProjectColors } from "@/features/color-customizer/hooks/queries/useGetProjectColors.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useUpdateProjectColors } from "@/features/color-customizer/hooks/mutations/useUpdateProjectColors.ts";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { hex2oklch, oklch2hex } from "colorizr";

const COLOR_KEYS = [
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
] as const;

type ColorKey = (typeof COLOR_KEYS)[number];

const getForegroundColor = (l: number): string =>
  l > 0.6 ? "#000000" : "#FFFFFF";

const ThemeColorGrid = ({
  colorsObj,
  selectedColor,
  onSelectColor,
}: {
  colorsObj: Record<ColorKey, { l: number; c: number; h: number }>;
  selectedColor: ColorKey;
  onSelectColor: (color: ColorKey) => void;
}) => {
  const getColorDetails = (colorKey: ColorKey) => {
    const color = colorsObj[colorKey];
    return {
      displayColor: `oklch(${color.l} ${color.c} ${color.h})`,
      foregroundColor: getForegroundColor(color.l),
    };
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {COLOR_KEYS.map((colorKey) => {
        const { displayColor, foregroundColor } = getColorDetails(colorKey);
        return (
          <div className="flex gap-2" key={colorKey}>
            <ColorCard
              name={colorKey.replace(/([A-Z])/g, " $1").toLowerCase()}
              mainColor={displayColor}
              textColor={foregroundColor}
              onClick={() => onSelectColor(colorKey)}
              active={selectedColor === colorKey}
            />
          </div>
        );
      })}
    </div>
  );
};

type ColorCustomizerPageProps = {
  projectId: string;
};

const ColorCustomizerPage = ({ projectId }: ColorCustomizerPageProps) => {
  const { data } = useGetProjectColors(projectId);
  const { mutateAsync, isPending } = useUpdateProjectColors();
  const [lightColors, setLightColors] =
    useState<Record<ColorKey, { l: number; c: number; h: number }>>();
  const [darkColors, setDarkColors] =
    useState<Record<ColorKey, { l: number; c: number; h: number }>>();
  const [selectedColor, setSelectedColor] = useState<ColorKey>("primary");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (data) {
      setLightColors((prev) => deepCompareUpdate(prev, data.light));
      setDarkColors((prev) => deepCompareUpdate(prev, data.dark));
    }
  }, [data]);

  const deepCompareUpdate = <T,>(prev: T, newData: T): T =>
    JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;

  const handleOklchChange = (oklch: { l: number; c: number; h: number }) => {
    const updater = selectedTheme === "light" ? setLightColors : setDarkColors;
    updater((prev) => (prev ? { ...prev, [selectedColor]: oklch } : prev));
  };

  const handleSave = () => {
    if (!lightColors || !darkColors) return;

    const currentColors = selectedTheme === "light" ? lightColors : darkColors;
    mutateAsync({
      id: projectId,
      theme: selectedTheme,
      color: selectedColor,
      value: currentColors[selectedColor],
    })
      .then(() => {
        toast.success("Saved successfully");
      })
      .catch((error) => {
        toast.error(error.error);
      });
  };

  if (!lightColors || !darkColors) {
    return (
      <div className="grid h-full w-full grid-cols-1 items-start gap-4 p-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-1 items-start gap-4 p-4 lg:grid-cols-2 container mx-auto">
      <div className="flex h-full flex-col gap-4">
        <HexColorPicker
          style={{
            width: "100%",
          }}
          color={oklch2hex(
            (selectedTheme === "light" ? lightColors : darkColors)[
              selectedColor
            ],
          )}
          onChange={(value) => {
            handleOklchChange(hex2oklch(value));
          }}
        />
        <Button onClick={handleSave} disabled={isPending}>
          Save
        </Button>

        <Tabs
          value={selectedTheme}
          onValueChange={(v) => setSelectedTheme(v as "light" | "dark")}
        >
          <Card>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light">Light Theme</TabsTrigger>
                <TabsTrigger value="dark">Dark Theme</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="space-y-4">
              <TabsContent value="light">
                <ThemeColorGrid
                  colorsObj={lightColors}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />
              </TabsContent>
              <TabsContent value="dark">
                <ThemeColorGrid
                  colorsObj={darkColors}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      <TabsContent
        value="preview"
        className="h-full overflow-hidden rounded-md border"
      >
        <ColorPreview lightColors={lightColors} darkColors={darkColors} />
      </TabsContent>
      <TabsContent
        value="code"
        className="h-full overflow-hidden rounded-md border"
      >
        <CssPreview lightSchema={lightColors} darkSchema={darkColors} />
      </TabsContent>
    </div>
  );
};

export default ColorCustomizerPage;
