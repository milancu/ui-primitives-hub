import * as React from 'react';
import {Frame, Page, Svg, Text} from 'react-figma';

const ChevronIcon = ({isOpen}: { isOpen: boolean }) => (
  <Svg
    rotation={isOpen ? -90 : 0}
    isWithoutConstraints={true}
    locked={true}
    source={`<svg
 width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M3.5 9L7.5 5L3.5 1" stroke="white"/>
    </svg>`}
  />
);


export const Collapsible = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Page isCurrent>
      <Frame name={'root'} style={{
        width: 150
      }}>
        <Frame name={'trigger'}
               onSelectionEnter={() => setIsOpen(prev => !prev)}
               style={{
                 flexDirection: 'row',
                 alignSelf: 'stretch',
                 alignItems: 'center',
                 backgroundColor: '#838383',
                 borderRadius: 4,
                 paddingHorizontal: 8,
                 paddingVertical: 4
               }}>
          <ChevronIcon isOpen={isOpen}/>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: 'white',
            marginLeft: 4
          }}>
            Recovery keys
          </Text>
        </Frame>
        <Frame name={'panel'} visible={isOpen}
               style={{
                 alignSelf: 'stretch',
                 backgroundColor: '#838383',
                 marginTop: 4,
                 padding: 8,
                 borderRadius: 4,
               }}>
          <Frame layoutMode={'VERTICAL'}
                 itemSpacing={2}>
            <Text style={{
              fontSize: 10,
              color: 'white',
            }}>alien-bean-pasta</Text>
            <Text style={{
              fontSize: 10,
              color: 'white',
            }}>wild-irish-burrito</Text>
            <Text style={{
              fontSize: 10,
              color: 'white',
            }}>horse-battery-staple</Text>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
