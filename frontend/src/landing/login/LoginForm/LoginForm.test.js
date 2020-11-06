import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import LoginForm, {API} from './LoginForm.js';
import { createMemoryHistory } from "history";
import {MemoryRouter} from "react-router-dom";

const setup = () => {
  // mock login values
  const loginValues = {
    "email" : "email",
    "password" : "password"
  }

  const accessToken = '1234';

  // mocking all the functions that are given as props to the form
  const setLoginValues = jest.fn((loginInfo) => {});
  const setFailedAuthenticate = jest.fn((auth) => {});
  const setLoggedIn = jest.fn((logged) => {});
  const mockHistoryPush = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));


  // getLabelText matches off of the aria-label property on input tags
/*  const email = utils.getAllByLabelText('email-input');
  const password = utils.getAllByLabelText('password-input');
  const form = utils.getAllByLabelText('login-form');
  const submit = utils.getAllByLabelText('submit-button');*/

  return {
    loginValues,
    setLoginValues,
    setFailedAuthenticate,
    setLoggedIn,
    mockHistoryPush
  }
}

describe('LoginForm', () => {
    it('Redirects to about on submission', async () => {
        const {
            loginValues, setLoginValues, setLoggedIn, mockHistoryPush, setFailedAuthenticate
        } = setup();
        const utils = render (
            <MemoryRouter>
                    <LoginForm
                      loginInfo={loginValues}
                      initialLoginValues={loginValues}
                      setLoginValues={setLoginValues}
                      setFailedAuthenticate={setFailedAuthenticate}
                      setLoggedIn={setLoggedIn}
                    />
                </MemoryRouter>
        );
        const submit = utils.getAllByLabelText('submit-button');
        const setItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
            const postFunc = jest.spyOn(API, 'postLogin').mockImplementationOnce(() => {
                return Promise.resolve({
                       "access_token" : "1234",
                       "logged_in_as" : "user",
                       "refresh_token": "0987"
                });
            });


            fireEvent.click(submit[0]);

            await wait (() => expect(postFunc).toHaveBeenCalledTimes(1));

            // setLoggedin should be true and setFailedAuthenticate should be false
            // localStorage should have been updated
            // We expect a redirect as well so history.push should be called

            expect(setItemSpy).toHaveBeenCalledTimes(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(true);
            expect(setFailedAuthenticate.mock.calls[0][0]).toBe(false);
            //expect(mockHistoryPush).toHaveBeenCalled();
    });
  });



test('changing input values should update the state', () => {
  const { loginValues, setLoginValues, setLoggedIn, mockHistoryPush, setFailedAuthenticate} = setup();
  const utils = render (
              <MemoryRouter>
                      <LoginForm
                        loginInfo={loginValues}
                        initialLoginValues={loginValues}
                        setLoginValues={setLoginValues}
                        setFailedAuthenticate={setFailedAuthenticate}
                        setLoggedIn={setLoggedIn}
                      />
                  </MemoryRouter>
          );
  const email = utils.getByLabelText("email-input");

  fireEvent.change(email, { target: { value: 'email@aemail.com' }});

  expect(setLoginValues).toHaveBeenCalled();
});