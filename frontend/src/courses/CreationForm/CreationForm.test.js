import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreationForm, {API} from './CreationForm.js';


const setup = (isNewCourse) => {
  // mock course
  const newCourse = {
    "name": "new course",
    "objective": "create a course",
    "lrnOutcomes": "git gud",
    "instructor": "Mr Beast",
    "published": false,
    "students": []
  };

  // mock user
  const user = {
    "name": "Ninja",
    "id": 123,
  }

  // mocking all the functions that are given as props to the form
  const setValues = jest.fn((values) => {});
  const setShowForm = jest.fn((show) => {});
  const addCourse = jest.fn((values) => {});
  const updateCourse = jest.fn((values) => {});

  const utils = render(
    <CreationForm
      values={newCourse}
      isNewCourse={isNewCourse}
      user={user}
      setValues={setValues}
      setShowForm={setShowForm}
      addCourse={addCourse}
      updateCourse={updateCourse}
    />
  );

  // getLabelText matches off of the aria-label property on input tags
  const publish = utils.getByLabelText('publish-input');
  const objective = utils.getByLabelText('obj-input');
  const lrnOutcomes = utils.getByLabelText('lrn-input');
  const name = utils.getByLabelText('name-input');
  const form = utils.getByLabelText('creation-form');
  const submit = utils.getByLabelText('submit-button');
  
  return {
    publish,
    objective,
    lrnOutcomes,
    name,
    form,
    submit,
    setValues,
    setShowForm,
    ...utils,
  }
}

test('creation form populates correctly', () => {
  const { publish, objective, lrnOutcomes, name } = setup(true);

  expect(publish.checked).toBe(false);
  expect(objective.value).toBe("create a course");
  expect(lrnOutcomes.value).toBe("git gud");
  expect(name.value).toBe("new course");
});

test('submitting a new course should call a post request', () => {
  const { submit, setShowForm } = setup(true);
  const postFunc = jest.spyOn(API, 'postCourse').mockImplementationOnce(() => {
    return Promise.resolve();
  })

  const alertFunc = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
    return;
  })

  fireEvent.click(submit);

  // show form should have been set to false
  expect(setShowForm.mock.calls[0][0]).toBe(false);
  // post function should be called
  expect(postFunc).toHaveBeenCalled();
});

test('submitting a pre-existing course should call a put request', () => {
  const { submit, setShowForm } = setup(false);
  const putFunc = jest.spyOn(API, 'putCourse').mockImplementationOnce(() => {
    return Promise.resolve();
  })

  const alertFunc = jest.spyOn(window, 'alert').mockImplementationOnce(() => {
    return;
  })

  fireEvent.click(submit);

  // show form should have been set to false
  expect(setShowForm.mock.calls[0][0]).toBe(false);
  // put function should be called
  expect(putFunc).toHaveBeenCalled();
});

test('changing input values should update the state', () => {
  const { objective, setValues } = setup(true);

  fireEvent.change(objective, { target: { value: 'new objective' }});

  expect(setValues).toHaveBeenCalled();
});