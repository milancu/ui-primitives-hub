import {Style} from "@ui-primitives-hub/types";

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export function getColorFromVariable(colorMap: Record<string, string>, variable?: string): string {
  if (!variable) return "";
  const match = variable.match(/var\(--([^)]+)\)/);
  const kebabKey = match?.[1];
  const camelKey = kebabKey ? kebabToCamel(kebabKey) : "";
  return camelKey ? colorMap[camelKey] || "" : "";
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
    'background', 'borderColor'
  ]);

  const rawLayoutProps = new Set([
    'display', 'position', 'alignItems', 'justifyContent', 'flexDirection',
    'alignSelf'
  ]);

  const textProps = new Set([
    'fontSize', 'textAlign', 'textDecoration', 'textTransform', 'color'
  ]);

  const rawTextProps = new Set([
    'textAlign', 'textDecoration', 'textTransform'
  ]);

  for (const [key, value] of Object.entries(style)) {
    const val = typeof value === 'string' || typeof value === 'number' ? value : undefined;
    if (val == null) continue;

    if (val === '100%') {
      layout['alignSelf'] = 'stretch';
      continue;
    }

    if (layoutProps.has(key)) {
      if (key === 'background') {
        layout['backgroundColor'] = getColorFromVariable(colorMap, val as string);
      } else if (key === 'borderColor') {
        layout['borderColor'] = getColorFromVariable(colorMap, val as string);
      } else {
        layout[key] = typeof val === 'number' ? val : parseToPx(val);
      }
    } else if (rawLayoutProps.has(key)) {
      layout[key] = val;
    } else if (textProps.has(key)) {
      if (key === 'color') {
        text['color'] = getColorFromVariable(colorMap, val as string);
      } else if (rawTextProps.has(key)) {
        text[key] = val;
      } else {
        text[key] = typeof val === 'number' ? val : parseToPx(val);
      }
    }
  }

  return { layout, text };
}
