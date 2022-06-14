import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ReactAudioPlayer from 'react-audio-player';

const SecondPart: NextPage = () => {
  return (
    <div>
      <Head>
        <title>United in Chaos</title>
        <meta name="description" content="You're very close" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex bg-zinc-900 h-screen text-white">
        <div className="m-auto flex flex-col text-center">
          <Image
            src="/rcs-second-part.png"
            alt="Second question picture"
            width={1159}
            height={676}
          />
          <ReactAudioPlayer
            src="ChaosNoiseFinal.mp3"
            autoPlay={true}
            controls={true}
            loop={true}
            volume={0.1}
            className="mb-auto pt-20"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
