import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import {CollapsibleService} from "../src/services/collapsible.service";

vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("CollapsibleService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: true,
        children: [
          { name: "trigger", isCustomizable: true },
          { name: "panel", isCustomizable: true },
        ],
      };
      expect(CollapsibleService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        root: "root-class",
        trigger: "trigger-class",
        panel: "panel-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className);

      const mockTemplate = `class __ROOT_CLASSNAME__ __TRIGGER_CLASSNAME__ __PANEL_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Collapsible.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate);

      const result = CollapsibleService.getCode(components);

      expect(result).toContain("root-class");
      expect(result).toContain("trigger-class");
      expect(result).toContain("panel-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
