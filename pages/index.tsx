import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const API_BASE_URL =
  'https://dmx6kfjta2.execute-api.eu-central-1.amazonaws.com/dev';

const getFullAPIURL = (answer: string, guessNumberAlphabetical: string) => {
  const answerOne = localStorage.getItem('answer-one');
  const answerTwo = localStorage.getItem('answer-two');

  return `${API_BASE_URL}/check-question-${guessNumberAlphabetical}?answerOne=${answerOne}&answerTwo=${answerTwo}&answer=${answer}`;
};

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [guessNumber, setGuessNumber] = useState(1);
  const [questionText, setQuestionText] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const pleaseRefreshError = () => {
    setErrorMessage('Please refresh the page or contact and admin!');
  };

  const checkGuess = async () => {
    try {
      if (!inputValue) return setErrorMessage('Please provide an answer!');
      const answer = inputValue.toLowerCase();

      const guessNumberAlphabetical =
        guessNumber === 1
          ? 'one'
          : guessNumber === 2
          ? 'two'
          : guessNumber === 3
          ? 'three'
          : undefined;
      if (!guessNumberAlphabetical) return pleaseRefreshError();
      const { data } = await axios.get(
        getFullAPIURL(answer, guessNumberAlphabetical)
      );

      if (!data.passed) return setErrorMessage('Wrong answer!');

      if (guessNumber === 1) {
        localStorage.setItem('answer-one', answer);
        setGuessNumber(2);
        setQuestionText(data.nextQuestion);
      }
      if (guessNumber === 2) {
        localStorage.setItem('answer-two', answer);
        setGuessNumber(3);
        setQuestionText(data.nextQuestion);
      }

      if (data.url) router.push(data.url);

      setInputValue('');
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (!error.response) return pleaseRefreshError();
        if (error.response.status === 429)
          return setErrorMessage('Too many tries! Wait 60 seconds...');
      } else {
        return pleaseRefreshError();
      }
    }
  };
  return (
    <div>
      <Head>
        <title>We stay united</title>
        <meta
          name="description"
          content="Are you sure you're looking in the right place?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex bg-zinc-900 h-screen text-white">
        <div className="m-auto flex flex-col text-center">
          <div className="w-96 my-auto">
            {guessNumber == 1 ? (
              <img
                src="/rcsfirst.png"
                alt="First question picture"
                width={1054}
                height={1054}
              />
            ) : (
              questionText
            )}
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="text-red-700 mx-auto">{errorMessage}</div>
            <input
              placeholder="Type your answer here"
              value={inputValue}
              className="mx-auto  text-sm rounded block w-60 h-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              onInput={(e) => {
                setInputValue((e.target as HTMLTextAreaElement).value);
                setErrorMessage('');
              }}
            />
            <button
              onClick={() => {
                checkGuess();
              }}
              type="submit"
              className=" h-10 mx-auto text-white font-medium rounded-lg text-sm w-28 px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
