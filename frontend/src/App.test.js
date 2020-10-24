import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders landing page and navigation', () => {
  const { getAllByText } = render(<App/>);
  const homeElements = getAllByText(/Home/);
  const loginElements = getAllByText(/Login/);
  const aboutElements = getAllByText(/About/);
  homeElements.forEach(e => {
    expect(e).toBeInTheDocument();
  });
  aboutElements.forEach(e => {
    expect(e).toBeInTheDocument();
  });
  loginElements.forEach(e => {
    expect(e).toBeInTheDocument();
  });
});
