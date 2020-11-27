import React from 'react';
// import mockUser from './mockUsers.json';
import { render, waitForElement, wait, fireEvent, getByLabelText } from '@testing-library/react';
import CourseEndorseButton, {API} from './CourseEndorseButton.js';

const setup = () =>{

    let id = '0'
 
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => '{"accessToken":"yo"}');
   
    const utils = render(
        <CourseEndorseButton id={id}/>
    );

    //const submit = utils.getByLabelText('endorse-button');


    return {
        ...utils,
        id
    }
}

test('when course landing page opens API call needs to be made to get user and when button clicked endorse API should work',
 async () => {
    const mockUser = {
        "name": "ymart1n",
        "email": "1231293@ww.com",
        "phone": "1234567980",
        "roles": {
            "admin": false,
            "instructor": false,
            "organization": true,
            "student": true
        }
    };

    const course = {
        "courseId" : "5f9f89d2c6370973b4f32222"
      };

      const endorserIDs = {
        "ids" : ["org1", "org2", "org3", "ymart1n"]

      };

    const getFunc = jest.spyOn(API, 'getUser').mockImplementationOnce(() => {
      return Promise.resolve(mockUser);
    })
    const { getByText, container } = setup();
    await wait(() => expect(getFunc).toHaveBeenCalled());
    const endorse = getByText("Would you like to endorse this course?");
    expect(endorse).toBeInTheDocument();
    const button = getByText("Endorse");
    expect(button).toBeInTheDocument();

    // const getFunc2 = jest.spyOn(API, 'getCourseEndorsers').mockImplementationOnce(() => {
    //     return Promise.resolve(course);
    // })
    // await wait (() => expect(getFunc2).toHaveBeenCalled());


    const getFunc3 = jest.spyOn(API, 'endorseCourse').mockImplementationOnce(() => {
        return Promise.resolve(course);
    })
    const endorseButton = getByText("Endorse");
    fireEvent.click(endorseButton);
    // await waitForElement(() => container.querySelectorAll('.courseEndorsers'))
    // const courseEndorsers = container.querySelectorAll('.courseEndorsers');
    // expect(courseEndorsers.length).toBe(1);


    await wait (() => expect(getFunc3).toHaveBeenCalled());

});

test('when course landing page opens API call needs to be made to get user and when button clicked endorse API should work',
 async () => {
    const mockUser = {
        "name": "ymart1n",
        "email": "1231293@ww.com",
        "phone": "1234567980",
        "roles": {
            "admin": false,
            "instructor": false,
            "organization": true,
            "student": true
        }
    };

    const course = {
        "courseId" : "5f9f89d2c6370973b4f32222"
      };

      const endorserIDs = {
        "ids" : ["org1", "org2", "org3", "ymart1n"]
      };

    const getFunc2 = jest.spyOn(API, 'getCourseEndorsers').mockImplementationOnce(() => {
        return Promise.resolve(course);
    })

    await wait (() => expect(getFunc2).toHaveBeenCalled());
});