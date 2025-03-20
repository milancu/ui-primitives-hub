import {db} from '../firebase';
import {Project, ProjectMetadata} from '../models/project.model';
import {DEFAULT_COMPONENTS} from "../default-components";

export class ProjectService {
  static async createProject(userId: string, name: string): Promise<ProjectMetadata> {
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
      components: DEFAULT_COMPONENTS
    });

    return metadata;
  }

  static async getProject(userId: string, projectId: string): Promise<Project> {
    const snapshot = await db.ref(`users/${userId}/projects/${projectId}`).once('value');
    if (!snapshot.exists()) throw new Error('Project not found');
    return snapshot.val();
  }

  static async updateProject(
    userId: string,
    projectId: string,
    updates: Partial<ProjectMetadata>
  ): Promise<ProjectMetadata> {
    const ref = db.ref(`users/${userId}/projects/${projectId}/metadata`);
    await ref.update({
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return (await ref.once('value')).val();
  }

  static async deleteProject(userId: string, projectId: string): Promise<void> {
    await db.ref(`users/${userId}/projects/${projectId}`).remove();
  }

  static async listProjects(userId: string): Promise<ProjectMetadata[]> {
    const snapshot = await db.ref(`users/${userId}/projects`).once('value');
    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, project]: [string, any]) => ({
      id,
      ...project.metadata
    }));
  }
}