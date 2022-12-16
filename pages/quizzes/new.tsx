import React, { ChangeEvent, FC, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type ChangedText = (e: ChangeEvent<HTMLInputElement>) => void;

type Choice = { content: string; rhyme: string };

const URL = 'http://localhost:8000/api/quizzes/';

const INICIAL_CHOICE_NUMBER = 3;

const New: FC = () => {
  const initialChoice: Choice = { content: '', rhyme: '' };
  const initialChoices: Choice[] = [...Array(INICIAL_CHOICE_NUMBER)].map(
    () => initialChoice
  );
  const [commentary, setCommentary] = useState<string>('');
  const [choices, setChoices] = useState<Choice[]>(initialChoices);

  const onCommentaryChanged: ChangedText = (e) => {
    setCommentary(e.target.value);
  };

  const onResisterClicked = (): void => {
    console.log(commentary);
    console.log(choices);

    const options: AxiosRequestConfig = {
      url: URL,
      method: 'POST',
      data: { quiz: { commentary: commentary, choices: choices } },
    };

    axios(options)
      .then((response: AxiosResponse) => {
        console.log(response);
      })

      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const onChoiceChanged = (
    e: ChangeEvent<HTMLInputElement>,
    changedIndex: number
  ): void => {
    const changedChoice: Choice[] = choices.map(
      (choice: Choice, index: number): Choice => {
        const eventTarget: EventTarget & HTMLInputElement = e.target;
        return changedIndex === index
          ? { ...choice, [eventTarget.name]: eventTarget.value }
          : choice;
      }
    );

    setChoices(changedChoice);
  };

  return (
    <>
      <div>New Quiz</div>
      <label>解説</label>
      <input type="text" value={commentary} onChange={onCommentaryChanged} />
      {choices.map((choice: Choice, index: number) => {
        return (
          <div key={index}>
            <label>選択肢</label>
            <input
              type="text"
              name="content"
              value={choices[index].content}
              onChange={(e) => onChoiceChanged(e, index)}
            />
            <label>母音</label>
            <input
              type="text"
              name="rhyme"
              value={choices[index].rhyme}
              onChange={(e) => onChoiceChanged(e, index)}
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
