import React from 'react';
import styled from 'styled-components';

import { Colors } from '../themes';
import { Box } from './Box';
import { Button } from './Buttons';
import { Header2, Text } from './Text';

const Container = styled(Box)`
    padding: 16px;
    background-color: ${Colors.WHITE};
    border: 1px solid ${Colors.GREY};
    max-height: 72px;
`;

const DetailsContainer = styled(Box)`
    flex: 1;
    flex-direction: column;
`;

const ButtonAndStatusContainer = styled(Box)`
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
`;

const InvestedContainer = styled(Box)`
    max-height: 20px;
`;

// TODO: The design this seems to be above the other title which means it does not conform to the container padding as the other elements do
// I'm not sure if that's a mistake in the design, so for now use negative margin (not great)
const InvestedText = styled(Text)`
    margin-top: -8px;
    color: ${Colors.GREEN};
`;


interface Props {
    id: string;
    title: string;
    details: string;
    onClick: (id: string) => void;
}

export const Card = ({details, id, onClick, title,}: Props) => {

    const onButtonPress = React.useCallback(() => {
        onClick(id);
    }, [id, onClick]);

    return (
        <Container>
            <DetailsContainer>
                <Header2>{title}</Header2>
                <Text>
                    {details}
                </Text>
            </DetailsContainer>
            <ButtonAndStatusContainer>
                <InvestedContainer><InvestedText>Invested</InvestedText></InvestedContainer>
                <Button onClick={onButtonPress}>invest</Button>
            </ButtonAndStatusContainer>
        </Container>
    );
}