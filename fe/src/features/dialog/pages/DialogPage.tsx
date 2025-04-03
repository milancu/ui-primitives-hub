import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@ui-primitives-hub/ui/src/components/Dialog.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";

const DialogPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { trigger, backdrop, popup, title, description, close } = parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <DialogRoot>
          <DialogTrigger
            className={getClassName(trigger, "trigger" === currentPart)}
          >
            View notifications
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop
              className={getClassName(backdrop, "backdrop" === currentPart)}
            />
            <DialogPopup
              className={getClassName(popup, "popup" === currentPart)}
            >
              <DialogTitle
                className={getClassName(title, "title" === currentPart)}
              >
                Notifications
              </DialogTitle>
              <DialogDescription
                className={getClassName(
                  description,
                  "description" === currentPart,
                )}
              >
                You are all caught up. Good job!
              </DialogDescription>
              <div className="flex justify-end gap-4">
                <DialogClose
                  className={getClassName(close, "close" === currentPart)}
                >
                  Close
                </DialogClose>
              </div>
            </DialogPopup>
          </DialogPortal>
        </DialogRoot>
      </Preview>
    </div>
  );
};

export default DialogPage;
