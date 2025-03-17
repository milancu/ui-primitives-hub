import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { useDialogStyles } from "@/features/dialog/hooks/queries/useDialogStyles.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import {
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@ui-primitives-hub/ui/src/Dialog.tsx";
import { useUpdateDialogStyle } from "@/features/dialog/hooks/mutations/useUpdateDialogStyle.ts";

const DialogPage = () => {
  const { component, setComponent, setMutation } = useCurrentComponent();
  const mutation = useUpdateDialogStyle();
  const { isLoading, error } = useDialogStyles({
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

  const { trigger, backdrop, popup, title, description, close } =
    component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <DialogRoot>
          <DialogTrigger className={trigger.raw}>
            View notifications
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className={backdrop.raw} />
            <DialogPopup className={popup.raw}>
              <DialogTitle className={title.raw}>Notifications</DialogTitle>
              <DialogDescription className={description.raw}>
                You are all caught up. Good job!
              </DialogDescription>
              <div className="flex justify-end gap-4">
                <DialogClose className={close.raw}>Close</DialogClose>
              </div>
            </DialogPopup>
          </DialogPortal>
        </DialogRoot>
      </Preview>
    </div>
  );
};

export default DialogPage;
