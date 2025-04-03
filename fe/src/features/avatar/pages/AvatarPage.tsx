import Preview from "@/features/preview/components/preview.tsx";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@ui-primitives-hub/ui/src/components/Avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";

const AvatarPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root, image, fallback } = parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <AvatarRoot className={getClassName(root, "root" === currentPart)}>
          <AvatarImage
            src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
            width="48"
            height="48"
            className={getClassName(image, "image" === currentPart)}
          />
          <AvatarFallback
            className={getClassName(fallback, "fallback" === currentPart)}
          >
            LT
          </AvatarFallback>
        </AvatarRoot>
        <AvatarRoot className={getClassName(root, "root" === currentPart)}>
          LT
        </AvatarRoot>
      </Preview>
    </div>
  );
};

export default AvatarPage;
