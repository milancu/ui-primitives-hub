import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";

const NavEditorHeader = () => {
  const { component } = useCurrentComponent();
  const [componentName] = useCurrentPartParam();
  const [state, setState] = useCurrentComponentStateParam();

  if (!componentName) return null;

  const attributes = component?.parts[componentName]?.attributes;

  if (!component || !attributes) {
    return (
      <div className={"grid grid-cols-3 gap-2"}>
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
      </div>
    );
  }

  return (
    <RadioGroup
      className="flex w-full flex-row items-center gap-2 overflow-auto"
      value={state}
      onValueChange={(activeState) => setState(activeState)}
    >
      {Object.entries(attributes).map(([key]) => (
        <label
          key={key}
          className="border-input has-[:focus-visible]:outline-ring/70 relative flex flex-shrink-0 cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-2 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500/20 has-[[data-state=checked]]:bg-blue-500/20 has-[[data-state=checked]]:text-blue-500"
        >
          <RadioGroupItem
            id={key}
            value={key}
            className="sr-only after:absolute after:inset-0"
          />
          <p className="text-sm font-medium">{key}</p>
        </label>
      ))}
    </RadioGroup>
  );
};

export default NavEditorHeader;
