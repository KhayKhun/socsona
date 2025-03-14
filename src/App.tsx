import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { dialogs, TraitKey } from "./dialogs";
import Messagecard from "./components/Messagecard";
import clickMusic from "/click.mp3";
import Btn from "/guru-btn.png";

import img1 from "/IMG/1.png";
import img2 from "/IMG/2.png";
import img3 from "/IMG/3.png";
import img4 from "/IMG/4.png";
import img5 from "/IMG/5.png";
import img6 from "/IMG/6.png";
import img7 from "/IMG/7.png";
import img8 from "/IMG/8.png";
import img9 from "/IMG/9.png";
import img10 from "/IMG/10.png";
import img11 from "/IMG/11.png";
import img12 from "/IMG/12.png";
import img13 from "/IMG/13.png";
import img14 from "/IMG/14.png";
import img15 from "/IMG/15.png";
import img16 from "/IMG/16.png";
import img17 from "/IMG/17.png";
import img18 from "/IMG/18.png";

const resultImages: Record<string, string> = {
  COP: img1,
  COV: img2,
  CDP: img3,
  CDV: img4,
  CSP: img5,
  CSV: img6,
  EOP: img7,
  EOV: img8,
  EDP: img9,
  EDV: img10,
  ESP: img11,
  ESV: img12,
  LOP: img13,
  LOV: img14,
  LDP: img15,
  LDV: img16,
  LSP: img17,
  LSV: img18,
};

const TEXT_SPEED = 30;

function pickCel(scores: { C: number; E: number; L: number }): string {
  const { C, E, L } = scores;
  if (C >= E && C >= L) return "C";
  if (E >= C && E >= L) return "E";
  return "L";
}

function pickOds(scores: { O: number; D: number; S: number }): string {
  const { O, D, S } = scores;
  if (O >= D && O >= S) return "O";
  if (D >= O && D >= S) return "D";
  return "S";
}

function pickPv(scores: { P: number; V: number }): string {
  const { P, V } = scores;
  return P >= V ? "P" : "V";
}

