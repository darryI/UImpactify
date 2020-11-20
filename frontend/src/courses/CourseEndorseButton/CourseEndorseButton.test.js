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

    const courseID = {
        "id": "5f9f89d2c6370973b4f32222"
      };

    const getFunc = jest.spyOn(API, 'getUser').mockImplementationOnce(() => {
      return Promise.resolve(mockUser);
    })

    const { getByText } = setup();
    await wait(() => expect(getFunc).toHaveBeenCalled());
    const endorse = getByText("Would you like to endorse this course?");
    expect(endorse).toBeInTheDocument();

    const button = getByText("Endorse");
    expect(button).toBeInTheDocument();

    const getFunc2 = jest.spyOn(API, 'endorseCourse').mockImplementationOnce(() => {
        return Promise.resolve(courseID);
    })

        //   const { getByText } = setup();
      const endorseButton = getByText("Endorse");
      fireEvent.click(endorseButton);
    
      await wait (() => expect(getFunc2).toHaveBeenCalled());
    
});

// test('when endorse course button is clicked, API call will be made to endorse the course', async () => {
//     const requestJSON = {
//         "id": "5f9f89d2c6370973b4f32222"
//       };
//     const getFunc = jest.spyOn(API, 'endorseCourse').mockImplementationOnce(() => {
//         return Promise.resolve(requestJSON);
//       })
      
//       const { getByText } = setup();
//       const endorseButton = getByText("Endorse");
//       fireEvent.click(endorseButton);
    
//       await wait (() => expect(getFunc).toHaveBeenCalled());
// });