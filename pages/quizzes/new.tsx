import React, { ChangeEvent, FC, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type ChangedText = (e: ChangeEvent<HTMLInputElement>) => void;
type Choice = { content: string; rhyme: string };
type Quiz = { commentary: string; choices: Choice[] };

const URL = 'http://localhost:8000/api/quizzes/';

const INICIAL_CHOICE_NUMBER = 3;

const New: FC = () => {
  const initialQuizSet = (): Quiz => {
    const initialChoice: Choice = { content: '', rhyme: '' };
    const initialChoices: Choice[] = [...Array(INICIAL_CHOICE_NUMBER)].map(
      () => initialChoice
    );
    return { commentary: '', choices: initialChoices };
  };

  const [quiz, setQuiz] = useState<Quiz>(initialQuizSet);

  const onQuizCommentaryChanged: ChangedText = (e) => {
    setQuiz({ ...quiz, commentary: e.target.value });
  };

  const onResisterClicked = (): void => {
    console.log(quiz);

    const options: AxiosRequestConfig = {
      url: URL,
      method: 'POST',
      data: { quiz: quiz },
    };

    axios(options)
      .then((response: AxiosResponse) => {
        console.log(response);
      })

      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const onQuizChoiceChanged = (
    e: ChangeEvent<HTMLInputElement>,
    changedIndex: number
  ): void => {
    const stateChoices = quiz.choices;
    const changedChoices: Choice[] = stateChoices.map(
      (choice: Choice, index: number): Choice => {
        const eventTarget: EventTarget & HTMLInputElement = e.target;
        return changedIndex === index
          ? { ...choice, [eventTarget.name]: eventTarget.value }
          : choice;
      }
    );
    setQuiz({ ...quiz, choices: changedChoices });
  };

  return (
    <>
      <div>New Quiz</div>
      <label>解説</label>
      <input
        type="text"
        name="commentary"
        value={quiz.commentary}
        onChange={onQuizCommentaryChanged}
      />
      {quiz.choices.map((choice: Choice, index: number) => {
        return (
          <div key={index}>
            <label>選択肢</label>
            <input
              type="text"
              name="content"
              value={quiz.choices[index].content}
              onChange={(e) => onQuizChoiceChanged(e, index)}
            />
            <label>母音</label>
            <input
              type="text"
              name="rhyme"
              value={quiz.choices[index].rhyme}
              onChange={(e) => onQuizChoiceChanged(e, index)}
            />
          </div>
        );
      })}

      <button type="button" onClick={onResisterClicked}>
        登録
      </button>
    </>
  );
};

export default New;
