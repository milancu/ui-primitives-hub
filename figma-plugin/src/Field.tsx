import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';


export const Field = () => {

  return (
    <Page isCurrent>
      <Frame style={{
        width: 200
      }}>
        <Frame name={'root'}
               layoutMode={'VERTICAL'}
               itemSpacing={4}
               style={{
                 alignSelf: 'stretch',
               }}
        >
          <Frame name={'label'} style={{
            alignSelf: 'stretch',
          }}>
            <Text>
              Name
            </Text>
          </Frame>
          <Frame name={'control'} style={{
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#9e9e9e',
            alignSelf: 'stretch',
          }}>
            <Text style={{
              color: '#676767',
            }}>
              Required
            </Text>
          </Frame>
          <Frame name={'description'} style={{
            width: '100%',
          }}>
            <Text style={{
              color: '#9e9e9e',
            }}>
              Your name
            </Text>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
