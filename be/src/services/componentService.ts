import {db} from "../firebase";
import {ComponentPart} from "@ui-primitives-hub/types";
import {getRawTailwindClasses} from "@ui-primitives-hub/utils";

const getAttributes = (root: Record<string, any>): Record<string, any> => {
  return Object.keys(root).reduce((attributes: Record<string, string>, attributeKey) => {
    attributes[attributeKey] = root[attributeKey];
    return attributes;
  }, {});
};

export const getComponentStyle = async (componentName: string) => {
  const ref = db.ref(componentName);
  const snapshot = await ref.once("value");
  const accordion = snapshot.val();

  return Object.keys(accordion).reduce((acc: Record<string, ComponentPart>, key) => {
    acc[key] = {
      name: key, raw: getRawTailwindClasses(accordion[key]), attributes: getAttributes(accordion[key])
    };
    return acc;
  }, {});
}
