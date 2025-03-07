export type CSSUnit = `${number}${"px" | "%" | "em" | "rem" | "vh" | "vw"}`;

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
