export type ComponentConfig = {
  [variant: string]: string;
};

export type Components = {
  [componentType: string]: {
    [element: string]: ComponentConfig;
  };
};
