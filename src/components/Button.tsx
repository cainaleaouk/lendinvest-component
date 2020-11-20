import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes';

import { Box } from './Box';
import { Text } from './Text';

const Container = styled.button`
    display: flex;
    flex: 1;
    background-color: ${Colors.YELLOW};
    align-items: center;
    justify-content: center;
    width: 144px;
    max-height: 48px;
    cursor: pointer;
    border: none;
    &:focus {
        outline: none;
    }
`;

const Label = styled(Text)`
    font-size: 16px;
    text-transform: uppercase;
`;

interface Props {
    children: string;
    onClick: () => void;
}

export const Button = ({children, onClick}: Props) => {
    return (
        <Container onClick={onClick}>
            <Label>{children}</Label>
        </Container>
    )
}