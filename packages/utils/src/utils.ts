import postcss from "postcss";
import CheatSheet from "./cheatsheet";
import {Style} from "@ui-primitives-hub/types";
import * as postcssJs from 'postcss-js';
import {CssToTailwindTranslator} from "css-to-tailwind-translator";


export function cssToJsObject(
  cssString: string
): Record<string, string | number> {
  return cssString
    .split(";")
    .filter((rule) => rule.trim() !== "")
    .reduce((acc: Record<string, string | number>, rule: string) => {
      const [property, value] = rule.split(":").map((part) => part.trim());
      const jsProperty = property.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      acc[jsProperty] = isNaN(Number(value)) ? value : Number(value);
      return acc;
    }, {});
}

const arbitrarySupportedClasses: Record<string, string> = {
  pt: "padding-top",
  pb: "padding-bottom",
  pl: "padding-left",
  pr: "padding-right",
  p: "padding",
  mb: "margin-bottom",
  m: "margin",
  mt: "margin-top",
  ml: "margin-left",
  mr: "margin-right",
  w: "width",
  h: "height",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  bg: "background",
  border: "border-color",
  text: "color",
  aspect: "aspect-ratio",
  color: "color",
  "max-w": "max-width",
  "max-h": "max-height"
};

const convertToCss = (classNames: string[]) => {
  let cssCode = ``;
  CheatSheet.forEach((element: any) => {
    element.content.forEach((content: any) => {
      content.table.forEach((list: any) => {
        if (classNames.includes(list[0])) {
          cssCode += `${list[1]} \n`;
        }

        if (classNames.includes(list[1])) {
          const semicolon = list[2][list[2].length - 1] !== ";" ? ";" : "";
          cssCode += `${list[2]}${semicolon} \n`;
        }
      });
    });
  });

  // Check for arbitrary values

  const arbitraryClasses = classNames.filter((className) =>
    className.includes("[")
  );

  arbitraryClasses.forEach((className) => {
    try {
      const property = className.split("-[")[0].replace(".", "");

      const propertyValue = className.match(/(?<=\[)[^\][]*(?=])/g)![0];
      if (arbitrarySupportedClasses[property]) {
        cssCode += `${arbitrarySupportedClasses[property]}: ${propertyValue};\n`;
      }
    } catch (e) {

    }
  });

  return cssCode;
};

const getBreakPoints = (input: string, breakpoint: string) => {
  return input
    .replace("\n", " ")
    .split(" ")
    .filter((i: string) => i.startsWith(breakpoint + ":"))
    .map((i: string) => i.substring(3));
};

const getHoverClass = (input: string) => {
  return input
    .replace("\n", " ")
    .split(" ")
    .filter((i) => i.startsWith("hover:"))
    .map((i) => i.replace("hover:", ""));
};

export const getConvertedClasses = (input: string) => {
  if (input === "") return "";

  const classNames = input
    .split(/\s+/)
    .map((i) => i.trim())
    .filter((i) => i !== "");
  const breakpoints = CheatSheet[0].content[1].table;

  const hoverClasses = getHoverClass(input);

  const smClasses = getBreakPoints(input, "sm");
  const mdClasses = getBreakPoints(input, "md");
  const lgClasses = getBreakPoints(input, "lg");
  const xlClasses = getBreakPoints(input, "xl");
  const _2xlClasses = getBreakPoints(input, "2xl");

  let resultCss = `${convertToCss(classNames)}
${
    smClasses.length !== 0
      ? breakpoints[0][1].replace("...", "\n  " + convertToCss(smClasses))
      : ""
  }
${
    mdClasses.length !== 0
      ? breakpoints[1][1].replace("...", "\n  " + convertToCss(mdClasses))
      : ""
  }
${
    lgClasses.length !== 0
      ? breakpoints[2][1].replace("...", "\n  " + convertToCss(lgClasses))
      : ""
  }
${
    xlClasses.length !== 0
      ? breakpoints[3][1].replace("...", "\n  " + convertToCss(xlClasses))
      : ""
  }
${
    _2xlClasses.length !== 0
      ? breakpoints[4][1].replace("...", "\n  " + convertToCss(_2xlClasses))
      : ""
  }
${hoverClasses.length !== 0 ? `:hover {\n ${convertToCss(hoverClasses)} }` : ""}
`;

  return resultCss.trimEnd();
};

