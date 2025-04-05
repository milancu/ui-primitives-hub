import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";

const AppBreadcrumb = () => {
  const location = useLocation();

  const [currentPart] = useCurrentPartParam();
  const [mainSection, setMainSection] = useState<string>("Home");

  const formatSegment = (segment: string) => {
    return segment
      .replace(/[-_]/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  };

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter(Boolean)
      .map(formatSegment);
    setMainSection(pathSegments[1] || "Home");
  }, [location.pathname]);

  return (
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
  );
};

export default AppBreadcrumb;
