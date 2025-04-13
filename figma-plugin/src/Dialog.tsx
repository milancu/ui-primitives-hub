import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';
import {useComponentStore} from "./component-store";
import {convertStringToStyle, getRawTailwindClasses} from "@ui-primitives-hub/common/src/main";
import {transformStyle} from "./utils";


export const Dialog = () => {
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

  const {trigger, backdrop, popup, title, description, close} = tailwind;


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
                 borderColor: '#808080',
                 justifyContent: 'center',
                 ...trigger.layout
               }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: 'white',
            textAlign: 'center',
            ...trigger.text
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
                   ...backdrop.layout
                 }}/>
          <Frame name={'popup'} style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#808080',
            flexDirection: 'column',
            ...popup.layout
          }}>
            <Text name={'title'} style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'black',
              textAlign: 'center',
              marginBottom: 8,
              ...title.text,
              ...title.layout
            }}>Notifications</Text>
            <Text name={'description'} style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#9e9e9e',
              textAlign: 'center',
              ...description.text,
              ...description.layout
            }}>You are all caught up. Good job!</Text>
            <Frame name={'close'}
                   onSelectionEnter={() => setIsOpen(false)}
                   style={{
                     alignItems: 'center',
                     alignSelf: 'flex-end',
                     justifyContent: 'center',
                     marginTop: 16,
                     padding: 4,
                     borderRadius: 4,
                     borderWidth: 1,
                     borderColor: '#808080',
                     ...close.layout
                   }}>
              <Text style={{
                color: 'white',
                ...close.text,
              }}>Close</Text>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
