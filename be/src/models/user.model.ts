export interface User {
  uid: string;
  email?: string;
  figmaId: string;
  createdAt: Date;
  photoURL?: string;
  projects: string[];
}