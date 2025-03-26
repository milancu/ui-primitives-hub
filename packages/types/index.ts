export type CSSUnit = `${number}${"px" | "%" | "em" | "rem" | "vh" | "vw"}`;


export type ComponentHierarchy = {
  name: string;
  children?: ComponentHierarchy[];
};

export type Component = {
  [key: string]: string;
};

export type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  components?: ProjectComponents;
};

export type ComponentType =
  | 'accordion'
  | 'avatar'
  | 'dialog'
  | 'field'
  | 'menu'
  | 'numberfield';

export type ComponentConfig = {
  [key: string]: {
    [variant: string]: string;
  };
};

export type ProjectComponents = {
  [key in ComponentType]?: ComponentConfig;
};

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

export interface Style {
  width?: CSSUnit;
  maxWidth?: CSSUnit;
  minWidth?: CSSUnit;
  height?: CSSUnit | "auto";
  display?: "flex" | "block";
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap";
  alignItems?: "flex-start" | "center" | "flex-end" | "baseline";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: CSSUnit;
  borderRadius?: CSSUnit;
  borderRadiusTopLeft?: CSSUnit;
  borderRadiusTopRight?: CSSUnit;
  borderRadiusBottomLeft?: CSSUnit;
  borderRadiusBottomRight?: CSSUnit;
  borderWidth?: CSSUnit;
  borderBottomWidth?: CSSUnit;
  borderTopWidth?: CSSUnit;
  borderLeftWidth?: CSSUnit;
  borderRightWidth?: CSSUnit;
  borderColor?: string;
  outlineWidth?: CSSUnit;
  outlineColor?: string;
  outlineStyle?: string;
  backgroundColor?: string;
  background?: string;
  opacity?: string;
  padding?:
    | CSSUnit;
  paddingTop?: CSSUnit;
  paddingRight?: CSSUnit;
  paddingBottom?: CSSUnit;
  paddingLeft?: CSSUnit;
  paddingVertical?: CSSUnit;
  paddingHorizontal?: CSSUnit;
  margin?:
    | CSSUnit;
  marginTop?: CSSUnit;
  marginRight?: CSSUnit;
  marginBottom?: CSSUnit;
  marginLeft?: CSSUnit;
  marginVertical?: CSSUnit;
  marginHorizontal?: CSSUnit;
  color?: string;
  fontSize?: CSSUnit;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  boxShadow?: string;
  cursor?: string;
  pointerEvents?: "auto" | "none";
  overflow: string;
}
