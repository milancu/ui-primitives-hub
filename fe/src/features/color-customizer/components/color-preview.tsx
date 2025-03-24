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
import { useMemo } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern.tsx";
import { cn } from "@/lib/utils.ts";

const ColorPreview = () => {
  const dotPattern = useMemo(() => {
    return (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
    );
  }, []);

  return (
    <div className={'h-full flex flex-col'}>
      <div className="light bg-background text-foreground relative w-full flex-1">
        {dotPattern}
        <div data-theme="light" className="relative flex h-full flex-col">
          <div
            className={"relative flex h-full items-center justify-center p-4"}
          >
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Theme Preview</CardTitle>
                <CardDescription>
                  This shows how your theme will look
                </CardDescription>
              </CardHeader>
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
                  <TabsContent
                    value="tab1"
                    className="mt-2 rounded-md border p-4"
                  >
                    <p className="text-muted-foreground text-sm">
                      Tab content 1
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="tab2"
                    className="mt-2 rounded-md border p-4"
                  >
                    <p className="text-muted-foreground text-sm">
                      Tab content 2
                    </p>
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

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary text-primary-foreground rounded-md p-2 text-center">
                    Primary
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-md p-2 text-center">
                    Secondary
                  </div>
                  <div className="bg-accent text-accent-foreground rounded-md p-2 text-center">
                    Accent
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-md p-2 text-center">
                    Muted
                  </div>
                  <div className="bg-destructive text-destructive-foreground rounded-md p-2 text-center">
                    Destructive
                  </div>
                  <div className="border-border rounded-md border p-2 text-center">
                    Border
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="dark bg-background text-foreground relative w-full flex-1">
        {dotPattern}
        <div data-theme="dark" className="relative flex h-full flex-col">
          <div
            className={"relative flex h-full items-center justify-center p-4"}
          >
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Theme Preview</CardTitle>
                <CardDescription>
                  This shows how your theme will look
                </CardDescription>
              </CardHeader>
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
                  <TabsContent
                    value="tab1"
                    className="mt-2 rounded-md border p-4"
                  >
                    <p className="text-muted-foreground text-sm">
                      Tab content 1
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="tab2"
                    className="mt-2 rounded-md border p-4"
                  >
                    <p className="text-muted-foreground text-sm">
                      Tab content 2
                    </p>
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

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary text-primary-foreground rounded-md p-2 text-center">
                    Primary
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-md p-2 text-center">
                    Secondary
                  </div>
                  <div className="bg-accent text-accent-foreground rounded-md p-2 text-center">
                    Accent
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-md p-2 text-center">
                    Muted
                  </div>
                  <div className="bg-destructive text-destructive-foreground rounded-md p-2 text-center">
                    Destructive
                  </div>
                  <div className="border-border rounded-md border p-2 text-center">
                    Border
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
