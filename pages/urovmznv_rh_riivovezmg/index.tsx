import axios from 'axios';
import React from 'react';

//center a image
const Square = () => {
  const [input, setInput] = React.useState('');
  const [answerSuccess, setAnswerSuccess] = React.useState<boolean>();

  const checkGuess = async () => {
    const response = await axios.post<{
      correct: boolean;
      link: string;
    }>('/api/check-answer-2', {
      guess: input.toLowerCase(),
    });

    if (response.data.link) document.location.href = response.data.link;
    setAnswerSuccess(response.data.correct);
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 text-white  ">
      <div className="flex justify-center items-center h-full">
        <div>
          <img src="/urovmznv_rh_riivovezmg.png" alt="some image" />
          <div className="w-fit mx-auto pb-5">
            <p className={answerSuccess ? 'text-green-500' : 'text-red-500 '}>
              {answerSuccess
                ? 'This answer is right'
                : answerSuccess == undefined
                ? ''
                : 'Something is wrong here 🤔'}
            </p>
          </div>
          <input
            placeholder="Name"
            value={input}
            className="mx-auto text-sm rounded block w-40 lg:w-60 h-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            onInput={(e) => {
              setInput((e.target as HTMLTextAreaElement).value);
            }}
          />
          <div className="mx-auto w-fit pt-10">
            <button
              onClick={() => {
                checkGuess();
              }}
              type="submit"
              className="h-10 mx-auto text-white font-medium rounded-lg text-sm w-28 px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Square;
