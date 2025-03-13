import NavSizeEditor from "@/features/sidebar/components/nav-editor/nav-size-editor.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import NavPaddingEditor from "@/features/sidebar/components/nav-editor/nav-padding-editor.tsx";
import NavMarginEditor from "@/features/sidebar/components/nav-editor/nav-margin-editor.tsx";
import NavLayoutEditor from "@/features/sidebar/components/nav-editor/nav-layout-editor.tsx";
import NavBorderOutlineEditor from "@/features/sidebar/components/nav-editor/nav-border-outline-editor.tsx";
import NavBackgroundEditor from "@/features/sidebar/components/nav-editor/nav-background-editor.tsx";
import NavTextEditor from "@/features/sidebar/components/nav-editor/nav-text-editor.tsx";
import NavOtherPropertiesEditor from "@/features/sidebar/components/nav-editor/nav-other-properties-editor.tsx";

const NavEditor = () => {
  return (
    <>
      <NavLayoutEditor />
      <Separator />
      <NavSizeEditor />
      <Separator />
      <NavPaddingEditor />
      <NavMarginEditor />
      <Separator />
      <NavBorderOutlineEditor />
      <Separator />
      <NavBackgroundEditor />
      <Separator />
      <NavTextEditor />
      <Separator />
      <NavOtherPropertiesEditor />
      <Separator />
    </>
  );
};

export default NavEditor;
