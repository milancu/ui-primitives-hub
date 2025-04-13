import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";


export const Field = () => {
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

  const {control, description, error, label, root} = tailwind;


  console.log(parts)
  console.log(tailwind)

  return (
    <Page isCurrent>
      <Frame style={{
        width: 200
      }}>
        <Frame name={'root'}
               layoutMode={'VERTICAL'}
               itemSpacing={4}
               style={{
                 alignSelf: 'stretch',
                 ...root.layout
               }}
        >
          <Frame name={'label'} style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            ...label.layout
          }}>
            <Text style={{
              ...label.text
            }}>
              Name
            </Text>
          </Frame>
          <Frame name={'control'} style={{
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#9e9e9e',
            alignSelf: 'stretch',
            justifyContent: 'center',
            ...control.layout
          }}>
            <Text style={{
              color: '#676767',
              ...control.text
            }}>
              Required
            </Text>
          </Frame>
          <Frame name={'description'} style={{
            width: '100%',
            ...description.layout
          }}>
            <Text style={{
              color: '#9e9e9e',
              ...description.text
            }}>
              Your name
            </Text>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
