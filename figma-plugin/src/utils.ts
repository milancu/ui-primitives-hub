import {Style} from "@ui-primitives-hub/types";

export function getColorFromVariable(colorMap: Record<string, string>, variable?: string): string {
  if (!variable) return "";
  const key = variable.replace("var(--", "").replace(")", "");
  return colorMap[key] || "";
}

export function parseToPx(value?: string | number, baseFontSize: number = 16): number {
  if (typeof value === 'number') {
    return value;
  }

  if (!value) return 0;

  if (typeof value === 'string') {
    if (value.endsWith('px')) {
      return parseFloat(value.replace('px', ''));
    }

    if (value.endsWith('rem')) {
      const remValue = parseFloat(value.replace('rem', ''));
      return remValue * baseFontSize;
    }

    if (value.endsWith('em')) {
      const emValue = parseFloat(value.replace('em', ''));
      return emValue * baseFontSize;
    }
  }

  return parseFloat(value);
}

export function transformStyle(
    style: Style,
    colorMap: Record<string, string>
): { layout: Record<string, any>; text: Record<string, any> } {
  const layout: Record<string, any> = {};
  const text: Record<string, any> = {};

  const layoutProps = new Set([
    'width', 'minWidth', 'height', 'gap',
    'borderRadius', 'borderWidth', 'borderBottomWidth', 'borderTopWidth',
    'borderLeftWidth', 'borderRightWidth', 'outlineWidth',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'background', 'borderColor',
  ]);

  const textProps = new Set([
    'fontSize', 'textAlign', 'textDecoration', 'textTransform', 'color'
  ]);

  for (const [key, value] of Object.entries(style)) {
    const val = typeof value === 'string' || typeof value === 'number' ? value : undefined;
    if (val == null) continue;

    const pxValue = typeof val === 'number' ? val : parseToPx(val);

    if (layoutProps.has(key)) {
      if (key === 'background') {
        layout['backgroundColor'] = getColorFromVariable(colorMap, val as string);
      } else if (key === 'borderColor') {
        layout['borderColor'] = getColorFromVariable(colorMap, val as string);
      } else {
        layout[key] = pxValue;
      }
    } else if (textProps.has(key)) {
      if (key === 'color') {
        text['color'] = getColorFromVariable(colorMap, val as string);
      } else {
        text[key] = pxValue;
      }
    } else {
    }
  }

  return {layout, text};
}
