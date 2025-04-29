import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import {AccordionService} from "../src/services/accordion.service";

vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("AccordionService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: true,
        children: [
          {
            name: "item",
            isCustomizable: true,
            children: [
              { name: "header", isCustomizable: true, children: [{ name: "trigger", isCustomizable: true }] },
              { name: "panel", isCustomizable: true },
            ],
          },
        ],
      };
      expect(AccordionService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        root: "root-class",
        item: "item-class",
        header: "header-class",
        trigger: "trigger-class",
        panel: "panel-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className);

      const mockTemplate = `class __ROOT_CLASSNAME__ __ITEM_CLASSNAME__ __HEADER_CLASSNAME__ __TRIGGER_CLASSNAME__ __PANEL_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Accordion.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate);

      const result = AccordionService.getCode(components);

      expect(result).toContain("root-class");
      expect(result).toContain("item-class");
      expect(result).toContain("header-class");
      expect(result).toContain("trigger-class");
      expect(result).toContain("panel-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
