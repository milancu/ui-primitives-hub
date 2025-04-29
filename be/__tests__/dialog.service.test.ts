import { DialogService } from "../src/services/dialog.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("DialogService", () => {
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
                name: "popup",
                isCustomizable: true,
                children: [
                  { name: "title", isCustomizable: true },
                  { name: "description", isCustomizable: true },
                  { name: "close", isCustomizable: true },
                ],
              },
            ],
          },
        ],
      };
      expect(DialogService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        trigger: "trigger-class",
        backdrop: "backdrop-class",
        popup: "popup-class",
        title: "title-class",
        description: "description-class",
        close: "close-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __TRIGGER_CLASSNAME__ __BACKDROP_CLASSNAME__ __POPUP_CLASSNAME__ __TITLE_CLASSNAME__ __DESCRIPTION_CLASSNAME__ __CLOSE_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Dialog.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = DialogService.getCode(components);

      expect(result).toContain("trigger-class");
      expect(result).toContain("backdrop-class");
      expect(result).toContain("popup-class");
      expect(result).toContain("title-class");
      expect(result).toContain("description-class");
      expect(result).toContain("close-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
