import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import {
  FieldControl,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/components/Field.tsx";
import {
  FieldsetLegend,
  FieldsetRoot,
} from "@ui-primitives-hub/ui/src/components/Fieldset.tsx";
import { useParts } from "@/hooks/queries/useParts.ts";
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";

const FieldsetPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/fieldset",
  });

  const { data: field } = useParts(id, "field");
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts || !field)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const tailwind = Object.keys(parts).reduce(
    (acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(parts[key]);
      return acc;
    },
    {},
  );

  const field_tailwind = Object.keys(field).reduce(
    (acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(field[key]);
      return acc;
    },
    {},
  );

  const { root: fieldRoot, label, control } = field_tailwind;
  const { root: fieldsetRoot, legend } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldsetRoot
          className={getClassName(fieldsetRoot, "fieldsetRoot" === currentPart)}
        >
          <FieldsetLegend
            className={getClassName(legend, "legend" === currentPart)}
          >
            Billing details
          </FieldsetLegend>

          <FieldRoot className={fieldRoot}>
            <FieldLabel className={label}>Name</FieldLabel>
            Company
            <FieldControl
              placeholder="Enter company name"
              className={control}
            />
          </FieldRoot>

          <FieldRoot className={fieldRoot}>
            <FieldLabel className={label}>Name</FieldLabel>
            Tax ID
            <FieldControl
              placeholder="Enter fiscal number"
              className={control}
            />
          </FieldRoot>
        </FieldsetRoot>
      </Preview>
    </div>
  );
};

export default FieldsetPage;
