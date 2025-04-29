import { MenuService } from "../src/services/menu.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("MenuService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: false,
        children: [
          { name: "trigger", isCustomizable: true },
          {
            name: "portal",
            isCustomizable: false,
            children: [
              { name: "backdrop", isCustomizable: false },
              {
                name: "positioner",
                isCustomizable: false,
                children: [
                  {
                    name: "popup",
                    isCustomizable: true,
                    children: [
                      { name: "arrow", isCustomizable: false },
                      { name: "item", isCustomizable: true },
                      { name: "separator", isCustomizable: true },
                      { name: "group", isCustomizable: false, children: [{ name: "group-label", isCustomizable: false }] },
                      {
                        name: "radio-group",
                        isCustomizable: false,
                        children: [{ name: "radio-item", isCustomizable: false }],
                      },
                      { name: "checkbox-item", isCustomizable: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(MenuService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        trigger: "trigger-class",
        backdrop: "backdrop-class",
        positioner: "positioner-class",
        popup: "popup-class",
        arrow: "arrow-class",
        item: "item-class",
        separator: "separator-class",
        group: "group-class",
        grouplabel: "grouplabel-class",
        radiogroup: "radiogroup-class",
        radioitem: "radioitem-class",
        checkboxitem: "checkboxitem-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __TRIGGER_CLASSNAME__ __BACKDROP_CLASSNAME__ __POSITIONER_CLASSNAME__ __POPUP_CLASSNAME__ __ARROW_CLASSNAME__ __ITEM_CLASSNAME__ __SEPARATOR_CLASSNAME__ __GROUP_CLASSNAME__ __GROUP_LABEL_CLASSNAME__ __RADIO_GROUP_CLASSNAME__ __RADIO_ITEM_CLASSNAME__ __CHECKBOX_ITEM_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Menu.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = MenuService.getCode(components);

      expect(result).toContain("trigger-class");
      expect(result).toContain("backdrop-class");
      expect(result).toContain("positioner-class");
      expect(result).toContain("popup-class");
      expect(result).toContain("arrow-class");
      expect(result).toContain("item-class");
      expect(result).toContain("separator-class");
      expect(result).toContain("group-class");
      expect(result).toContain("grouplabel-class");
      expect(result).toContain("radiogroup-class");
      expect(result).toContain("radioitem-class");
      expect(result).toContain("checkboxitem-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
