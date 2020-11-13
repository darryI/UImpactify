import React from 'react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';

import { render, fireEvent, wait } from '@testing-library/react';
import SignUp, {API} from './SignUp.js';
import jsonMockUser from './mockUser.json';

const setup = () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    const utils = render(
        <Router history={history}>
            <SignUp />
        </Router>
    );

    const submit = utils.getByLabelText('submit-button');
    const username = utils.getByLabelText(/Name/);
    // const password = utils.getByLabelText('obj-input');
    // const type = utils.getByLabelText('lrn-input');
    // const phone = utils.getByLabelText('name-input');
    // const email = utils.getByLabelText('creation-form');

    return{
        submit,
        username,
        pushSpy,
        ...utils
        // password,
        // type,
        // phone,
        // email
    }
};


test('when submit is clicked, API call is made to post the user to the database', async () => {
    const getFunc = jest.spyOn(API, 'postSignUp').mockImplementationOnce(() => {
      return Promise.resolve();
    })

    const { submit, pushSpy } = setup();
    const alertFunc = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
        return;
      })
    fireEvent.click(submit);

    await wait (() => expect(getFunc).toHaveBeenCalled());
    expect(pushSpy).toHaveBeenCalledWith('/login');

  
    // // check that all the cards in the test data are rendered
    // const user = container.querySelectorAll('.course-card');
    // expect(user.length).toBe(jsonMockUser.length);
});



// test('clicking yes on popup makes delete user API call', async () => {
//   const getFunc = jest.spyOn(API, 'deleteUser').mockImplementationOnce(() => {
//     return Promise.resolve();
//   })

//   const { getByText, setAccessToken } = setup();
//   const deleteButton = getByText("Delete Account");
//   fireEvent.click(deleteButton);
//   const yesButton = getByText("Yes");
//   fireEvent.click(yesButton);

//   await wait (() => expect(getFunc).toHaveBeenCalled());
//   expect(setAccessToken).toHaveBeenCalled();
// });