export const convertFromCssToJss = (css: string): Style => {
  const root = postcss.parse(css);
  return postcssJs.objectify(root) as Style;
};

export const styleToString = (style: Style): string => {
  const toKebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  const processValue = (key: string, value: any): string => {
    if (typeof value === "object" && value !== null) {
      if (key === "padding" || key === "margin") {
        const {top, right, bottom, left} = value;
        return [
          top ? `${key}-top:${top};` : "",
          right ? `${key}-right:${right};` : "",
          bottom ? `${key}-bottom:${bottom};` : "",
          left ? `${key}-left:${left};` : ""
        ].join("");
      }
      return "";
    }
    return `${toKebabCase(key)}:${value};`;
  };

  return Object.entries(style)
    .map(([key, value]: [any, any]) =>
      value !== undefined ? processValue(key, value) : ""
    )
    .join("\n");
};

export const convertStringToStyle = (style: string): Style => {
  const resultCss = getConvertedClasses(style);
  return (convertFromCssToJss(resultCss));
};

function addDataPrefix(input: string, key: string) {
  return (input
    .split(/\s+/)
    .map((word) => `data-[${key}]:${word}`)
    .join(" ") + " ");
}


export const getRawTailwindClasses = (style: any) => {
  let result = "";
  result += style.default + " ";
  Object.keys(style).forEach(key => {
    if (key === "default") {
      return;
    }
    result += addDataPrefix(style[key], key);
  });
  return result;
};

export const styleToTailwind = (style: Style): string => {
  const css = styleToString(style);
  console.log(css)
  const conversionResult = CssToTailwindTranslator(
    `component { ${css} }`,
    {
      customTheme: {
        color: {
          'var(--background)': 'text-[var(--background)]',
          'var(--foreground)': 'text-[var(--foreground)]',
          'var(--primary)': 'text-[var(--primary)]',
          'var(--primaryForeground)': 'text-[var(--primaryForeground)]',
          'var(--secondary)': 'text-[var(--secondary)]',
          'var(--secondaryForeground)': 'text-[var(--secondaryForeground)]',
          'var(--muted)': 'text-[var(--muted)]',
          'var(--mutedForeground)': 'text-[var(--mutedForeground)]',
          'var(--accent)': 'text-[var(--accent)]',
          'var(--accentForeground)': 'text-[var(--accentForeground)]',
          'var(--destructive)': 'text-[var(--destructive)]',
          'var(--destructiveForeground)': 'text-[var(--destructiveForeground)]',
          'var(--success)': 'text-[var(--success)]',
          'var(--warning)': 'text-[var(--warning)]',
          'var(--border)': 'text-[var(--border)]',
        },
        'border-color': {
          'var(--background)': 'border-[var(--background)]',
          'var(--foreground)': 'border-[var(--foreground)]',
          'var(--primary)': 'border-[var(--primary)]',
          'var(--primaryForeground)': 'border-[var(--primaryForeground)]',
          'var(--secondary)': 'border-[var(--secondary)]',
          'var(--secondaryForeground)': 'border-[var(--secondaryForeground)]',
          'var(--muted)': 'border-[var(--muted)]',
          'var(--mutedForeground)': 'border-[var(--mutedForeground)]',
          'var(--accent)': 'border-[var(--accent)]',
          'var(--accentForeground)': 'border-[var(--accentForeground)]',
          'var(--destructive)': 'border-[var(--destructive)]',
          'var(--destructiveForeground)': 'border-[var(--destructiveForeground)]',
          'var(--success)': 'border-[var(--success)]',
          'var(--warning)': 'border-[var(--warning)]',
          'var(--border)': 'border-[var(--border)]',
        }
      }
    }
  );

  console.log(conversionResult)

  // if (!conversionResult.data?.[0]?.resultVal) {
  //   throw new Error("Invalid CSS conversion");
  // }

  return conversionResult.data[0].resultVal;
};
