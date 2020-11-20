import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('<Button /> snapshot', () => {
    it('should render correctly', () => {
        const component = renderer.create(
          <Button onClick={jest.fn}>Click me!</Button>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})

