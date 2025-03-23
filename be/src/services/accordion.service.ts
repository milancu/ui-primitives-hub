import {ComponentHierarchy} from "@ui-primitives-hub/types";

export class AccordionService {
    static getHierarchy(): ComponentHierarchy {
        return {
            name: "root",
            children: [
                {
                    name: "item",
                    children: [
                        {name: "header", children: [{name: "trigger"}]},
                        {name: "panel"},
                    ],
                },
            ],
        }
    }
}