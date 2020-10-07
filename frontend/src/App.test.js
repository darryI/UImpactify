import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders landing page and navigation', () => {
  const { getAllByText } = render(<App/>);
  const homeElements = getAllByText(/Home/);
  const aboutElments = getAllByText(/About/);
  homeElements.forEach(e => {
    expect(e).toBeInTheDocument();
  });
  aboutElments.forEach(e => {
    expect(e).toBeInTheDocument();
  });
});
