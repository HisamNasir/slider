"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import useSound from "use-sound";

interface MusicCardProps {
  selectedSong: {
    file: File;
    metadata: {
      common?: {
        title?: string;
        artist?: string[];
        picture?: { format: string; data: Buffer }[];
      };
      format?: {
        duration?: number;
      };
    };
  };
}

const MusicCard: React.FC<MusicCardProps> = ({ selectedSong }) => {
  const { common = {}, format = {} } = selectedSong.metadata || {};
  const {
    title = "Unknown Song",
    artist = ["Unknown Artist"],
    picture,
  } = common;

  const artistName = Array.isArray(artist) ? artist.join(", ") : artist;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  ///////////////////////////////////////////////
  const cardStyle = {
    clipPath:
      "polygon(34.9% 0, 100% 0, 100% 100%, 0 100%, 0 22.5%, 34.9% 22.5%)",
  };
  return (
    <div className=" relative h-[489px] w-[314px] tracking-[0.1em] uppercase">
      <div
        className="absolute -z-10 bg-white h-full w-full rounded-3xl "
        style={cardStyle}
      ></div>
      <div id="TopSide" className="flex">
        <div className="">
          <h1 className="text-[22px] h-[110px] w-[110px] flex justify-center items-center text-white">
            Music
          </h1>
        </div>
        <div className="relative h-[110px] w-full max-w-[65%] flex flex-col justify-end">
          <div className="p-4 absolute top-0 right-0">
            <Image
              width={12.18}
              height={15.5}
              src={"/Assets/lockicon.svg"}
              alt={""}
            />
          </div>
          <div className="flex w-full overflow-hidden h-full items-end">
            <div className=" text-[14px] w-full px-2 pb-2 flex flex-col gap-3">
              <h2 className="text-end min-w-max">{title}</h2>
              <h2 className="text-end overflow-hidden font-semibold italic">
                {artistName}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-[5px]">
        <div
          id="PlayPauseandSliderSection"
          className=" relative flex px-6 py-2"
        >
          <p className="text-[14px] flex items-start w-1/3">$25.00 US</p>
          <div className="flex justify-center w-1/3">
            <button className="p-2 absolute" onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPause className="text-[#990000] z-10 w-[17px] h-5" />
              ) : (
                <FaPlay className="text-[#990000] z-10 w-[17px] h-5" />
              )}
            </button>
          </div>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max={format.duration || 100}
            step="1"
            value={audioRef.current ? audioRef.current.currentTime : 0}
            onChange={() => {}}
            className="slider"
          />
        </div>
      </div>
      <h2 className="text-[13px] text-center">GB63913710211241047</h2>
      <div className="flex justify-center items-center">
        <div className="h-[268px] w-[268px] object-cover rounded-2xl bg-slate-400 flex">
          {picture && picture.length > 0 && (
            <Image
              width={290}
              height={290}
              src={`data:${picture[0].format};base64,${picture[0].data.toString(
                "base64"
              )}`}
              alt="Album Cover"
              className="object-cover w-full h-full rounded-2xl"
            />
          )}
        </div>
      </div>
      <audio ref={audioRef} src={URL.createObjectURL(selectedSong.file)} />
    </div>
  );
};

export default MusicCard;
