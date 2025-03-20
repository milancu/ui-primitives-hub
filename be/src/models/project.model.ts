import {Components} from "./component.model";

export type ProjectMetadata = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};

export type Project = {
  metadata: ProjectMetadata;
  components: Components;
};