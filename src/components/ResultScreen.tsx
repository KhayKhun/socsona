import React from "react";
import { resultImages } from "../data/images";

interface ResultScreenProps {
  finalCode: string;
  onRestart: () => void;
  onPlayClickSound: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  finalCode,
  onRestart,
  onPlayClickSound,
}) => {
  const resultImage = resultImages[finalCode];

  function handleDownload() {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `personality-${finalCode}.png`;
    link.click();
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen bg-[url('/underwater.png')] bg-cover bg-center p-4 font-pressStart">
      {resultImage && (
        <img
          src={resultImage}
          alt={finalCode}
          className="max-h-[80vh] w-auto border border-gray-300 rounded shadow-md"
        />
      )}

      <div className="flex flex-col items-center mt-4 gap-3">
        <button
          onClick={handleDownload}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded text-xs md:text-sm"
        >
          Download Image
        </button>

        <button
          onClick={() => {
            onRestart();
            onPlayClickSound();
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-xs md:text-sm"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};
