import {Components} from "./component.model";

export type Color = {
  l: number;
  c: number;
  h: number;
};

export type ColorScheme = {
  background: Color;
  foreground: Color;
  primary: Color;
  primaryForeground: Color;
  secondary: Color;
  secondaryForeground: Color;
  muted: Color;
  mutedForeground: Color;
  accent: Color;
  accentForeground: Color;
  destructive: Color;
  destructiveForeground: Color;
  success: Color;
  warning: Color;
  border: Color;
};


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
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
};