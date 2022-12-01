import React, { ChangeEvent, FC, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type ChangedText = (e: ChangeEvent<HTMLInputElement>) => void;

const URL = 'http://localhost:8000/api/quizzes/';

const New: FC = () => {
  const [commentary, setCommentary] = useState<string>('');

  const onCommentaryChanged: ChangedText = (e) => {
    setCommentary(e.target.value);
  };

  const onResisterClicked = (): void => {
    console.log(commentary);

    const options: AxiosRequestConfig = {
      url: URL,
      method: 'POST',
      data: { commentary: commentary },
    };

    axios(options)
      .then((response: AxiosResponse) => {
        console.log(response);
      })

      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>New Quiz</div>
      <label>解説</label>
      <input type="text" value={commentary} onChange={onCommentaryChanged} />
      <button type="button" onClick={onResisterClicked}>
        登録
      </button>
    </>
  );
};

export default New;
