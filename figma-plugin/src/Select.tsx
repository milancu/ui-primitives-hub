import * as React from 'react';
import {Frame, Svg, Text} from "react-figma";

const ChevronUpDownIcon = () => (
  <Svg source={`<svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="white"
      stroke-width="1.5"
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>`}
  />
)

const CheckIcon = () => (
  <Svg source={` <svg fill="white" width="10" height="10" viewBox="0 0 10 10">
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>`}
  />
)

const SelectItem = ({isSelected, item, onClick}: {
  isSelected: boolean,
  item: string,
  onClick: (item: string) => void
}) => {
  return (
    <Frame name={'item'} onSelectionEnter={() => onClick(item)} style={{
      flexDirection: 'row',
      alignItems: 'center',
      height: 30,
      alignSelf: 'stretch',
    }}>
      <Frame style={{
        width: 10
      }}>
        {isSelected && <CheckIcon/>}
      </Frame>
      <Text style={{
        color: 'white',
        marginLeft: 8
      }}>
        {item}
      </Text>
    </Frame>
  )
}

const items = [
  'Serif', 'Sans-serif', 'Monospace', 'Cursive'
]

export const Select = () => {
  const [value, setValue] = React.useState<string>('Serif');
  const [isOpen, setIsOpen] = React.useState(false);
  const [offset, setOffset] = React.useState(1);

  return (
    <Frame name={'root'}>
      <Frame name={'trigger'} onSelectionEnter={() => setIsOpen(prev => !prev)}>
        <Frame name={'value'} style={{
          width: 100,
          height: 30,
          backgroundColor: '#29282c',
          padding: 8,
          borderWidth: 1,
          borderColor: '#4c4c4c',
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            color: 'white',
          }}>
            {value || 'Select'}
          </Text>
          <ChevronUpDownIcon/>
        </Frame>
      </Frame>
      <Frame name={'portal'} visible={isOpen} style={{
        position: 'absolute',
        top: -2 - 30 * (offset - 1),
        left: -17,
      }}>
        <Frame name={'positioner'}>
          <Frame name={'popup'} style={{
            width: 130,
            backgroundColor: '#1c1b22',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 2
          }}>
            {items.map((item, index) => {
              return (
                <SelectItem key={index} onClick={(value) => {
                  setIsOpen(false)
                  setValue(value)
                  setOffset(index + 1)
                }} item={item} isSelected={value === item}/>
              )
            })
            }
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  )
}

