import * as React from 'react';
import {createComponent, Frame, Svg, Text} from 'react-figma';

const PlusIcon = () => (
    <Svg
        locked={true}
        source={`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6V18M18 12H6" stroke="currentColor" stroke-width="1.5"/>
    </svg>`}
    />
);

type AccordionItemProps = {
    title: string;
    content: string
}

const AccordionItem = ({title, content}: AccordionItemProps) => {
    const Item = createComponent();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Item.Component name={'item'}
                        itemSpacing={4}
                        layoutMode={'VERTICAL'}
                        verticalPadding={16}
                        horizontalPadding={16}
                        onLayout={(props) => console.log('layout', props)}
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
                        {title}
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
                    {content}
                </Text>
            </Frame>
        </Item.Component>
    );
};


export const Accordion = () => {
    const Item = createComponent();
    const [isOpen, setIsOpen] = React.useState(false);


    return (
        <Frame name={'root'} itemSpacing={16} layoutMode={'VERTICAL'} style={{
            flexDirection: 'column',
            width: 400,
            height: '100%'
        }}>
            <Item.Component name={'item'}
                            itemSpacing={4}
                            layoutMode={'VERTICAL'}
                            verticalPadding={16}
                            horizontalPadding={16}
                            onLayout={(props) => console.log('layout', props)}
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
                               width: '100%',
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'space-between',
                           }}
                           onSelectionEnter={() => setIsOpen(prev => !prev)}
                    >
                        <Text style={{
                            fontSize: 14,
                        }}>
                            What is Base Ui
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
                    }}>
                        assdjj
                    </Text>
                </Frame>
            </Item.Component>
            <Item.Instance overrides={{
                text: {
                    content: 'Overrided text'
                }
            }}/>
        </Frame>
    );
};
