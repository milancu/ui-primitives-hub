import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';


export const Input = () => {

  return (
    <Page isCurrent>
      <Frame style={{
        width: 200
      }}>
        <Frame name={'input'} style={{
          padding: 8,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#9e9e9e',
          alignSelf: 'stretch',
        }}>
          <Text style={{
            color: '#676767',
          }}>
            Name
          </Text>
        </Frame>
      </Frame>
    </Page>
  );
};
