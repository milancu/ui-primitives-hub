import * as React from 'react';
import {Frame, Page, Svg, Text} from 'react-figma';

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

  return (
    <Page isCurrent>
      <Frame style={{
      }}>
        <Frame name={'root'} style={{
          alignSelf: 'stretch',
          flexDirection: 'column'
        }}>
          <Frame name={'label'}>
            <Text style={{
              color: '#676767',
              fontSize: 10,
              fontWeight: '500',
              marginBottom: 4,
            }}>
              Amount
            </Text>
          </Frame>
          <Frame name={'group'} style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Frame name={'decrement'} onSelectionEnter={() => setValue(prevState => prevState - 1)} style={{
              width: 30,
              height: 30,
              backgroundColor: '#939393',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              borderWidth: 1,
              borderColor: '#6e6e6e'
            }}>
              <MinusIcon/>
            </Frame>
            <Frame name={'input'} style={{
              height: 30,
              width: 60,
              borderWidth: 1,
              borderColor: '#6e6e6e',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 8
            }}>
              <Text style={{
                color: '#676767',
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
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              borderWidth: 1,
              borderColor: '#6e6e6e'
            }}
            >
              <PlusIcon/>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
