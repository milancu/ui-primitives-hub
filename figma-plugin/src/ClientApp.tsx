import * as React from 'react';
import {render} from "react-figma";
import {Accordion} from "./Accordion";
import {Collapsible} from "./Collapsible";

export const ClientApp = () => {
  const generateComponent = (componentName: string) => {
    switch (componentName) {
      case "accordion":
        return render(
            <Accordion/>
        );
      case "collapsible":
        return render(
            <Collapsible/>
        );
    }

  };

  return (
    <div>
      <div>
        <button onClick={() => generateComponent('accordion')}>
          Generate Accordion
        </button>
        <button onClick={() => generateComponent('collapsible')}>
          Generate Collapsible
        </button>
      </div>
    </div>
  );
};