import {Style} from "@ui-primitives-hub/types";

export function getColorFromVariable(colorMap: Record<string, string>, variable?: string): string {
  if (!variable) return "";
  const key = variable.replace("var(--", "").replace(")", "");
  return colorMap[key] || "";
}

export function parseToPx(value?: string | number, baseFontSize: number = 16): number {
  console.log('Received value:', value);

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
export function transformStyle(style: Style, colorMap: Record<string, string>): Record<string, any> {
  const transformedStyle: Record<string, any> = {};

  if (style.width) {
    transformedStyle['width'] = parseToPx(style.width);
  }
  if (style.minWidth) {
    transformedStyle['minWidth'] = parseToPx(style.minWidth);
  }
  if (style.height) {
    transformedStyle['height'] = typeof style.height === 'string' ? style.height : parseToPx(style.height);
  }
  if (style.gap) {
    transformedStyle['gap'] = parseToPx(style.gap);
  }
  if (style.borderRadius) {
    transformedStyle['borderRadius'] = parseToPx(style.borderRadius);
  }
  if (style.borderWidth) {
    transformedStyle['borderWidth'] = parseToPx(style.borderWidth);
  }
  if (style.borderBottomWidth) {
    transformedStyle['borderBottomWidth'] = parseToPx(style.borderBottomWidth);
  }
  if (style.borderTopWidth) {
    transformedStyle['borderTopWidth'] = parseToPx(style.borderTopWidth);
  }
  if (style.borderLeftWidth) {
    transformedStyle['borderLeftWidth'] = parseToPx(style.borderLeftWidth);
  }
  if (style.borderRightWidth) {
    transformedStyle['borderRightWidth'] = parseToPx(style.borderRightWidth);
  }
  if (style.outlineWidth) {
    transformedStyle['outlineWidth'] = parseToPx(style.outlineWidth);
  }
  if (style.padding) {
    transformedStyle['padding'] = parseToPx(style.padding);
  }
  if (style.paddingTop) {
    transformedStyle['paddingTop'] = parseToPx(style.paddingTop);
  }
  if (style.paddingRight) {
    transformedStyle['paddingRight'] = parseToPx(style.paddingRight);
  }
  if (style.paddingBottom) {
    transformedStyle['paddingBottom'] = parseToPx(style.paddingBottom);
  }
  if (style.paddingLeft) {
    transformedStyle['paddingLeft'] = parseToPx(style.paddingLeft);
  }
  if (style.margin) {
    transformedStyle['margin'] = parseToPx(style.margin);
  }
  if (style.marginTop) {
    transformedStyle['marginTop'] = parseToPx(style.marginTop);
  }
  if (style.marginRight) {
    transformedStyle['marginRight'] = parseToPx(style.marginRight);
  }
  if (style.marginBottom) {
    transformedStyle['marginBottom'] = parseToPx(style.marginBottom);
  }
  if (style.marginLeft) {
    transformedStyle['marginLeft'] = parseToPx(style.marginLeft);
  }

  if (style.background) {
    transformedStyle['backgroundColor'] = getColorFromVariable(colorMap, style.background);
  }
  if (style.borderColor) {
    transformedStyle['borderColor'] = getColorFromVariable(colorMap, style.borderColor);
  }
  if (style.color) {
    transformedStyle['color'] = getColorFromVariable(colorMap, style.color);
  }

  for (const [key, value] of Object.entries(style)) {
    if (!(key in transformedStyle)) {
      transformedStyle[key] = value;
    }
  }

  return transformedStyle;
}