function getGroupCode(allScores: Record<TraitKey, number>): string {
  const first = pickCel({ C: allScores.C, E: allScores.E, L: allScores.L });
  const second = pickOds({ O: allScores.O, D: allScores.D, S: allScores.S });
  const third = pickPv({ P: allScores.P, V: allScores.V });
  return first + second + third;
}

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [finalCode, setFinalCode] = useState<string>("");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hideAnswerButtons, setHideAnswerButtons] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<null | number>(
    null
  );

  const [scores, setScores] = useState<Record<TraitKey, number>>({
    C: 0,
    E: 0,
    L: 0,
    O: 0,
    D: 0,
    S: 0,
    P: 0,
    V: 0,
  });

  useEffect(() => {
    const savedCode = localStorage.getItem("myQuizCode");
    if (savedCode) {
      setFinalCode(savedCode);
      setIsFinished(true);
    }
  }, []);

  function Play() {
    new Audio(clickMusic).play();
  }

  const currentDialog = dialogs[questionIndex];
  const userResponseMessages =
    currentAnswerIndex !== null
      ? [
          currentDialog.answers[currentAnswerIndex].text,
          ...currentDialog.answers[currentAnswerIndex].answerFollowUp,
        ]
      : [];
  const guruResponseMessages =
    currentAnswerIndex !== null
      ? currentDialog.answers[currentAnswerIndex].responseFollowUp
      : [];

  function userAnswered() {
    setTimeout(() => {
      setIsAnswered(true);
    }, 2000);
  }

  function nextQuestion() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= dialogs.length) {
      alert("Now I know your personality. Ready to see?");
      setIsFinished(true);
    } else {
      setTimeout(() => {
        setQuestionIndex(nextIndex);
        setIsAnswered(false);
        setHideAnswerButtons(false);
        setCurrentAnswerIndex(null);
        setShowAnswer(false);
      }, 2000);
    }
  }

  useEffect(() => {
    if (isFinished && !finalCode) {
      const code = getGroupCode(scores);
      setFinalCode(code);
      localStorage.setItem("myQuizCode", code);
    }
  }, [isFinished, finalCode, scores]);

  function handleRestart() {
    localStorage.removeItem("myQuizCode");
    setIsStarted(false);
    setIsFinished(false);
    setFinalCode("");
    setQuestionIndex(0);
    setIsAnswered(false);
    setShowAnswer(false);
    setHideAnswerButtons(false);
    setCurrentAnswerIndex(null);
    setScores({
      C: 0,
      E: 0,
      L: 0,
      O: 0,
      D: 0,
      S: 0,
      P: 0,
      V: 0,
    });
  }

  // ---------------------------------
  // 1) START SCREEN
  // ---------------------------------
  if (!isStarted && !isFinished) {
    return (
      <>
        <div className="relative flex items-center justify-center h-screen w-screen bg-[url('/underwater.png')] bg-cover bg-center font-pressStart text-xs md:text-base">
        <div className="flex justify-center items-center px-4 py-4 sm:py-6 fixed top-0 left-0 w-screen text-[8px] md:text-sm bg-yellow-500">
          <span>Alert: Very chill music might appear</span>
        </div>
          <div className="relative flex flex-col items-center justify-center p-4 text-center">
            <p>Welcome to Socsona.</p>
            <p>
              In here, we can tell about you by knowing how you use social
              media.
            </p>
            <p>Wanna find out?</p>

            <button
              onClick={() => {
                setIsStarted(true);
                Play();
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
      </>
    );
  }

  // ---------------------------------
  // 2) FINISHED / RESULT SCREEN
  // ---------------------------------
  if (isFinished && finalCode) {
    const resultImage = resultImages[finalCode] || img18;

    // Function for user to download the result image
    function handleDownload() {
      const link = document.createElement("a");
      link.href = resultImage; // use the data or file path
      link.download = `personality-${finalCode}.png`;
      link.click();
    }

    return (
      <>
        <audio src="/background.mp3" autoPlay loop />

        <div className="relative flex flex-col items-center justify-center h-screen w-screen bg-[url('/underwater.png')] bg-cover bg-center p-4 font-pressStart">
          <img
            src={resultImage}
            alt={finalCode}
            className="max-h-[80vh] w-auto border border-gray-300 rounded shadow-md"
          />

          <div className="flex flex-col items-center mt-4 gap-3">
            <button
              onClick={handleDownload}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded text-xs md:text-sm"
            >
              Download Image
            </button>

            <button
              onClick={() => {
                handleRestart();
                Play();
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-xs md:text-sm"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  // ---------------------------------
  // 3) QUIZ SCREEN
  // ---------------------------------
  return (
    <>
      <audio src="/background.mp3" autoPlay loop />

      <div className="relative w-screen h-screen bg-[url('/underwater.png')] bg-cover bg-center font-pressStart overflow-auto">
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <div className="mb-8 flex justify-center">
          </div>

          <div className="max-w-md w-full bg-white/80 p-4 rounded-lg shadow-md text-black text-[10px] md:text-sm lg:text-base">
            {isAnswered && guruResponseMessages.length > 0 ? (
              <Messagecard speaker="guru">
                <TypeAnimation
                  key={`guru-${questionIndex}-${currentAnswerIndex}`}
                  sequence={[
                    guruResponseMessages.join("\n"),
                    () => nextQuestion(),
                  ]}
                  style={{ whiteSpace: "pre-line" }}
                  repeat={0}
                  speed={TEXT_SPEED}
                />
              </Messagecard>
            ) : (
              <Messagecard speaker="guru">
                <TypeAnimation
                  key={`question-${questionIndex}`}
                  sequence={[
                    currentDialog.questions,
                    () => setShowAnswer(true),
                  ]}
                  style={{ whiteSpace: "pre-line" }}
                  repeat={0}
                  speed={TEXT_SPEED}
                />
              </Messagecard>
            )}

            {showAnswer && !hideAnswerButtons && (
              <div className="mt-4 flex flex-col gap-2">
                {currentDialog.answers.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      Play();
                      const chosen = currentDialog.answers[idx];
                      const newScores = { ...scores };
                      Object.entries(chosen.scores).forEach(([trait, val]) => {
                        if (val) {
                          newScores[trait as TraitKey] += val;
                        }
                      });
                      setScores(newScores);

                      setCurrentAnswerIndex(idx);
                      setHideAnswerButtons(true);
                    }}
                    className="
                      bg-blue-700 hover:bg-blue-800
                      text-white
                      rounded
                      py-2 px-4
                       text-[10px] md:text-sm lg:text-base
                      text-left
                    "
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            )}

            {currentAnswerIndex !== null && !isAnswered && (
              <Messagecard speaker="user">
                <TypeAnimation
                  key={`answer-${questionIndex}-${currentAnswerIndex}`}
                  sequence={[
                    userResponseMessages.join("\n"),
                    () => userAnswered(),
                  ]}
                  style={{ whiteSpace: "pre-line" }}
                  repeat={0}
                  speed={TEXT_SPEED}
                />
              </Messagecard>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
