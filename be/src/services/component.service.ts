import {db} from '../firebase';
import {getRawTailwindClasses} from "@ui-primitives-hub/utils";
import {AccordionService} from "./accordion.service";

export class ComponentService {

  private static getAttributes = (root: Record<string, any>): Record<string, any> => {
    return Object.keys(root).reduce((attributes: Record<string, string>, attributeKey) => {
      attributes[attributeKey] = root[attributeKey];
      return attributes;
    }, {});
  };

  // static getComponentStyle = async (componentName: string) => {
  //   const ref = db.ref(componentName);
  //   const snapshot = await ref.once("value");
  //   const component = snapshot.val();
  //
  //   return Object.keys(component).reduce((acc: Record<string, ComponentPart>, key) => {
  //     acc[key] = {
  //       name: key, raw: getRawTailwindClasses(component[key]), attributes: this.getAttributes(component[key])
  //     };
  //     return acc;
  //   }, {});
  // }
  //
  // static getComponent = async (userId: string, projectId: string, componentName: string) => {
  //   const snapshot = await db.ref(`users/${userId}/projects/${projectId}/components/${componentName}`).once('value');
  //   const component = snapshot.val();
  //
  //   const x = Object.keys(component).reduce((acc: Record<string, ComponentPart>, key) => {
  //     acc[key] = {
  //       name: key, raw: getRawTailwindClasses(component[key]), attributes: this.getAttributes(component[key])
  //     };
  //     return acc;
  //   }, {});
  //
  //   const accordion: Component = {
  //     hierarchy: {
  //       name: "root",
  //       children: [
  //         {
  //           name: "item",
  //           children: [
  //             {name: "header", children: [{name: "trigger"}]},
  //             {name: "panel"},
  //           ],
  //         },
  //       ],
  //     },
  //     parts: x
  //   };
  //
  //   return accordion
  // }
  //
  // static updateComponent = async (userId: string, projectId: string, componentName: string, state:string, updates: string) => {
  //   const ref = db.ref(`users/${userId}/projects/${projectId}/${componentName}/${state}`);
  //   await ref.update(updates);
  // }
  //   async (req: any, res: any) => {
  //     const { component } = req.params;
  //     const { id, data } = req.body;
  //
  //     if (!id || !data) {
  //       return res.status(400).json({ error: "ID nebo data chybí" });
  //     }
  //
  //     try {
  //       const ref = db.ref(`${component}/${id}`);
  //       await ref.update(data);
  //       res.status(200).json({ message: "Úspěšně aktualizováno" });
  //     } catch (error: any) {
  //       res.status(500).json({ error: error.message });
  //     }
  // }
  static getComponentHierarchy = (userId: string, projectId: string, componentName: string) => {
    switch (componentName) {
      case "accordion": {
        return AccordionService.getHierarchy()
      }
      default:
        return {}
    }
  }

  static async getComponentParts(uid: any, projectId: string, componentName: string) {
    const snapshot = await db.ref(`users/${uid}/projects/${projectId}/components/${componentName}`).once('value');
    if (!snapshot.exists()) throw new Error('Project or component not found');

    const component = snapshot.val();

    return Object.keys(component).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(component[key])
      return acc;
    }, {})
  }

  static async getComponentPartStates(uid: any, projectId: string, componentName: string, part: string) {
    const snapshot = await db.ref(`users/${uid}/projects/${projectId}/components/${componentName}/${part}`).once('value');
    if (!snapshot.exists()) throw new Error('Project or component not found');

    return snapshot.val();
  }

  static async getComponentPartState(uid: any, projectId: string, componentName: string, part: string, state: string) {
    const snapshot = await db.ref(`users/${uid}/projects/${projectId}/components/${componentName}/${part}/${state}`).once('value');
    if (!snapshot.exists()) throw new Error('Project or component not found');

    return snapshot.val()
  }
}