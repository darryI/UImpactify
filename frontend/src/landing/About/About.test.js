import React from 'react';
import { render } from '@testing-library/react';
import About from './About';

test('renders home page', () => {
  const { getByText } = render(<About/>);
  const homeElement = getByText(/About/);
  expect(homeElement).toBeInTheDocument();
});
