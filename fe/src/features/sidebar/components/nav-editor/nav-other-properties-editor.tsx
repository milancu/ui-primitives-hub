import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus } from "lucide-react";
import { useStyleStore } from "@/hooks/store/style-store.ts";

const NavOtherPropertiesEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);
  return (
    <Collapsible title={"Other properties"} className="group/collapsible">
      <SidebarGroup className={"p-0"}>
        <SidebarGroupLabel asChild className="group/label">
          <CollapsibleTrigger>
            Other properties
            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Input
                  placeholder={"box-shadow"}
                  type={"text"}
                  value={style?.boxShadow}
                  onChange={(e) => {
                    handleStyle("boxShadow", e.target.value);
                  }}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select
                  value={style?.cursor}
                  onValueChange={(value) => {
                    handleStyle("cursor", value);
                  }}
                >
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      cursor: <SelectValue placeholder="Select a cursor" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="capitalize">pointer</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select
                  value={style?.overflow}
                  onValueChange={(value) => {
                    handleStyle("overflow", value);
                  }}
                >
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      overflow: <SelectValue placeholder="Select a overflow" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="auto">auto</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavOtherPropertiesEditor;
