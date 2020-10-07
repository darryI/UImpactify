import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders home page', () => {
  const { getByText } = render(<Home/>);
  const homeElement = getByText(/Home/);
  expect(homeElement).toBeInTheDocument();
});
