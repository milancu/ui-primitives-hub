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

const NavOtherPropertiesEditor = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Other properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Input placeholder={"box-shadow"} type={"text"} />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Select>
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
            <Select>
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
    </SidebarGroup>
  );
};

export default NavOtherPropertiesEditor;
