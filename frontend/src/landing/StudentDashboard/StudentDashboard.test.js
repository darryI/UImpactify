import React from 'react';
import { render, wait } from '@testing-library/react';

import StudentDashboard, {API} from './StudentDashboard.js';
import jsonCourses from 'courses/courses.json';
import { StaticRouter } from 'react-router-dom'

const setup = () => {
  jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => '{"accessToken":"yo"}');
  const utils = render(
    // need to wrap the StudentDashboard component with a static router to 
    // simulate the Router information for the real app
    // This is needed because we use <Link/> tags inside <StudentDashboard /> 
    //                                            in <DashboardCrouseCard> in <LearnMoreButton />

    // ref: https://reactrouter.com/web/guides/testing
    <StaticRouter>
        <StudentDashboard />
    </StaticRouter>
    
  );
    
  return {
    ...utils,
  }
};

test('on startup, api call is made to get courses with this signed-in student', async () => {
  const getFunc = jest.spyOn(API, 'getCourses').mockImplementationOnce(() => {
    return Promise.resolve(jsonCourses);
  })
  
  const { container } = setup();

  await wait (() => expect(getFunc).toHaveBeenCalledTimes(1));

  // check that all the cards in the test data are rendered
  const dashboardCourseCards = container.querySelectorAll('.dashboard-course-card');
  expect(dashboardCourseCards.length).toBe(jsonCourses.length);
});
