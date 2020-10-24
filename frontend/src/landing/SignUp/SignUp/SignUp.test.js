import React from 'react';
import { render, waitForElement, wait, screen } from '@testing-library/react';
import SignUp, {API} from './SignUp.js';


const setup = (isNewUser) => {
    //mock user
    const newUser = {
        "mail": "sample@gmail.com",
        "name": "sampleUser",
        "password": "password"
    };

    const setEmail = jest.fn((email) => {});
    const setUsername = jest.fn((name) => {});
    const setPassword = jest.fn((password) => {});



}