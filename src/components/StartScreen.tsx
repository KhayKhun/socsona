import React from "react";
import Btn from "/guru-btn.png";

interface StartScreenProps {
  onStart: () => void;
  onPlayClickSound: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onPlayClickSound,
}) => {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-[url('/underwater.png')] bg-cover bg-center font-pressStart text-xs md:text-base">
      <div className="flex justify-center items-center px-4 py-4 sm:py-6 fixed top-0 left-0 w-screen text-[8px] md:text-sm bg-yellow-500">
        <span>Alert: Very chill music might appear</span>
      </div>

      <div className="relative flex flex-col items-center justify-center p-4 text-center">
        <p>Welcome to Socsona.</p>
        <p>In here, we can tell about you by knowing how you use social media.</p>
        <p>Wanna find out?</p>

        <button
          onClick={() => {
            onStart();
            onPlayClickSound();
          }}
          className="relative mt-6 inline-flex items-center justify-center"
        >
          <img src={Btn} alt="Let's Go" className="w-[150px]" />
          <span className="absolute text-xs md:text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            Let's go
          </span>
        </button>
      </div>
    </div>
  );
};
