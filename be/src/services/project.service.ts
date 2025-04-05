import {db} from "../firebase.js";
import {DEFAULT_COLORS, DEFAULT_COMPONENTS} from "../default-components.js";
import {Color, ColorScheme, Project, ProjectMetadata} from "@ui-primitives-hub/types";

export class ProjectService {
  static async createProject(userId: string, name: string): Promise<ProjectMetadata> {
    const projectsSnapshot = await db.ref(`users/${userId}/projects`).once('value');
    const projects = projectsSnapshot.val();

    const nameExists = projects
      ? Object.values(projects).some((p: any) => p.metadata?.name === name)
      : false;

    if (nameExists) {
      throw new Error('Name already exists!');
    }

    if (name.length > 20) throw new Error(
      'Name must be less than 20 characters'
    )

    if (name.length < 3) throw new Error(
      'Name must be more than 3 characters'
    )

    const projectRef = db.ref(`users/${userId}/projects`).push();
    const metadata: ProjectMetadata = {
      id: projectRef.key!,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: userId
    };

    await projectRef.set({
      metadata,
      components: DEFAULT_COMPONENTS,
      colors: DEFAULT_COLORS
    });

    return metadata;
  }


  static async getProject(userId: string, projectId: string): Promise<Project> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) throw new Error('Project not found');
    return snapshot.val();
  }

  static async getProjectMetadata(userId: string, projectId: string): Promise<Project> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) throw new Error('Project not found');
    const component = snapshot.val();
    return {
      ...component.metadata
    };
  }

  static async getProjectColors(userId: string, projectId: string): Promise<ColorScheme> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}/colors`).once('value');
    if (!snapshot.exists()) throw new Error('Project not found');
    return snapshot.val();
  }

  static async updateProjectColors(
    userId: string,
    projectId: string,
    theme: string,
    color: string,
    newValue: Color
  ): Promise<ColorScheme> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) {
      throw new Error('Project does not exists.');
    }

    const colorRef = db.ref(`users/${userId}/projects/${projectId}/colors/${theme}/${color}`);

    await colorRef.update(newValue);
    return (await colorRef.once('value')).val();
  }

  static async updateProject(
    userId: string,
    projectId: string,
    name: string
  ): Promise<ProjectMetadata> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) {
      throw new Error('Project does not exists.');
    }

    const metadataRef = db.ref(`users/${userId}/projects/${projectId}/metadata`);

    if (name) {
      const allProjectsSnap = await db.ref(`users/${userId}/projects`).once('value');
      const allProjects = allProjectsSnap.val();

      const nameExists = Object.entries(allProjects || {}).some(
        ([id, proj]: any) =>
          id !== projectId && proj.metadata?.name === name
      );

      if (nameExists) {
        throw new Error('Project name already exists. Please choose another name.');
      }
    }

    const updatedData = {
      name: name,
      updatedAt: new Date().toISOString(),
    };

    await metadataRef.update(updatedData);
    return (await metadataRef.once('value')).val();
  }

  static async updateProjectLastUpdated(
    userId: string,
    projectId: string,
  ): Promise<ProjectMetadata> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) {
      throw new Error('Project does not exists.');
    }
    const metadataRef = db.ref(`users/${userId}/projects/${projectId}/metadata`);

    const updatedData = {
      updatedAt: new Date().toISOString(),
    };

    await metadataRef.update(updatedData);
    return (await metadataRef.once('value')).val();
  }


  static async deleteProject(userId: string, projectId: string): Promise<void> {
    const projectRef = db.ref(`users/${userId}/projects/${projectId}`);
    const snapshot = await projectRef.once('value');

    if (!snapshot.exists()) {
      throw new Error('Project does not exists.');
    }

    await projectRef.remove();
  }

  static async listProjects(userId: string): Promise<ProjectMetadata[]> {
    const snapshot = await db.ref(`users/${userId}/projects`).once('value');
    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val())
      .map(([id, project]: [string, any]) => ({
        id,
        ...project.metadata
      }))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static async searchProjects(userId: string, searchTerm: string): Promise<ProjectMetadata[]> {
    try {
      const projects = await this.listProjects(userId);
      return this.filterProjects(projects, searchTerm);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);

    }
  }

  static filterProjects(projects: ProjectMetadata[], searchTerm: string): ProjectMetadata[] {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    if (!normalizedSearch) return projects;

    return projects.filter(project =>
      project.name.toLowerCase().includes(normalizedSearch)
    );
  }
}