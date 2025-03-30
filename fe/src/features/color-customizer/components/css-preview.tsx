import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";
import { useRef } from "react";

interface Schema {
  c: number;
  h: number;
  l: number;
}

interface CssPreviewProps {
  lightSchema: Record<string, Schema>;
  darkSchema: Record<string, Schema>;
}

const formatOklch = ({ l, c, h }: Schema) => `oklch(${l} ${c} ${h})`;

const CssPreview = ({ lightSchema, darkSchema }: CssPreviewProps) => {
  const { copy, copied } = useCopyToClipboard();
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <Card className={"h-full"}>
      <CardHeader>
        <CardTitle>CSS Implementation</CardTitle>
        <CardDescription>
          Copy these variables to use in your CSS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre
            ref={preRef}
            className="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-sm"
          >
            {`:root {
  --background: ${formatOklch(lightSchema.background)};
  --foreground: ${formatOklch(lightSchema.foreground)};
  
  --primary: ${formatOklch(lightSchema.primary)};
  --primary-foreground: ${formatOklch(lightSchema.primaryForeground)};
  
  --secondary: ${formatOklch(lightSchema.secondary)};
  --secondary-foreground: ${formatOklch(lightSchema.secondaryForeground)};
  
  --muted: ${formatOklch(lightSchema.muted)};
  --muted-foreground: ${formatOklch(lightSchema.mutedForeground)};
  
  --accent: ${formatOklch(lightSchema.accent)};
  --accent-foreground: ${formatOklch(lightSchema.accentForeground)};
  
  --destructive: ${formatOklch(lightSchema.destructive)};
  --destructive-foreground: ${formatOklch(lightSchema.destructiveForeground)};

  --success: ${formatOklch(lightSchema.success)};
  --warning: ${formatOklch(lightSchema.warning)};
  
  --border: ${formatOklch(lightSchema.border)};
}

.dark {
  --background: ${formatOklch(darkSchema.background)};
  --foreground: ${formatOklch(darkSchema.foreground)};
  
  --primary: ${formatOklch(darkSchema.primary)};
  --primary-foreground: ${formatOklch(darkSchema.primaryForeground)};
  
  --secondary: ${formatOklch(darkSchema.secondary)};
  --secondary-foreground: ${formatOklch(darkSchema.secondaryForeground)};
  
  --muted: ${formatOklch(darkSchema.muted)};
  --muted-foreground: ${formatOklch(darkSchema.mutedForeground)};
  
  --accent: ${formatOklch(darkSchema.accent)};
  --accent-foreground: ${formatOklch(darkSchema.accentForeground)};
  
  --destructive: ${formatOklch(darkSchema.destructive)};
  --destructive-foreground: ${formatOklch(darkSchema.destructiveForeground)};

  --success: ${formatOklch(darkSchema.success)};
  --warning: ${formatOklch(darkSchema.warning)};
  
  --border: ${formatOklch(darkSchema.border)};
}`}
          </pre>
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => {
              if (preRef.current) {
                copy(preRef.current.textContent || "");
              }
            }}
          >
            <div
              className={cn(
                "transition-all",
                copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            >
              <Check
                className="stroke-emerald-500"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
            <div
              className={cn(
                "absolute transition-all",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
              )}
            >
              <Copy size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CssPreview;