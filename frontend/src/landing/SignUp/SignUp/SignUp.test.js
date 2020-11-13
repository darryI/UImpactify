import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignUp, {API} from './SignUp.js';
import jsonMockUser from './mockUser.json';

const setup = () => {
    const utils = render(
        <SignUp/>
    );

    const submit = utils.getAllByLabelText('submit-button');
    const username = utils.getByLabelText(/Name/);
    // const password = utils.getByLabelText('obj-input');
    // const type = utils.getByLabelText('lrn-input');
    // const phone = utils.getByLabelText('name-input');
    // const email = utils.getByLabelText('creation-form');

    return{
        ...utils,
        submit,
        username
        // password,
        // type,
        // phone,
        // email
    }
};

test('when submit is clicked, API call is made to post the user to the database', async () => {
    const { submit } = setup();
    const getFunc = jest.spyOn(API, 'postSignUp').mockImplementationOnce(() => {
      return Promise.resolve(jsonMockUser);
    })
    const alertFunc = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
        return;
      })
    fireEvent.click(submit[0]);
  
    await wait (() => expect(getFunc).toHaveBeenCalledTimes(1));
  
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