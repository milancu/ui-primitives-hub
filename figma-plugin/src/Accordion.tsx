import * as React from 'react';
import {Component, Frame, Page, Svg, Text} from 'react-figma';
import dotenv from "dotenv";
import {useComponentStore} from "./component-store";
import {getRawTailwindClasses} from "../../packages/utils/dist";
import {convertStringToStyle} from "@ui-primitives-hub/common/src/main";
import {Style} from '@ui-primitives-hub/types';
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
    (acc: Record<string, Style>, key) => {
      const tailwind = getRawTailwindClasses(parts[key])
      const style = convertStringToStyle(tailwind);
      console.log(tailwind, style)
      acc[key] = transformStyle(style, colors);
      return acc;
    },
    {},
  );

  const {root, item, header, trigger, panel} = tailwind;
  console.log(tailwind)


  return (
    <Page>
      <Frame name={'root'} style={{
        flexDirection: 'column',
        width: parseToPx(root.width),
        height: '100%',
      }}>
        <Component name={'item'}
                   itemSpacing={parseToPx(item.gap)}
                   layoutMode={'VERTICAL'}
                   verticalPadding={parseToPx(item.padding)}
                   horizontalPadding={parseToPx(item.padding)}
                   style={{
                     // padding: parseToPx(item.padding),
                     width: '100%',
                     // borderRadius: parseToPx(item.borderRadius),
                     // borderWidth: parseToPx(item.borderWidth),
                     // borderColor: getColorFromVariable(colors, item.borderColor),
                     // backgroundColor: getColorFromVariable(colors, item.background),
                     ...item
                   }}>
          <Frame
            name={'header'}
            style={{
              width: '100%',
            }}
          >
            <Frame name={'trigger'}
                   style={{
                     width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                   }}
                   onSelectionEnter={() => setIsOpen(prev => !prev)}
            >
              <Text style={{
                fontSize: 14,
              }}>
                What is Base UI?
              </Text>
              <PlusIcon/>
            </Frame>
          </Frame>
          <Frame visible={isOpen} name={'panel'} style={{
            width: '100%',
          }}>
            <Text style={{
              width: '100%',
              color: "#989898",
            }} name={'content'}>
              Base UI is a library of high-quality unstyled React components for design systems and web apps.

            </Text>
          </Frame>
        </Component>
      </Frame>
    </Page>
  );
};
