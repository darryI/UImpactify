import React from 'react';
import { render } from '@testing-library/react';
import Home, {LOC} from './Home';

test('renders home page', () => {

  var apiFunc = jest.spyOn(LOC, 'useQuery').mockImplementationOnce(() => {
    return new URLSearchParams();
  })

  const { getByText } = render(<Home/>);
  const homeElement = getByText('Home');
  expect(homeElement).toBeInTheDocument();
});
