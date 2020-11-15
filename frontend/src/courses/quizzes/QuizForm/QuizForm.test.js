import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';

import QuizForm, {API} from './QuizForm.js';
import jsonQuizzes from '../quizzes.json';

const setup = (isNewQuiz) => {

  const setValues = jest.fn((values) => {});
  const setShowForm = jest.fn((show) => {});
  const addQuiz = jest.fn((values) => {});
  const updateQuiz = jest.fn((values) => {});

  const newQuiz = {
    "id": 27,
    "name": "new quiz",
    "quizQuestions": [],
    "published": true,
    "courseId": 1
  }


  const utils = render(
    <QuizForm
      values={newQuiz}
      setValues={setValues}
      setShowForm={setShowForm}
      addQuiz={addQuiz}
      updateQuiz={updateQuiz}
      isNewQuiz={isNewQuiz}
    />
  );

  // mocking implementation of the setValues (setState) function
  // allows us to update props and force the component to rerender as it
  // normaling would when a user interacts with this component
  setValues.mockImplementation((values) => {
    // rerender the component with the values passed into the function
    utils.rerender(
      <QuizForm
      values={values}
      setValues={setValues}
      setShowForm={setShowForm}
      addQuiz={addQuiz}
      updateQuiz={updateQuiz}
      isNewQuiz={isNewQuiz}
    />
    )
  });

  const newQuestion = utils.getByLabelText('new-question');
  
    
  return {
    ...utils,
    newQuestion,
  }
};

test('new question button creates a new question', async () => {  
  const { container, newQuestion } = setup(true);

  let questions = container.querySelectorAll('.mult-question');
  // new quiz starts with zero questions
  expect(questions.length).toBe(0);

  fireEvent.click(newQuestion);

  questions = container.querySelectorAll('.mult-question');
  // clicking the newQuestion button creates a new question (there is now one rendered to the page)
  expect(questions.length).toBe(1);
});

