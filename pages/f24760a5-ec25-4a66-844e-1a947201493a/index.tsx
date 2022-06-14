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
        <div className="m-auto grid grid-rows-2 text-center">
          <div className="w-80 my-auto">
            <Image
              src="/rcs-second-part.png"
              alt="Second question picture"
              width={1054}
              height={1054}
            />
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <ReactAudioPlayer
              src="ChaosNoiseFinal.mp3"
              autoPlay={true}
              controls={true}
              loop={true}
              volume={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
