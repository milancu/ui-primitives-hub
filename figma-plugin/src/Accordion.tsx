import * as React from 'react';
import {Component, Frame, Page, Svg, Text} from 'react-figma';
import dotenv from "dotenv";
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {parseToPx, transformStyle} from "./utils";

dotenv.config();

const PlusIcon = () => (
  <Svg
    locked={true}
    source={`<svg viewBox="0 0 12 12">
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" stroke-width="1" />
    </svg>`}
  />
);

export const Accordion = () => {
  const [isOpen, setIsOpen] = React.useState(false);
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

  const {root, item, header, trigger, panel} = tailwind;

  return (
    <Page>
      <Frame name={'root'} style={{
          ...root.layout,
          flexDirection: 'column',
        height: '100%',
      }}>
        <Component name={'item'}
                   itemSpacing={parseToPx(item.layout.gap)}
                   layoutMode={'VERTICAL'}
                   verticalPadding={parseToPx(item.layout.padding)}
                   horizontalPadding={parseToPx(item.layout.padding)}
                   style={{
                       ...item.layout,
                       alignSelf: 'stretch',
                     width: '100%',
                   }}>
          <Frame
            name={'header'}
            style={{
              width: '100%',
                ...header.layout
            }}
          >
            <Frame name={'trigger'}
                   style={{
                       ...trigger.layout,
                       width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                       alignSelf: 'stretch',
                   }}
                   onSelectionEnter={() => setIsOpen(prev => !prev)}
            >
              <Text style={{
                  ...trigger.text
              }}>
                What is Base UI?
              </Text>
              <PlusIcon/>
            </Frame>
          </Frame>
          <Frame visible={isOpen} name={'panel'} style={{
            width: '100%',
              ...panel.layout
          }}>
            <Text style={{
              width: '100%',
                ...panel.text
            }} name={'content'}>
              Base UI is a library of high-quality unstyled React components for design systems and web apps.

            </Text>
          </Frame>
        </Component>
      </Frame>
    </Page>
  );
};
