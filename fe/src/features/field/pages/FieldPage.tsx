import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import { useFieldStyles } from "@/features/field/hooks/queries/useFieldStyles.ts";
import {
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/Field.tsx";
import { useUpdateFieldStyle } from "@/features/field/hooks/mutations/useUpdateFieldStyle.ts";

const FieldPage = () => {
  const { component, setComponent, setMutation } = useCurrentComponent();
  const mutation = useUpdateFieldStyle();
  const { isLoading, error: errorFetch } = useFieldStyles({
    onDataLoaded: (component) => {
      setComponent(component);
      setMutation(mutation);
    },
  });

  if (isLoading || !component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );
  if (errorFetch) return <div>Error: {errorFetch.message}</div>;

  const { root, label, control, error, description } = component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldRoot className={root.raw}>
          <FieldLabel className={label.raw}>Name</FieldLabel>
          <FieldControl
            required
            placeholder="Required"
            className={control.raw}
          />
          <FieldError className={error.raw} match="valueMissing">
            Please enter your name
          </FieldError>

          <FieldDescription className={description.raw}>
            Visible on your profile
          </FieldDescription>
        </FieldRoot>
      </Preview>
    </div>
  );
};

export default FieldPage;
