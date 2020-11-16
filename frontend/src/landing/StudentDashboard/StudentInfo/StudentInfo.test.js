// import React from 'react';
// import { render, fireEvent, wait } from '@testing-library/react';
// import StudentInfo, {API} from './StudentInfo.js';

// const setup = () => {
//     // const accessToken = 'fake-token';
//     // const setAccessToken = jest.fn((values) => {});

//     const utils = render(
//         <StudentInfo />
//     )

//     return {
//         ...utils,
//     }
// };

// test('on startup, api call is made to get published courses', async () => {
//     // moock user
//     const mockUser = {
//         "name": "ymart1n",
//         "email": "1231293@ww.com",
//         "phone": "1234567980"
//     };

//     const getFunc = jest.spyOn(API, 'getUser').mockImplementationOnce(() => {
//         return Promise.resolve(mockUser);
//     })

//     const { getByText } = setup();

//     await wait (() => expect(getFunc).toHaveBeenCalled());

//     const welcome = getByText("Welcome back!  " + mockUser.name);
//     expect(welcome).toBeInTheDocument();
//     const email = getByText("Email: " + mockUser.email);
//     expect(email).toBeInTheDocument();
//     const phone = getByText("Phone: " + mockUser.phone);
//     expect(phone).toBeInTheDocument();


// });
