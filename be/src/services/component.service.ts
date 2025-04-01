import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import { ProjectService } from './project.service.js';
import { AccordionService } from "./accordion.service.js";
import { db } from "../firebase.js";
import { AvatarService } from "./avatar.service.js";
import { DialogService } from "./dialog.service.js";
import { FieldService } from "./field.service.js";
import { FieldsetService } from "./fieldset.service.js";
import {MenuService} from "./menu.service.js";
import {NumberfieldService} from "./numberfield.service.js";


export class ComponentService {

  private static getAttributes = (root: Record<string, any>): Record<string, any> => {
    return Object.keys(root).reduce((attributes: Record<string, string>, attributeKey) => {
      attributes[attributeKey] = root[attributeKey];
      return attributes;
    }, {});
  };

  static updateComponent = async (userId: string, projectId: string, componentName: string, part: string, state: string, tailwind: string) => {
    const ref = db.ref(`users/${userId}/projects/${projectId}/components/${componentName}/${part}`);
    const updatedData = {
      [state]: tailwind,
    };
    await ref.update(updatedData);
    await ProjectService.updateProjectLastUpdated(userId, projectId);
    return (await ref.once('value')).val();
  }

  static getComponentHierarchy = (userId: string, projectId: string, componentName: string) => {
    switch (componentName) {
      case "accordion": {
        return AccordionService.getHierarchy()
      }
      case "avatar": {
        return AvatarService.getHierarchy()
      }
      case "dialog": {
        return DialogService.getHierarchy()
      }
      case "field": {
        return FieldService.getHierarchy()
      }
      case "fieldset": {
        return FieldsetService.getHierarchy()
      }
      case "menu": {
        return MenuService.getHierarchy()
      }
      case "numberfield": {
        return NumberfieldService.getHierarchy()
      }
      default:
        return {}
    }
  }

  static async getComponentParts(uid: any, projectId: string, componentName: string) {
    const snapshot = await db.ref(`users/${uid}/projects/${projectId}/components/${componentName}`).once('value');
    if (!snapshot.exists()) throw new Error('Project or component not found');

    const components = snapshot.val();

    return Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
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

  static async getComponentCode(uid: any, projectId: string, componentName: string):Promise<string> {
    const snapshot = await db.ref(`users/${uid}/projects/${projectId}/components/${componentName}/`).once('value');
    if (!snapshot.exists()) throw new Error('Project or component not found');

    const components = snapshot.val();
    switch (componentName) {
      case "accordion": {
        return AccordionService.getCode(components)
      }
      case "avatar": {
        return AvatarService.getCode(components)
      }
      case "dialog": {
        return DialogService.getCode(components)
      }
      case "field": {
        return FieldService.getCode(components)
      }
      case "fieldset": {
        return FieldsetService.getCode(components)
      }
      case "menu": {
        return MenuService.getCode(components)
      }
      case "numberfield": {
        return NumberfieldService.getCode(components)
      }
      default:
        return ''
    }
  }
}