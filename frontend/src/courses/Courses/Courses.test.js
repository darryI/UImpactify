import React from 'react';
import { render, waitForElement, wait, screen } from '@testing-library/react';

import Courses, {API} from './Courses.js';
import jsonCourses from '../Courses/courses.json';


const setup = () => {
  const user = {
    name: "Ninja",
  };

  const utils = render(
    <Courses user={user}/>
  );
    
  return {
    ...utils,
  }
};

test('on startup, api call is made to get courses', async () => {
  const { container } = setup();

  const getFunc = jest.spyOn(API, 'getCourses').mockImplementationOnce(() => {
    return Promise.resolve(jsonCourses);
  })
  
  await waitForElement(() => container.querySelectorAll('.course-card'))

  const courseCards = container.querySelectorAll('.course-card');
  
  expect(courseCards.length).toBe(jsonCourses.length);
  // TODO: for some reason jest spy isn't working. I have tried everything. Idk why this doesn't work.
  expect(getFunc).toHaveBeenCalled();
});

