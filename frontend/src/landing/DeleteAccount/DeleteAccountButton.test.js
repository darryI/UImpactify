import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import DeleteAccountButton, {API} from './DeleteAccountButton';

const setup = () => {
  // mocking all the objects that are given as props to the button
  const accessToken = 'fake-token';
  const setAccessToken = jest.fn((values) => {});

  const utils = render(
    <DeleteAccountButton
      accessToken={accessToken}
      setAccessToken={setAccessToken}
    />
  );
  
  return {
    setAccessToken,
    ...utils
  }
}

test('renders delete button', () => {
  const { getByText } = setup();
  const button = getByText("Delete Account");
  expect(button).toBeInTheDocument();
});

test('clicking button opens popup, clicking no closes popup', () => {
  const { getByText } = setup();
  // clicking delete opens popup
  const deleteButton = getByText("Delete Account");
  fireEvent.click(deleteButton);
  const header = getByText("Are you sure you want to delete your account?")
  expect(header).toBeInTheDocument();
  // clicking no closes popup
  const noButton = getByText("No");
  fireEvent.click(noButton);
  expect(header).not.toBeInTheDocument();
});

test('clicking yes on popup makes delete user API call', async () => {
  const getFunc = jest.spyOn(API, 'deleteUser').mockImplementationOnce(() => {
    return Promise.resolve();
  })

  const { getByText, setAccessToken } = setup();
  const deleteButton = getByText("Delete Account");
  fireEvent.click(deleteButton);
  const yesButton = getByText("Yes");
  fireEvent.click(yesButton);

  await wait (() => expect(getFunc).toHaveBeenCalled());
  expect(setAccessToken).toHaveBeenCalled();
});
