"use client";
import Head from "next/head";
import MusicCard from "./ui/MusicCard";
import { useState } from "react";
import * as mm from "music-metadata-browser";

const Home = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const metadata = await mm.parseBlob(file);
      setSelectedSong({ file, metadata });
    } catch (error) {
      console.error("Error reading metadata:", error);
    }
  };

  return (
    <main>
      <div className=" flex flex-col items-center ">
        <input
          className=" m-8 border p-8 text-white rounded-xl"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
        {selectedSong && <MusicCard selectedSong={selectedSong} />}
      </div>
    </main>
  );
};

export default Home;
