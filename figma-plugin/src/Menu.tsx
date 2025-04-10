import * as React from 'react';
import {Frame, Page, Svg, Text} from 'react-figma';


const ArrowSvg = () => (
  <Svg isWithoutConstraints={true}
       style={{
         position: 'absolute',
         top: -9,
       }}
       locked={true} source={`<svg width="20" height="10" viewBox="0 0 20 10" fill="none">
    <path
      d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      fill="#1c1b22" stroke-width="1"
    />
    <path
      d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
      fill="#4c4c4c" stroke-width="1"
    />
    <path
      d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      fill="#4c4c4c" stroke-width="1"
    />
  </svg>`}/>
);

const ChevronRightIcon = () => (
  <Svg source={` <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 3.5L5 7.5L9 3.5" stroke="white"/>
    </svg>`}
  />
)


const MenuItem = ({item}: { item: string }) => {
  return (
    <Frame name={'item'} style={{padding: 8}}>
      <Text style={{
        color: 'white'
      }}>
        {item}
      </Text>
    </Frame>
  )
}

export const Menu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Page isCurrent>
      <Frame style={{
        width: 200
      }}>
        <Frame name={'root'} style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Frame name={'trigger'}
                 onSelectionEnter={() => setIsOpen(prev => !prev)}
                 style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                   padding: 8,
                   borderWidth: 1,
                   borderColor: '#454545',
                   backgroundColor: '#1a1b1b',
                   borderRadius: 4
                 }}>
            <Text style={{
              marginRight: 8,
              color: 'white',
            }}>
              Song
            </Text>
            <ChevronRightIcon/>
          </Frame>
          <Frame name={'portal'}
                 visible={isOpen}
                 style={{
                   marginTop: 10,
                   flexDirection: 'column'
                 }}>
            <Frame name={'popup'} style={{
              padding: 2,
              alignItems: 'center',
              backgroundColor: '#1c1b22',
              borderWidth: 2,
              borderColor: '#4c4c4c',
              borderRadius: 8
            }}>
              <ArrowSvg/>
              <MenuItem item={'Add to Library'}/>
              <MenuItem item={'Add to Playlist'}/>
              <MenuItem item={'Play Next'}/>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
