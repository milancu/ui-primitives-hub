import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const defaultLightColors = {
  background: { h: 0, s: 0, l: 100, value: "0 0% 100%" },
  foreground: { h: 240, s: 10, l: 3.9, value: "240 10% 3.9%" },
  primary: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  primaryForeground: { h: 0, s: 0, l: 98, value: "0 0% 98%" },
  secondary: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  secondaryForeground: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  muted: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  mutedForeground: { h: 240, s: 3.8, l: 46.1, value: "240 3.8% 46.1%" },
  accent: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  accentForeground: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  destructive: { h: 0, s: 84.2, l: 60.2, value: "0 84.2% 60.2%" },
  destructiveForeground: { h: 0, s: 0, l: 98, value: "0 0% 98%" },
  success: { h: 142, s: 76, l: 36, value: "142 76% 36%" },
  warning: { h: 38, s: 92, l: 50, value: "38 92% 50%" },
  border: { h: 240, s: 5.9, l: 90, value: "240 5.9% 90%" }
};


const defaultDarkColors = {
  background: { h: 0, s: 0, l: 100, value: "0 0% 100%" },
  foreground: { h: 240, s: 10, l: 3.9, value: "240 10% 3.9%" },
  primary: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  primaryForeground: { h: 0, s: 0, l: 98, value: "0 0% 98%" },
  secondary: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  secondaryForeground: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  muted: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  mutedForeground: { h: 240, s: 3.8, l: 46.1, value: "240 3.8% 46.1%" },
  accent: { h: 240, s: 4.8, l: 95.9, value: "240 4.8% 95.9%" },
  accentForeground: { h: 240, s: 5.9, l: 10, value: "240 5.9% 10%" },
  destructive: { h: 0, s: 84.2, l: 60.2, value: "0 84.2% 60.2%" },
  destructiveForeground: { h: 0, s: 0, l: 98, value: "0 0% 98%" },
  success: { h: 142, s: 76, l: 36, value: "142 76% 36%" },
  warning: { h: 38, s: 92, l: 50, value: "38 92% 50%" },
  border: { h: 240, s: 5.9, l: 90, value: "240 5.9% 90%" }
};

const CodePreview = () => {
  return (
    <Card className={'h-full'}>
      <CardHeader>
        <CardTitle>CSS Implementation</CardTitle>
        <CardDescription>
          Copy these variables to use in your CSS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-sm">
            {`:root {
  --background: ${defaultLightColors.background.value};
  --foreground: ${defaultLightColors.foreground.value};
  
  --primary: ${defaultLightColors.primary.value};
  --primary-foreground: ${defaultLightColors.primaryForeground.value};
  
  --secondary: ${defaultLightColors.secondary.value};
  --secondary-foreground: ${defaultLightColors.secondaryForeground.value};
  
  --muted: ${defaultLightColors.muted.value};
  --muted-foreground: ${defaultLightColors.mutedForeground.value};
  
  --accent: ${defaultLightColors.accent.value};
  --accent-foreground: ${defaultLightColors.accentForeground.value};
  
  --destructive: ${defaultLightColors.destructive.value};
  --destructive-foreground: ${defaultLightColors.destructiveForeground.value};

  --success: ${defaultLightColors.success.value};
  --warning: ${defaultLightColors.warning.value};
  
  --border: ${defaultLightColors.border.value};
}

.dark {
  --background: ${defaultDarkColors.background.value};
  --foreground: ${defaultDarkColors.foreground.value};
  
  --primary: ${defaultDarkColors.primary.value};
  --primary-foreground: ${defaultDarkColors.primaryForeground.value};
  
  --secondary: ${defaultDarkColors.secondary.value};
  --secondary-foreground: ${defaultDarkColors.secondaryForeground.value};
  
  --muted: ${defaultDarkColors.muted.value};
  --muted-foreground: ${defaultDarkColors.mutedForeground.value};
  
  --accent: ${defaultDarkColors.accent.value};
  --accent-foreground: ${defaultDarkColors.accentForeground.value};
  
  --destructive: ${defaultDarkColors.destructive.value};
  --destructive-foreground: ${defaultDarkColors.destructiveForeground.value};

  --success: ${defaultDarkColors.success.value};
  --warning: ${defaultDarkColors.warning.value};
  
  --border: ${defaultDarkColors.border.value};
}
`}
          </pre>
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              const cssText = document.querySelector("pre")?.textContent;
              if (cssText) {
                navigator.clipboard
                  .writeText(cssText)
                  .then(() => toast.success("CSS copied to clipboard"))
                  .catch(() => toast.error("Failed to copy CSS"));
              }
            }}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodePreview;
