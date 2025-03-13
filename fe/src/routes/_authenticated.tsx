import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarRight } from "@/features/sidebar/components/sidebar-right.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { SidebarLeft } from "@/features/sidebar/components/sidebar-left.tsx";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AuthenticatedLayout() {
  const [currentPart] = useCurrentPartParam();
  const router = useRouter();

  const pathname = router.state.location.pathname;

  const formatSegment = (segment: string) => {
    return segment
      .replace(/[-_]/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  };

  const pathSegments = pathname.split("/").filter(Boolean).map(formatSegment);

  const mainSection = pathSegments[0] || "Home";

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="overflow-hidden rounded-lg border shadow-2xl">
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-3">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {mainSection}
                  </BreadcrumbPage>
                </BreadcrumbItem>

                {currentPart && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        {formatSegment(currentPart)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className={"h-full"}>
          <Outlet />
        </div>
      </SidebarInset>
      {currentPart && <SidebarRight />}
    </SidebarProvider>
  );
}
