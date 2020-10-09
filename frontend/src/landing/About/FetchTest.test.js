import React from 'react';
import { render } from '@testing-library/react';
import FetchTest, {API} from './FetchTest.js';

test('api call returns post info', async () => {
  const post1 = {'title': 'test 1', 'userId': '15', 'id': '22', 'body':'this is text'};

  var apiFunc = jest.spyOn(API, 'getData').mockImplementationOnce(() => {
    console.log("the post: " + JSON.stringify(post1))
    return Promise.resolve(post1)
  })

  var {findByText} = render(<FetchTest />)
  var postBody = await findByText('this is text')
  expect(postBody).toBeInTheDocument();
})