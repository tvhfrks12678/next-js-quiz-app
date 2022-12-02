import { useState, useEffect, FC } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type Quiz = {
  id: number;
  commentary: string;
};

const URL = 'http://localhost:8000/api/quizzes/';

const Index: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    getQuizzesByUser();
  }, []);

  const getQuizzesByUser = () => {
    axios
      .get(URL)
      .then(function (response: AxiosResponse<Quiz[]>) {
        console.log(response);
        const quizzes: Quiz[] = response.data;
        setQuizzes(quizzes);
      })
      .catch(function (error: AxiosError) {
        console.log(error);
      });
  };

  const onDeleteClicked = (id: number): void => {
    console.log('削除');
    axios
      .delete(`${URL}${id}`)
      .then((response) => {
        console.log(response);
        getQuizzesByUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>Quiz Index</div>
      {quizzes.map<JSX.Element>((quiz: Quiz) => {
        return (
          <div key={quiz.id}>
            {quiz.commentary}
            <button onClick={() => onDeleteClicked(quiz.id)}>削除</button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
