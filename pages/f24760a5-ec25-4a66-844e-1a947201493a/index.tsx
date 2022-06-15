import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import useSound from 'use-sound';

const SecondPart: NextPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound('/ChaosNoiseFinal.mp3');
  return (
    <div>
      <Head>
        <title>United in Chaos</title>
        <meta name="description" content="You're very close" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex bg-zinc-900 h-screen text-white">
        <div className="absolute w-screen">
          <div className="float-right">
            <Image
              src={`/${!isPlaying ? 'un' : ''}muted.gif`}
              height={100}
              width={100}
              onClick={() => {
                if (isPlaying) stop();
                else play();
                setIsPlaying(!isPlaying);
              }}
            />
          </div>
        </div>
        <div className="m-auto flex flex-col text-center w-2/3">
          <Image
            src="/rightclickseekfinal.png"
            alt="Second question picture"
            width={1780}
            height={1030}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
