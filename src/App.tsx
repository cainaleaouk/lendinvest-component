import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { Box } from './components/Box';
import { Challenge } from './features/Challenge';

import { store } from './store';

const ComponentWrapper = styled(Box)`
    width: 512px;
    height: 512px;
`;

export const App = () => {
    return (
        <ComponentWrapper>
            <Provider store={store}>
                <Challenge />
            </Provider>
        </ComponentWrapper>
    );
}

