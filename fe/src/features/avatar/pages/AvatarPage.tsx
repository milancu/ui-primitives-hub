import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import Preview from "@/components/preview.tsx";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@ui-primitives-hub/ui/src/Avatar.tsx";
import { useAvatarStyles } from "@/features/avatar/hooks/queries/useAvatarStyles.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useUpdateAvatarStyle } from "@/features/avatar/hooks/mutations/useUpdateAvatarStyle.ts";

const AvatarPage = () => {
  const { component, setComponent, setMutation } = useCurrentComponent();
  const mutation = useUpdateAvatarStyle();
  const { isLoading, error } = useAvatarStyles({
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
  if (error) return <div>Error: {error.message}</div>;

  const { root, image, fallback } = component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <AvatarRoot className={root.raw}>
          <AvatarImage
            src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
            width="48"
            height="48"
            className={image.raw}
          />
          <AvatarFallback className={fallback.raw}>LT</AvatarFallback>
        </AvatarRoot>
        <AvatarRoot className={root.raw}>LT</AvatarRoot>
      </Preview>
    </div>
  );
};

export default AvatarPage;
