import { Frame, Layers } from "lucide-react";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { ComponentHierarchy } from "@ui-primitives-hub/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { cn } from "@/lib/utils.ts";

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
        className={cn(
          "m-2 cursor-pointer items-center rounded-lg p-2 text-sm",
          isSelected
            ? "border border-blue-500 bg-blue-500/10 text-blue-500"
            : "hover:bg-blue-500/10",
          component.isCustomizable ? "flex" : "hidden",
        )}
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
  const projectId = useProjectStore((state) => state.projectId);
  const componentName = useComponentStore((state) => state.componentName);
  const { data: hierarchy } = useComponentHierarchy(projectId, componentName);

  const [partName, setPartName] = useCurrentPartParam();

  const selectComponent = (component: ComponentHierarchy) => {
    setPartName(component.name);
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
