import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';


export const Dialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Page isCurrent>
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
                 backgroundColor: '#262626',
                 borderRadius: 4,
                 paddingHorizontal: 8,
                 paddingVertical: 4,
                 borderWidth: 1,
                 borderColor: '#808080'
               }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: 'white',
            textAlign: 'center'
          }}>
            View notifications
          </Text>
        </Frame>
        <Frame name={'portal'} visible={isOpen}
               style={{
                 position: 'absolute',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
               }}
        >
          <Frame name={'backdrop'}
                 style={{
                   position: 'absolute',
                   width: 800,
                   height: 400,
                   backgroundColor: 'rgba(0,0,0,0.4)',
                 }}/>
          <Frame name={'popup'} style={{
            backgroundColor: '#262626',
            padding: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#808080',
            flexDirection: 'column',
          }}>
            <Text name={'title'} style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'white',
              textAlign: 'center',
              marginBottom: 8
            }}>Notifications</Text>
            <Text name={'description'} style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#9e9e9e',
              textAlign: 'center'
            }}>You are all caught up. Good job!</Text>
            <Frame name={'close'}
                   onSelectionEnter={() => setIsOpen(false)}
                   style={{
                     alignSelf: 'flex-end',
                     marginTop: 16,
                     padding: 4,
                     borderRadius: 4,
                     borderWidth: 1,
                     borderColor: '#808080',
                   }}>
              <Text style={{
                color: 'white',
              }}>Close</Text>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
