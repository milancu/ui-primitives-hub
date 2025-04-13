import * as React from 'react';
import {Frame, Page, Svg, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";

const ChevronIcon = ({isOpen}: { isOpen: boolean }) => (
  <Svg
    rotation={isOpen ? -90 : 0}
    isWithoutConstraints={true}
    locked={true}
    source={`<svg
 width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M3.5 9L7.5 5L3.5 1" stroke="black"/>
    </svg>`}
  />
);


export const Collapsible = () => {
  const [isOpen, setIsOpen] = React.useState(false);
    const parts = useComponentStore.getState().parts;
    const colors = useComponentStore.getState().colors;

    if (!parts || !colors) return (
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

    const {root, trigger, panel} = tailwind;
    console.log(parts)
    console.log(tailwind)


    return (
    <Page isCurrent>
      <Frame name={'root'} style={{
          width: 150,
          ...root.layout,
      }}>
        <Frame name={'trigger'}
               onSelectionEnter={() => setIsOpen(prev => !prev)}
               style={{
                 flexDirection: 'row',
                 alignSelf: 'stretch',
                 alignItems: 'center',
                   // backgroundColor: '#838383',
                   // borderRadius: 4,
                   // paddingHorizontal: 8,
                   // paddingVertical: 4,
                   ...trigger.layout
               }}>
          <ChevronIcon isOpen={isOpen}/>
          <Text style={{
              // fontSize: 12,
              // fontWeight: '500',
              // color: 'white',
              marginLeft: 4,
              ...trigger.text
          }}>
            Recovery keys
          </Text>
        </Frame>
        <Frame name={'panel'} visible={isOpen}
               style={{
                 alignSelf: 'stretch',
                   height: '100%',
                   ...panel.layout,

               }}>
          <Frame layoutMode={'VERTICAL'}
                 itemSpacing={6}
                 paddingLeft={16}
                 verticalPadding={8}
          >
            <Text style={{
              fontSize: 10,
              color: 'white',
                ...panel.text
            }}>alien-bean-pasta</Text>
            <Text style={{
              fontSize: 10,
              color: 'white',
                marginVertical: 4,
                ...panel.text
            }}>wild-irish-burrito</Text>
            <Text style={{
              fontSize: 10,
              color: 'white',
                ...panel.text
            }}>horse-battery-staple</Text>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
