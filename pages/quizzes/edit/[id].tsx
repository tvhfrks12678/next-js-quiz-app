import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect, useState } from 'react';

type Quiz = { commentary: string };

type ChangedText = (e: ChangeEvent<HTMLInputElement>) => void;

const URL = 'http://localhost:8000/api/quizzes/';

const Edit: FC = () => {
  const [commentary, setCommentary] = useState<string>('');
  const router = useRouter();

  const onCommentaryChanged: ChangedText = (e) => {
    setCommentary(e.target.value);
  };

  const onUpdateClicked = (): void => {
    const { id } = router.query;
    console.log(id);
    axios
      .patch(`${URL}${id}`, {
        commentary: commentary,
      })
      .then((response) => {
        console.log(response);
        router.push('/quizzes');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { id } = router.query;

    axios
      .get(`${URL}${id}`)
      .then((response) => {
        console.log(response);
        const quiz: Quiz = response.data;
        setCommentary(quiz.commentary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);

  return (
    <>
      <div>Quizz Edit</div>
      <label>解説</label>
      <input type="text" value={commentary} onChange={onCommentaryChanged} />
      <button type="button" onClick={onUpdateClicked}>
        更新
      </button>
    </>
  );
};

export default Edit;
