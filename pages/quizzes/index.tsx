import { useState, useEffect, FC } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type Quiz = {
  id: number;
  commentary: string;
};

const URL = 'http://localhost:8000/api/quizzes/';

const Index: FC = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  useEffect(() => {
    axios
      .get(URL)
      .then(function (response: AxiosResponse<Quiz[]>) {
        console.log(response);
        const quizList: Quiz[] = response.data;
        setQuizList(quizList);
      })
      .catch(function (error: AxiosError) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>Quiz Index</div>
      {quizList.map<JSX.Element>((quiz: Quiz) => {
        return <div key={quiz.id}>{quiz.commentary}</div>;
      })}
    </>
  );
};

export default Index;
