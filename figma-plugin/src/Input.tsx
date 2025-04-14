import * as React from 'react';
import {Frame, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";


export const Input = () => {
  const parts = useComponentStore.getState().parts;
  const colors = useComponentStore.getState().colors;

  if (!parts || !colors)
    return (
      <Text>
        Loading...
      </Text>
    );

  const tailwind = Object.keys(parts).reduce(
    (acc: Record<string, { layout: Record<string, any>; text: Record<string, any> }>, key) => {
      const tailwind = getRawTailwindClasses(parts[key])
      const style = convertStringToStyle(tailwind);
      acc[key] = transformStyle(style, colors);
      return acc;
    },
    {},
  );

  const {input} = tailwind;


  return (
    <Frame style={{
      width: 200,
    }}>
      <Frame name={'input'} style={{
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        alignSelf: 'stretch',
        ...input.layout
      }}>
        <Text style={{
          color: '#676767',
        }}>
          Name
        </Text>
      </Frame>
    </Frame>
  );
};
