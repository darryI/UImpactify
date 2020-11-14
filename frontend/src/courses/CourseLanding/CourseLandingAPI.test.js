import React from 'react';
import { Router, Route, useParams, StaticRouter } from 'react-router-dom';
import {createMemoryHistory, MemoryRouter} from 'history';
import jsonCourses from '../courses.json';
import { render, waitForElement, fireEvent, wait } from '@testing-library/react';
import CourseLandingAPI, {API} from './CourseLandingAPI.js';

const setup = () =>{

    // const history = createMemoryHistory();
    // const pushSpy = jest.spyOn(history, 'push');
    let id = '0'
    const accessToken = '1234';

    const utils = render(
        <CourseLandingAPI id={id}/>
    );

    return {
        ...utils,
        // pushSpy,
        id,
        accessToken
    }
}

test('when course landing page opens API call needs to be made', async () => {
    // useParams: () => ({
    //     id: 590
    //   })

    // jest.mock('react-router-dom', () => ({
    //     ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    //     useParams: () => ({
    //       courseId: '1'
    //     }),
    //     useRouteMatch: () => ({ url: '/courses/courseId/' }),
    //   }));

    const getFunc = jest.spyOn(API, 'getCourses').mockImplementationOnce(() => {
      return Promise.resolve(jsonCourses);
    })

    const { container, pushSpy } = setup();
    // await wait (() => expect(getFunc).toHaveBeenCalledTimes(1));
    await waitForElement(() => container.querySelectorAll('.courseLanding'))
    const courseLandingInfo = container.querySelectorAll('.courseLanding');
    expect(courseLandingInfo.length).toBe(3);
    expect(getFunc).toHaveBeenCalled();
    // const alertFunc = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
    //     return;
    //   })

    
    // expect(pushSpy).not.toHaveBeenCalledWith('/login');

});
