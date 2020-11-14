import React from 'react';
import jsonCourses from '../courses.json';
import { render, waitForElement } from '@testing-library/react';
import CourseLandingAPI, {API} from './CourseLandingAPI.js';

const setup = () =>{

    let id = '0'
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => '{"accessToken":"yo"}');
   
    const utils = render(
        <CourseLandingAPI id={id}/>
    );

    return {
        ...utils,
        id
    }
}

test('when course landing page opens API call needs to be made', async () => {
    const getFunc = jest.spyOn(API, 'getCourses').mockImplementationOnce(() => {
      return Promise.resolve(jsonCourses[0]);
    })

    const { container, pushSpy } = setup();
    await waitForElement(() => container.querySelectorAll('.courseLanding'))
    const courseLandingInfo = container.querySelectorAll('.courseLanding');
    expect(courseLandingInfo.length).toBe(3);
    expect(getFunc).toHaveBeenCalled();
});
