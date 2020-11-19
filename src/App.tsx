import React from 'react';
import styled from 'styled-components';

import { Box } from './components/Box';
import { Challenge } from './features/Challenge';

const ComponentWrapper = styled(Box)`
    width: 512px;
    height: 512px;
`;

export const App = () => {
    return (
        <ComponentWrapper>
            <Challenge />
        </ComponentWrapper>
    );
}

