import React from 'react';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import { Text } from '../../../components/Text';

const Container = styled(Box)`
    justify-content: center;
    align-items: flex-end;
`;

const Label = styled(Text)`
    text-align: center;
`;

interface StateProps {
    total: string;
}

export const Footer = ({total}: StateProps) => {
    return (
        <Container>
            <Label>Total amount available for investments: <b>{total}</b></Label>
        </Container>
    )
}
