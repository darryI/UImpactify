import React from 'react';
import { render, waitForElement, wait, screen } from '@testing-library/react';

import CourseCreation, {API} from './CourseCreation.js';
import jsonCourses from '../courses.json';


const setup = () => {
  const user = {
    name: "Ninja",
  };

  const utils = render(
    <CourseCreation user={user}/>
  );
    
  return {
    ...utils,
  }
};

test('on startup, api call is made to get courses', async () => {
  const getFunc = jest.spyOn(API, 'getCourses').mockImplementationOnce(() => {
    return Promise.resolve(jsonCourses);
  })
  
  const { container } = setup();

  await waitForElement(() => container.querySelectorAll('.course-card'))

  const courseCards = container.querySelectorAll('.course-card');
  
  expect(courseCards.length).toBe(jsonCourses.length);
  expect(getFunc).toHaveBeenCalled();
});

