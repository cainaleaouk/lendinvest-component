import React from 'react';
import renderer from 'react-test-renderer';
import { InputField } from '../InputField';

describe('<InputField /> snapshot', () => {
    it('should render correctly', () => {
        const component = renderer.create(
          <InputField />
        );
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})

