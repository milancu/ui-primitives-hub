import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import {
  FieldControl,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/Field.tsx";
import {
  FieldsetLegend,
  FieldsetRoot,
} from "@ui-primitives-hub/ui/src/Fieldset.tsx";
import { useFieldsetStyles } from "@/features/fieldset/hooks/queries/useFieldsetStyles.ts";
import { useFieldStyles } from "@/features/field/hooks/queries/useFieldStyles.ts";
import { useUpdateFieldsetStyle } from "@/features/fieldset/hooks/mutations/useUpdateFieldsetStyle.ts";

const FieldsetPage = () => {
  const { component, setComponent, setMutation } = useCurrentComponent();
  const {
    data: field,
    isLoading: fieldIsLoading,
    error: fieldError,
  } = useFieldStyles({});
  const mutation = useUpdateFieldsetStyle();

  const { isLoading: fieldsetIsLoading, error: fieldsetError } =
    useFieldsetStyles({
      onDataLoaded: (component) => {
        setComponent(component);
        setMutation(mutation);
      },
    });

  if (fieldIsLoading || !component || !field || fieldsetIsLoading)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );
  if (fieldError) return <div>Error: {fieldError.message}</div>;
  if (fieldsetError) return <div>Error: {fieldsetError.message}</div>;

  const { root: fieldRoot, label, control } = field.parts;
  const { root: fieldsetRoot, legend } = component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldsetRoot className={fieldsetRoot.raw}>
          <FieldsetLegend className={legend.raw}>
            Billing details
          </FieldsetLegend>

          <FieldRoot className={fieldRoot.raw}>
            <FieldLabel className={label.raw}>Name</FieldLabel>
            Company
            <FieldControl
              placeholder="Enter company name"
              className={control.raw}
            />
          </FieldRoot>

          <FieldRoot className={fieldRoot.raw}>
            <FieldLabel className={label.raw}>Name</FieldLabel>
            Tax ID
            <FieldControl
              placeholder="Enter fiscal number"
              className={control.raw}
            />
          </FieldRoot>
        </FieldsetRoot>
      </Preview>
    </div>
  );
};

export default FieldsetPage;
