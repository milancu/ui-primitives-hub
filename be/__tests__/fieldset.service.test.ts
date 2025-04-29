import { FieldsetService } from "../src/services/fieldset.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("FieldsetService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: true,
        children: [{ name: "legend", isCustomizable: true }],
      };
      expect(FieldsetService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        root: "root-class",
        legend: "legend-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __ROOT_CLASSNAME__ __LEGEND_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Fieldset.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = FieldsetService.getCode(components);

      expect(result).toContain("root-class");
      expect(result).toContain("legend-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
