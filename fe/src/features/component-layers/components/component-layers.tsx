import { Frame, Layers } from "lucide-react";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { ComponentHierarchy } from "@ui-primitives-hub/types";

const ComponentTreeItem = ({
  component,
  currentComponent,
  depth = 0,
  selectComponent,
}: {
  component: ComponentHierarchy;
  currentComponent: string;
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

export default function FigmaLayers() {
  const [componentName, setComponentName] = useCurrentPartParam();
  const { component } = useCurrentComponent();

  const selectComponent = (component: ComponentHierarchy) => {
    setComponentName(component.name);
  };

  if (!component) return null;

  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border shadow-lg">
      <div className="border-border flex items-center justify-between border-b p-3">
        <div className="flex items-center">
          <Layers className="mr-2 h-5 w-5 text-gray-500" />
          <h2 className="text-sm font-medium">Component layers</h2>
        </div>
      </div>

      <div className="overflow-y-auto">
        <ComponentTreeItem
          component={component?.hierarchy}
          selectComponent={selectComponent}
          currentComponent={componentName}
        />
      </div>
    </div>
  );
}
