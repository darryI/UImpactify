import React from 'react';
import { render } from '@testing-library/react';
import Home, {LOC} from './Home';

test('renders home page', () => {

  var apiFunc = jest.spyOn(LOC, 'useQuery').mockImplementationOnce(() => {
    return new URLSearchParams();
  })

  // const { getByText } = render(<Home/>);
  // const homeElement = getByText('Home');
  // expect(homeElement).toBeInTheDocument();

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
