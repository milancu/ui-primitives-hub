import * as React from 'react';
import {Frame, Page, Text} from 'react-figma';


export const Fieldset = () => {

  return (
    <Page isCurrent>
      <Frame style={{
        width: 200
      }}>
        <Frame name={'root'}
               layoutMode={'VERTICAL'}
               itemSpacing={8}
               style={{
                 alignSelf: 'stretch',
               }}
        >
          <Frame name={'legend'}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 4,
            }}>
              Billing details
            </Text>
          </Frame>

          <Frame layoutMode={'VERTICAL'}
                 itemSpacing={2} style={{
            alignSelf: 'stretch',
          }}>
            <Frame name={'label'} style={{
              alignSelf: 'stretch',
            }}>
              <Text>
                Company
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
                Enter company name
              </Text>
            </Frame>
          </Frame>

          <Frame layoutMode={'VERTICAL'}
                 itemSpacing={2} style={{
            alignSelf: 'stretch',
          }}>
            <Frame name={'label'} style={{
              alignSelf: 'stretch',
            }}>
              <Text>
                Tax ID
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
                Enter fiscal number
              </Text>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Page>
  );
};
