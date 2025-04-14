import * as React from 'react';
import {Frame, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";


export const Fieldset = () => {
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

  const {root, legend} = tailwind;


  return (
    <Frame style={{
      width: 200,
    }}>
      <Frame name={'root'}
             style={{
               flexDirection: 'column',
               alignSelf: 'stretch',
               ...root.layout
             }}
      >
        <Frame name={'legend'} style={{
          ...legend.layout,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 4,
          }}>
            Billing details
          </Text>
        </Frame>

        <Frame layoutMode={'VERTICAL'}
               itemSpacing={2} style={{
          alignSelf: 'stretch',
          marginTop: root.layout.gap
        }}>
          <Frame name={'label'} style={{
            alignSelf: 'stretch',
          }}>
            <Text>
              Company
            </Text>
          </Frame>
          <Frame name={'control'} style={{
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#9e9e9e',
            alignSelf: 'stretch',
          }}>
            <Text style={{
              color: '#676767',
            }}>
              Enter company name
            </Text>
          </Frame>
        </Frame>

        <Frame layoutMode={'VERTICAL'}
               itemSpacing={2} style={{
          alignSelf: 'stretch',
          marginTop: root.layout.gap
        }}>
          <Frame name={'label'} style={{
            alignSelf: 'stretch',
          }}>
            <Text>
              Tax ID
            </Text>
          </Frame>
          <Frame name={'control'} style={{
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#9e9e9e',
            alignSelf: 'stretch',
          }}>
            <Text style={{
              color: '#676767',
            }}>
              Enter fiscal number
            </Text>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
};
