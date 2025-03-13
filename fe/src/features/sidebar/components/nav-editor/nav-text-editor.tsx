import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";

const NavTextEditor = () => {
  return (
    <Collapsible title={"Text properties"} className="group/collapsible">
      <SidebarGroup className={'p-0'}>
        <SidebarGroupLabel
          asChild
          className="group/label "
        >
          <CollapsibleTrigger>
            Text properties
            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className={'p-2'}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"font-size"}
                  type={"number"}
                  min={0}
                  character={"S"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"font-weight"}
                  type={"number"}
                  min={0}
                  character={"W"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select>
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      text-align:{" "}
                      <SelectValue placeholder="Select a text-align" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">left</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="right">right</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select>
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      text-transform:{" "}
                      <SelectValue placeholder="Select a text-transform" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="capitalize">capitalize</SelectItem>
                    <SelectItem value="uppercase">uppercase</SelectItem>
                    <SelectItem value="lowercase">lowercase</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
              <SidebarMenuItem className={"flex gap-1"}>
                <ColorPicker hideContrastRatio={true} value={"#AEDEAE"}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <div
                      className="mr-2 h-4 w-4 rounded-full shadow-sm"
                      style={{ backgroundColor: "#AEDEAE" }}
                    />
                    <span className="text-muted-foreground flex-grow">
                      color #AEDEAE
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </ColorPicker>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavTextEditor;
