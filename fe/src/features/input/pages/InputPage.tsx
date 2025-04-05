import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { getClassName } from "@/lib/utils.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";
import { Input } from "@ui-primitives-hub/ui/src/components/Input.tsx";

const InputPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className="flex h-full w-full flex-col items-center gap-2 p-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    );

  const tailwind = Object.keys(parts).reduce(
    (acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(parts[key]);
      return acc;
    },
    {},
  );

  const { input } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <Input
          placeholder="Name"
          className={getClassName(input, "input" === currentPart)}
        />
      </Preview>
    </div>
  );
};

export default InputPage;
