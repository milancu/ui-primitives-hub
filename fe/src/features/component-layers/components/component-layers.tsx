import { Frame, Layers } from "lucide-react";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { ComponentHierarchy } from "@ui-primitives-hub/types";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useHierarchy } from "@/components/hierarchy-provider";

const ComponentTreeItem = ({
  component,
  currentComponent,
  depth = 0,
  selectComponent,
}: {
  component: ComponentHierarchy;
  currentComponent?: string | null | undefined;
  depth?: number;
  selectComponent: (component: ComponentHierarchy) => void;
}) => {
  const isSelected = component.name === currentComponent;
  const hasChildren = component.children && component.children.length > 0;

  return (
    <div>
      <div
        className={`m-2 flex items-center rounded-lg p-2 text-sm ${isSelected ? "border border-blue-500 bg-blue-500/10 text-blue-500" : "hover:bg-blue-500/10"} cursor-pointer`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          selectComponent(component);
        }}
      >
        <span className="mr-1.5">
          <Frame className="h-4 w-4" />
        </span>

        <span className={`flex-1 truncate`}>{component.name}</span>
      </div>

      {hasChildren && (
        <div>
          {component.children!.map((child, index) => (
            <ComponentTreeItem
              currentComponent={currentComponent}
              selectComponent={selectComponent}
              key={index}
              component={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ComponentLayers() {
  const { hierarchy } = useHierarchy();
  const [partName, setPartName] = useCurrentPartParam();
  const [, setCurrentState] = useCurrentComponentStateParam();

  const selectComponent = (component: ComponentHierarchy) => {
    setPartName(component.name);
    setCurrentState("default");
  };

  if (hierarchy === undefined) return null;

  return (
    <Card className="shadow-none">
      <CardHeader className="border-border border-b p-4">
        <CardTitle className="flex items-center gap-2.5 text-sm">
          <Layers className="h-5 w-5 text-gray-500" />
          <div className="text-sm font-medium">Component layers</div>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2.5 p-0">
        <ComponentTreeItem
          component={hierarchy}
          selectComponent={selectComponent}
          currentComponent={partName}
        />
      </CardContent>
    </Card>
  );
}
