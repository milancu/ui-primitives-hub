import { SelectService } from "../src/services/select.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("SelectService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: false,
        children: [
          {
            name: "trigger",
            isCustomizable: true,
            children: [
              { name: "value", isCustomizable: false },
              { name: "icon", isCustomizable: false },
            ],
          },
          {
            name: "portal",
            isCustomizable: false,
            children: [
              { name: "backdrop", isCustomizable: false },
              {
                name: "positioner",
                isCustomizable: false,
                children: [
                  { name: "scrollUpArrow", isCustomizable: false },
                  {
                    name: "popup",
                    isCustomizable: true,
                    children: [
                      { name: "arrow", isCustomizable: false },
                      {
                        name: "item",
                        isCustomizable: true,
                        children: [
                          { name: "itemText", isCustomizable: true },
                          { name: "itemIndicator", isCustomizable: false },
                        ],
                      },
                      { name: "separator", isCustomizable: false },
                      {
                        name: "group",
                        isCustomizable: false,
                        children: [{ name: "groupLabel", isCustomizable: false }],
                      },
                    ],
                  },
                  { name: "scrollDownArrow", isCustomizable: false },
                ],
              },
            ],
          },
        ],
      };
      expect(SelectService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        trigger: "trigger-class",
        icon: "icon-class",
        positioner: "positioner-class",
        scrollUpArrow: "scroll-up-arrow-class",
        popup: "popup-class",
        item: "item-class",
        itemIndicator: "item-indicator-class",
        itemText: "item-text-class",
        scrollDownArrow: "scroll-down-arrow-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __TRIGGER_CLASSNAME__ __ICON_CLASSNAME__ __POSITIONER_CLASSNAME__ __SCROLL_UP_ARROW_CLASSNAME__ __POPUP_CLASSNAME__ __ITEM_CLASSNAME__ __ITEM_INDICATOR_CLASSNAME__ __ITEM_TEXT_CLASSNAME__ __SCROLL_DOWN_ARROW_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Collapsible.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = SelectService.getCode(components);

      expect(result).toContain("trigger-class");
      expect(result).toContain("icon-class");
      expect(result).toContain("positioner-class");
      expect(result).toContain("scroll-up-arrow-class");
      expect(result).toContain("popup-class");
      expect(result).toContain("item-class");
      expect(result).toContain("item-indicator-class");
      expect(result).toContain("item-text-class");
      expect(result).toContain("scroll-down-arrow-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
