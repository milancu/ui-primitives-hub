import * as React from 'react';
import {Component, Frame, Svg, Text} from 'react-figma';

const PlusIcon = () => (
  <Svg
    locked={true}
    source={`<svg viewBox="0 0 12 12">
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>`}
  />
);

export const Accordion = () => {
  const [isOpen, setIsOpen] = React.useState(false);


  return (
    <Frame name={'root'} itemSpacing={16} layoutMode={'VERTICAL'} style={{
      flexDirection: 'column',
      width: 350,
      height: '100%'
    }}>
      <Component name={'item'}
                 itemSpacing={4}
                 layoutMode={'VERTICAL'}
                 verticalPadding={16}
                 horizontalPadding={16}
                 style={{
                   width: '100%',
                   borderRadius: 8,
                   borderWidth: 1,
                   borderColor: '#8f8f8f',
                   backgroundColor: 'white',
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
          height: isOpen ? '' : 0,
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
  );
};
