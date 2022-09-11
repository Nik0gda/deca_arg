import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [success, setSuccess] = useState<boolean[]>([]);
  const [inputValueOne, setInputValueOne] = useState('');
  const [inputValueTwo, setInputValueTwo] = useState('');
  const [inputValueThree, setInputValueThree] = useState('');
  const [inputValueFour, setInputValueFour] = useState('');
  const [inputValueFive, setInputValueFive] = useState('');
  const [inputValueOneLink, setInputValueOneLink] = useState('');
  const [inputValueTwoLink, setInputValueTwoLink] = useState('');
  const [inputValueThreeLink, setInputValueThreeLink] = useState('');
  const [inputValueFourLink, setInputValueFourLink] = useState('');
  const [inputValueFiveLink, setInputValueFiveLink] = useState('');

  const data: [
    string,
    string,
    (value: string) => void,
    string,
    (value: string) => void
  ][] = [
    [
      'q1',
      inputValueOne,
      setInputValueOne,
      inputValueOneLink,
      setInputValueOneLink,
    ],
    [
      'q2',
      inputValueTwo,
      setInputValueTwo,
      inputValueTwoLink,
      setInputValueTwoLink,
    ],
    [
      'q3',
      inputValueThree,
      setInputValueThree,
      inputValueThreeLink,
      setInputValueThreeLink,
    ],
    [
      'q4',
      inputValueFour,
      setInputValueFour,
      inputValueFourLink,
      setInputValueFourLink,
    ],
    [
      'q5',
      inputValueFive,
      setInputValueFive,
      inputValueFiveLink,
      setInputValueFiveLink,
    ],
  ];

  const images = [];
  for (let i = 0; i < 5; i++) {
    const [question, name, setName, link, setLink] = data[i];
    images.push(
      <div key={`${question}-id`}>
        <Image
          src={`/${question}.png`}
          alt={`${question} picture`}
          width={250}
          height={250}
        />
        <p className={success[i] ? 'text-green-500' : 'text-red-500'}>
          {success[i]
            ? 'This answer is right'
            : success[i] == undefined
            ? ''
            : 'Something is wrong here 🤔'}
        </p>
        <input
          placeholder="Name"
          value={name}
          className="mx-auto text-sm rounded block w-40 lg:w-60 h-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          onInput={(e) => {
            setName((e.target as HTMLTextAreaElement).value);
          }}
        />
        <input
          placeholder="Link"
          value={link}
          className="mx-auto text-sm rounded block w-40 lg:w-60 h-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          onInput={(e) => {
            setLink((e.target as HTMLTextAreaElement).value);
          }}
        />
      </div>
    );
  }

  const checkGuess = async () => {
    const answers = [
      [inputValueOne, inputValueOneLink],
      [inputValueTwo, inputValueTwoLink],
      [inputValueThree, inputValueThreeLink],
      [inputValueFour, inputValueFourLink],
      [inputValueFive, inputValueFiveLink],
    ];
    const response = await axios.post<{
      correct: boolean[];
      link: string;
    }>('/api/check-answer', {
      guesses: answers,
    });

    if (response.data.link) document.location.href = response.data.link;
    setSuccess(response.data.correct);
    console.log(response);
  };
  return (
    <div>
      <Head>
        <title>
          ------ RCS Collective Riddle ------ You need to input the link to the
          gallery you found this nft in, as well as creators name
        </title>
        <meta
          name="description"
          content="Are you sure you're looking in the right place?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex bg-zinc-900 h-screen text-white">
        <div className="m-auto flex flex-col text-center">
          <div className="grid grid-cols-5 gap-3">{images.map((x) => x)}</div>
          <div className="grid grid-rows-3 grid-flow-col gap-4 pt-10">
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
