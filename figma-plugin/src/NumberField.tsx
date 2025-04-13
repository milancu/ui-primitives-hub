import * as React from 'react';
import {Frame, Page, Svg, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";

const PlusIcon = () => (
  <Svg source={` <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="black"
      stroke-width="1.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>`}
  />
)

const MinusIcon = () => (
  <Svg source={`<svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="black"
      stroke-width="1.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5H10" />
    </svg>`}/>
)

export const NumberField = () => {
  const [value, setValue] = React.useState(100);

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

  console.log(tailwind)
  console.log(parts)

  const {decrement, increment, input, group, root} = tailwind;


  return (
    <Page isCurrent>
      <Frame name={'root'} layoutMode={'VERTICAL'}
             primaryAxisSizingMode={'AUTO'}
             itemSpacing={root.layout.gap}
      >
        <Frame name={'label'}>
          <Text style={{
            color: '#676767',
            fontSize: 10,
            fontWeight: '500',
            marginBottom: 4,
            ...root.text
          }}>
            Amount
          </Text>
        </Frame>
        <Frame name={'group'}
               layoutMode={'HORIZONTAL'}
               itemSpacing={group.layout.gap}
        >
          <Frame name={'decrement'} onSelectionEnter={() => setValue(prevState => prevState - 1)} style={{
            width: 30,
            height: 30,
            backgroundColor: '#939393',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // borderTopLeftRadius: 4,
            // borderBottomLeftRadius: 4,
            borderWidth: 1,
            borderColor: '#6e6e6e',
            ...decrement.layout
          }}>
            <MinusIcon/>
          </Frame>
          <Frame name={'input'} style={{
            height: 30,
            width: 60,
            borderWidth: 1,
            borderColor: '#6e6e6e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8,
            ...input.layout
          }}>
            <Text style={{
              color: '#676767',
              textAlign: 'left',
              // ...input.text,
            }}>
              {value}
            </Text>
          </Frame>
          <Frame name={'increment'} onSelectionEnter={() => setValue(prevState => prevState + 1)} style={{
            width: 30,
            height: 30,
            backgroundColor: '#939393',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // borderTopRightRadius: 4,
            // borderBottomRightRadius: 4,
            borderWidth: 1,
            borderColor: '#6e6e6e',
            ...increment.layout
          }}
          >
            <PlusIcon/>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
