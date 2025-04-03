export const DEFAULT_COMPONENTS: any = {
  "accordion": {
    "header": {
      "default": "text-[#ffffff]",
      "focus": "[box-shadow:0_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0_4px_6px_-2px_rgba(0,_0,_0,_0.05)]",
      "hover": "bg-blue-700"
    },
    "item": {
      "default": "border-b border-gray-200",
      "disabled": "",
      "open": ""
    },
    "panel": {
      "default": "overflow-hidden text-base text-gray-600 transition-[height] ease-out",
      "ending-style": "h-[var(--accordion-panel-height)]",
      "starting-style": "h-[0]"
    },
    "root": {
      "default": "flex w-96 max-w-[calc(100vw-8rem)] flex-col justify-center text-gray-900"
    },
    "trigger": {
      "default": "group flex w-full cursor-pointer items-baseline justify-between gap-4 py-2 text-left font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
    }
  },
  "avatar": {
    "fallback": {
      "default": "flex size-full items-center justify-center text-base"
    },
    "image": {
      "default": "size-full object-cover"
    },
    "root": {
      "default": "inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle text-base font-medium text-black select-none"
    }
  },
  "dialog": {
    "backdrop": {
      "default": "fixed inset-0 bg-black opacity-20 transition-all duration-150 dark:opacity-70",
      "ending-style": "opacity-0",
      "starting-style": "opacity-0"
    },
    "close": {
      "default": "flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
    },
    "description": {
      "default": "mb-6 text-base text-gray-600"
    },
    "popup": {
      "default": "fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 dark:outline-gray-300",
      "ending-style": "scale-90 opacity-0",
      "starting-style": "scale-90 opacity-0"
    },
    "title": {
      "default": "-mt-1.5 mb-1 text-lg font-medium"
    },
    "trigger": {
      "default": "flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-10"
    }
  },
  "field": {
    "control": {
      "default": "h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
    },
    "description": {
      "default": "text-sm text-gray-600"
    },
    "error": {
      "default": "text-sm text-red-800"
    },
    "label": {
      "default": "text-sm font-medium text-gray-900"
    },
    "root": {
      "default": "flex w-full max-w-64 flex-col items-start gap-1"
    }
  },
  "fieldset": {
    "legend": {
      "default": "border-b border-gray-200 pb-3 text-lg font-medium text-gray-900"
    },
    "root": {
      "default": "flex w-full max-w-64 flex-col gap-4"
    }
  },
  "menu": {
    "arrow": {
      "default": "",
      "side=bottom": "top-[-8px]",
      "side=left": "right-[-13px] rotate-90",
      "side=right": "left-[-13px] rotate-90",
      "side=top": "bottom-[-8px] rotate-180"
    },
    "checkboxitem": {
      "default": " "
    },
    "group": {
      "default": " "
    },
    "grouplabel": {
      "default": " "
    },
    "item": {
      "default": "flex cursor-default py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none",
      "highlighted": "relative z-0 text-gray-50 before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm before:bg-gray-900"
    },
    "popup": {
      "default": "origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200",
      "ending-style": "scale-90 pacity-0",
      "starting-style": "scale-90 opacity-0"
    },
    "positioner": {
      "default": "outline-none"
    },
    "radiogroup": {
      "default": " "
    },
    "radioitem": {
      "default": " "
    },
    "separator": {
      "default": "mx-4 my-1.5 h-px bg-gray-200"
    },
    "trigger": {
      "default": "flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100",
      "popup-open": "bg-gray-100"
    }
  },
  "numberfield": {
    "decrement": {
      "default": "flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100"
    },
    "group": {
      "default": "flex"
    },
    "increment": {
      "default": "flex size-10 items-center justify-center rounded-tr-md rounded-br-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100"
    },
    "input": {
      "default": "h-10 w-24 border-t border-b border-gray-200 text-center text-base text-gray-900 tabular-nums focus:z-1 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
    },
    "root": {
      "default": "flex flex-col items-start gap-1"
    },
    "scrubarea": {
      "default": "cursor-ew-resize"
    },
    "scrubareacursor": {
      "default": "drop-shadow-[0_1px_1px_#0008] filter"
    }
  },
};

export const DEFAULT_COLORS = {
  light: {
    background: { l: 0.97, c: 0.02, h: 240 },
    foreground: { l: 0.2, c: 0.05, h: 250 },
    primary: { l: 0.6, c: 0.2, h: 260 },
    primaryForeground: { l: 1, c: 0, h: 0 },
    secondary: { l: 0.75, c: 0.18, h: 290 },
    secondaryForeground: { l: 1, c: 0, h: 0 },
    muted: { l: 0.85, c: 0.03, h: 210 },
    mutedForeground: { l: 0.4, c: 0.04, h: 220 },
    accent: { l: 0.7, c: 0.22, h: 350 },
    accentForeground: { l: 1, c: 0, h: 0 },
    destructive: { l: 0.55, c: 0.25, h: 20 },
    destructiveForeground: { l: 1, c: 0, h: 0 },
    success: { l: 0.6, c: 0.22, h: 150 },
    warning: { l: 0.75, c: 0.3, h: 80 },
    border: { l: 0.9, c: 0.02, h: 240 },
  },
  dark: {
    background: { l: 0.12, c: 0.02, h: 240 },
    foreground: { l: 0.95, c: 0.02, h: 250 },
    primary: { l: 0.7, c: 0.25, h: 260 },
    primaryForeground: { l: 0, c: 0, h: 0 },
    secondary: { l: 0.6, c: 0.22, h: 290 },
    secondaryForeground: { l: 0, c: 0, h: 0 },
    muted: { l: 0.25, c: 0.05, h: 210 },
    mutedForeground: { l: 0.7, c: 0.04, h: 220 },
    accent: { l: 0.75, c: 0.3, h: 350 },
    accentForeground: { l: 0, c: 0, h: 0 },
    destructive: { l: 0.65, c: 0.3, h: 20 },
    destructiveForeground: { l: 0, c: 0, h: 0 },
    success: { l: 0.7, c: 0.3, h: 150 },
    warning: { l: 0.85, c: 0.35, h: 80 },
    border: { l: 0.3, c: 0.02, h: 240 },
  },
};
