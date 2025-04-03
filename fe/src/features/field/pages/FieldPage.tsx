import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import {
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/components/Field.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";

const FieldPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root, label, control, error, description } = parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldRoot className={getClassName(root, "root" === currentPart)}>
          <FieldLabel className={getClassName(label, "label" === currentPart)}>
            Name
          </FieldLabel>
          <FieldControl
            required
            placeholder="Required"
            className={getClassName(control, "control" === currentPart)}
          />
          <FieldError
            className={getClassName(error, "error" === currentPart)}
            match="valueMissing"
          >
            Please enter your name
          </FieldError>

          <FieldDescription
            className={getClassName(description, "description" === currentPart)}
          >
            Visible on your profile
          </FieldDescription>
        </FieldRoot>
      </Preview>
    </div>
  );
};

export default FieldPage;
