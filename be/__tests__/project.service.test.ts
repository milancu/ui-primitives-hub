import {beforeEach, describe, expect, it, vi} from "vitest";
import {db} from "../src/firebase";
import {Color, ProjectMetadata} from "@ui-primitives-hub/types";
import {ProjectService} from "../src/services/project.service";

vi.mock("../src/firebase", () => ({
  db: {
    ref: vi.fn(() => ({
      once: vi.fn(),
      push: vi.fn(),
      set: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    })),
  },
}));

vi.mock("../src/default-components", () => ({
  DEFAULT_COMPONENTS: {component: true},
  DEFAULT_COLORS: {light: {}, dark: {}},
}));

const userId = "user1";
const projectId = "project1";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ProjectService", () => {
  describe("createProject", () => {
    it("should create a project", async () => {
      const onceMock = vi.fn().mockResolvedValue({val: () => null});
      const setMock = vi.fn();
      const pushMock = vi.fn(() => ({
        key: projectId,
        set: setMock,
      }));

      (db.ref as any) = vi.fn(() => ({
        once: onceMock,
        push: pushMock,
      }));

      const result = await ProjectService.createProject(userId, "NewProject");

      expect(result).toEqual(expect.objectContaining({id: projectId, name: "NewProject"}));
      expect(setMock).toHaveBeenCalled();
    });

    it("should throw if name already exists", async () => {
      const onceMock = vi.fn().mockResolvedValue({
        val: () => ({
          project1: {metadata: {name: "NewProject"}},
        }),
      });
      (db.ref as any) = vi.fn(() => ({
        once: onceMock,
      }));

      await expect(ProjectService.createProject(userId, "NewProject")).rejects.toThrow('Name already exists!');
    });

    it("should throw if name too short or too long", async () => {
      await expect(ProjectService.createProject(userId, "AB")).rejects.toThrow();
      await expect(ProjectService.createProject(userId, "A".repeat(21))).rejects.toThrow();
    });
  });

  describe("getProject", () => {
    it("should get a project", async () => {
      const data = {metadata: {}, components: {}, colors: {}};
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => true, val: () => data}),
      }));

      const result = await ProjectService.getProject(userId, projectId);
      expect(result).toEqual(data);
    });

    it("should throw if project not found", async () => {
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => false}),
      }));

      await expect(ProjectService.getProject(userId, projectId)).rejects.toThrow('Project not found');
    });
  });

  describe("getProjectMetadata", () => {
    it("should get project metadata", async () => {
      const data = {metadata: {name: "Test"}};
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => true, val: () => data}),
      }));

      const result = await ProjectService.getProjectMetadata(userId, projectId);
      expect(result).toEqual(data.metadata);
    });
  });

  describe("getProjectColors", () => {
    it("should get project colors", async () => {
      const colors = {light: {}, dark: {}};
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => true, val: () => colors}),
      }));

      const result = await ProjectService.getProjectColors(userId, projectId);
      expect(result).toEqual(colors);
    });
  });

  describe("updateProjectColors", () => {
    it("should update project color", async () => {
      const updatedColor: Color = {l: 1, c: 1, h: 1};
      (db.ref as any) = vi.fn((path: string) => ({
        once: vi.fn().mockResolvedValue({exists: () => path.includes("projects")}),
        update: vi.fn(),
      }));

      (db.ref as any).mockReturnValueOnce({
        once: vi.fn().mockResolvedValue({exists: () => true}),
      });

      (db.ref as any).mockReturnValueOnce({
        update: vi.fn(),
        once: vi.fn().mockResolvedValue({val: () => updatedColor}),
      });

      const result = await ProjectService.updateProjectColors(userId, projectId, "light", "primary", updatedColor);
      expect(result).toEqual(updatedColor);
    });
  });

  describe("updateProject", () => {


    it("should throw if project name already exists", async () => {
      (db.ref as any) = vi.fn().mockImplementation((path: string) => ({
        once: vi.fn().mockResolvedValue({
          exists: () => path.endsWith(projectId) ? true : true,
          val: () => ({
            anotherProject: {metadata: {name: "NewName"}},
          }),
        }),
      }));

      await expect(ProjectService.updateProject(userId, projectId, "NewName")).rejects.toThrow('Project name already exists');
    });
  });

  describe("updateProjectLastUpdated", () => {
    it("should update project last updated", async () => {
      const updateMock = vi.fn();
      const onceMock = vi.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ updatedAt: new Date().toISOString() }),
      });

      (db.ref as any) = vi.fn(() => ({
        once: onceMock,
        update: updateMock,
      }));

      const result = await ProjectService.updateProjectLastUpdated(userId, projectId);
      expect(result).toHaveProperty("updatedAt");
      expect(updateMock).toHaveBeenCalled();
    });
  });

  describe("deleteProject", () => {
    it("should delete project", async () => {
      const removeMock = vi.fn();
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => true}),
        remove: removeMock,
      }));

      await ProjectService.deleteProject(userId, projectId);
      expect(removeMock).toHaveBeenCalled();
    });
  });

  describe("listProjects", () => {
    it("should list projects", async () => {
      const projects = {
        proj1: {metadata: {updatedAt: new Date().toISOString(), name: "a"}},
        proj2: {metadata: {updatedAt: new Date().toISOString(), name: "b"}},
      };
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => true, val: () => projects}),
      }));

      const result = await ProjectService.listProjects(userId);
      expect(result.length).toBe(2);
    });

    it("should return empty array if no projects", async () => {
      (db.ref as any) = vi.fn(() => ({
        once: vi.fn().mockResolvedValue({exists: () => false}),
      }));

      const result = await ProjectService.listProjects(userId);
      expect(result).toEqual([]);
    });
  });

  describe("searchProjects", () => {
    it("should search projects", async () => {
      vi.spyOn(ProjectService, "listProjects").mockResolvedValue([
        {name: "First Project"} as ProjectMetadata,
        {name: "Second Project"} as ProjectMetadata,
      ]);

      const result = await ProjectService.searchProjects(userId, "First");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("First Project");
    });
  });

  describe("filterProjects", () => {
    it("should filter projects by name", () => {
      const projects: ProjectMetadata[] = [
        {id: "1", name: "Test1", ownerId: "", createdAt: "", updatedAt: ""},
        {id: "2", name: "Another", ownerId: "", createdAt: "", updatedAt: ""},
      ];

      const result = ProjectService.filterProjects(projects, "test");
      expect(result.length).toBe(1);
    });

    it("should return all if searchTerm empty", () => {
      const projects: ProjectMetadata[] = [
        {id: "1", name: "Test1", ownerId: "", createdAt: "", updatedAt: ""},
      ];

      const result = ProjectService.filterProjects(projects, "");
      expect(result.length).toBe(1);
    });
  });
});
