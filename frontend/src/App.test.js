import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders landing page and navigation', () => {
  const { getAllByText, getByText } = render(<App/>);
  expect(getByText(/LOGIN/)).toBeInTheDocument();
  expect(getByText(/Home/)).toBeInTheDocument();
});
