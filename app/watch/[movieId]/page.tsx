"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  params: { movieId: string };
}

const Watch: NextPage<Props> = ({ params }) => {
  const [isHover, setIsHover] = useState(true);

  const { movieId } = params;
  const router = useRouter();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/movie/${movieId}`, {
        baseURL: process.env.NEXTAUTH_URL,
      });
      return data;
    },
    retry: 1,
  });

  // error handling
  useEffect(() => {
    if (isError) {
      router.replace("/");
      router.refresh();
    }
  }, [router, isError]);

  // Ensure the video URL is properly formatted for direct playback
  const formattedVideoUrl = movie?.videoUrl?.replace("dl=0", "raw=1");

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 duration-700 cursor-pointer ${
          isHover ? "opacity-100" : "opacity-0"
        }`}
      >
        <AiOutlineArrowLeft
          onClick={() => router.replace("/")}
          className="text-white cursor-pointer"
          size={35}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          Watching:
          <span className="font-light ml-2">
            {!isLoading ? (
              movie?.title
            ) : (
              <ImSpinner9 className="inline-flex animate-spin" />
            )}
          </span>
        </p>
      </nav>

      <div className="h-full w-full overflow-hidden">
        {movie && (
          <>
            {!isLoading && formattedVideoUrl ? (
              <video
                width="100%"
                height="100%"
                controls
                src={formattedVideoUrl}
                type="video/mp4"
                className="object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <ImSpinner9 className="text-white animate-spin" size={50} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Watch;
