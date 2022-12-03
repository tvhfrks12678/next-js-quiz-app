import { useState, useEffect, FC } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';

type Quiz = {
  id: number;
  commentary: string;
};

const URL = 'http://localhost:8000/api/quizzes/';

const Index: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

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

  const onEditClicked = (id: number): void => {
    router.push(`/quizzes/edit/${id}`);
  };

  return (
    <>
      <div>Quiz Index</div>
      {quizzes.map<JSX.Element>((quiz: Quiz) => {
        return (
          <div key={quiz.id}>
            <button onClick={() => onEditClicked(quiz.id)}>編集</button>
            {quiz.commentary}
            <button onClick={() => onDeleteClicked(quiz.id)}>削除</button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
