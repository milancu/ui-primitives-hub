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
  "popover": {
    "trigger": {
      "default": "flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100",
      "data-popup-open": "bg-gray-100"
    },
    "popup": {
      "default": "origin-[var(--transform-origin)] rounded-lg bg-[canvas] px-6 py-4 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
      "data-ending-style": "scale-90 opacity-0",
      "data-starting-style": "scale-90 opacity-0"
    },
    "arrow": {
      "data-side-bottom": "top-[-8px]",
      "data-side-left": "right-[-13px] rotate-90",
      "data-side-right": "left-[-13px] -rotate-90",
      "data-side-top": "bottom-[-8px] rotate-180"
    },
    "title": {
      "default": "text-base font-medium"
    },
    "description": {
      "default": "text-base text-gray-600"
    },
    "portal": {
      "default": ""
    },
    "positioner": {
      "default": ""
    }
  },
  "select": {
    "trigger": {
      "default": "flex h-10 min-w-36 items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100",
      "data-popup-open": "bg-gray-100"
    },
    "icon": {
      "default": "flex"
    },
    "positioner": {
      "default": "outline-none"
    },
    "scrollUpArrow": {
      "default": "top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-['']",
      "data-direction-down": "bottom-0 before:bottom-[-100%]"
    },
    "popup": {
      "default": "group [max-height:var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
      "data-ending-style": "scale-90 opacity-0 transition-none",
      "data-starting-style": "scale-90 opacity-0",
      "data-side-none": "data-[starting-style]:scale-100 data-[starting-style]:opacity-100 data-[starting-style]:transition-none"
    },
    "item": {
      "default": "grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4",
      "data-highlighted": "relative z-0 text-gray-50 before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm before:bg-gray-900"
    },
    "itemIndicator": {
      "default": "col-start-1"
    },
    "itemText": {
      "default": "col-start-2"
    },
    "scrollDownArrow": {
      "default": "bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-['']",
      "data-direction-down": "bottom-0 before:bottom-[-100%]"
    },
    "portal": {
      "default": ""
    },
    "value": {
      "default": ""
    }
  },
  "collapsible": {
    "root": {
      "default": "flex min-h-36 w-56 flex-col justify-center text-gray-900"
    },
    "trigger": {
      "default": "group flex items-center gap-2 rounded-sm bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-200"
    },
    "triggerIcon": {
      "default": "size-3 transition-all ease-out",
      "data-panel-open": "rotate-90"
    },
    "panel": {
      "default": "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-all ease-out",
      "data-ending-style": "h-0",
      "data-starting-style": "h-0"
    }
  },
  "input": {
    "input": "h-10 w-full max-w-64 rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
  }
};

export const DEFAULT_COLORS = {
  light: {
    background: {l: 1, c: 0, h: 0},
    foreground: {l: 0.16376, c: 0, h: 0},
    primary: {l: 0.6, c: 0.2, h: 260},
    primaryForeground: {l: 0.31351, c: 0.10239, h: 260.66372},
    secondary: {l: 0.75, c: 0.18, h: 290},
    secondaryForeground: {l: 0.36331, c: 0.17018, h: 300.51915},
    muted: {l: 0.87302, c: 0, h: 0},
    mutedForeground: {l: 0.55553, c: 0, h: 0},
    accent: {l: 0.77569, c: 0.14162, h: 55.75339},
    accentForeground: {l: 0.45744, c: 0.12116, h: 44.76592},
    destructive: {l: 0.65809, c: 0.19363, h: 12.24604},
    destructiveForeground: {l: 0.40451, c: 0.14773, h: 26.97093},
    success: {l: 0.6, c: 0.22, h: 150},
    warning: {l: 0.57471, c: 0.17717, h: 40.89418},
    border: {l: 0.77627, c: 0, h: 0},
  },
  dark: {
    background: {l: 0.13038, c: 0.02329, h: 246.38471},
    foreground: {l: 0.92191, c: 0, h: 0},
    primary: {l: 0.33124, c: 0.10153, h: 254.56621},
    primaryForeground: {l: 0.91547, c: 0.04041, h: 267.10644},
    secondary: {l: 0.6, c: 0.22, h: 290},
    secondaryForeground: {l: 0, c: 0, h: 0},
    muted: {l: 0.20277, c: 0.01603, h: 256.83929},
    mutedForeground: {l: 0.67741, c: 0.05464, h: 253.06071},
    accent: {l: 0.83858, c: 0.17142, h: 90.82562},
    accentForeground: {l: 0.33607, c: 0.06966, h: 99.06071},
    destructive: {l: 0.4768, c: 0.18881, h: 20.42179},
    destructiveForeground: {l: 0.82076, c: 0.10058, h: 19.4492},
    success: {l: 0.60127, c: 0.198, h: 141.04553},
    warning: {l: 0.85, c: 0.35, h: 80},
    border: {l: 0.29313, c: 0, h: 0},
  },
};
