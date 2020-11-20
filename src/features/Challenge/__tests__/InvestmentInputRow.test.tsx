import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import InvestmentInputRow from '../components/InvestmentInputRow';
import { Provider } from 'react-redux';

import { store } from '../../../store';


describe('<InvestmentInputRow.test /> snapshot', () => {
    it('input field should update correctly', () => {
        const testUtils = render(
            <Provider store={store}>
                <InvestmentInputRow />
            </Provider>
        );
        
        //@TODO create an enum with testIds and use it here instead of magic string
        const input = testUtils.getByTestId('amount-input');

        fireEvent.change(input, { target: { value: '23' } });
        //@TODO: check how to improve the type so the ts-ignore is not needed
        //@ts-ignore
        expect(input.value).toBe('23');
    });
})

