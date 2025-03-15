import { TypeAnimation } from "react-type-animation";
import MessageCard from "./MessageCard.tsx";
import { Dialog } from "../data/dialogs";

interface QuizScreenProps {
  questionIndex: number;
  isAnswered: boolean;
  showAnswer: boolean;
  hideAnswerButtons: boolean;
  currentAnswerIndex: number | null;
  currentDialog: Dialog;
  onAnswerSelected: (idx: number) => void;
  onUserAnswered: () => void;
  onNextQuestion: () => void;
  onPlayClickSound: () => void;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questionIndex,
  isAnswered,
  showAnswer,
  hideAnswerButtons,
  currentAnswerIndex,
  currentDialog,
  onAnswerSelected,
  onUserAnswered,
  onNextQuestion,
  onPlayClickSound,
  setShowAnswer,
}) => {
  const TEXT_SPEED = 60;

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

  function handleUserAnswered() {
    // slight delay
    setTimeout(() => onUserAnswered(), 2000);
  }

  return (
    <div className="relative w-screen h-screen bg-[url('/underwater.png')] bg-cover bg-center font-pressStart overflow-auto">
      <audio src="/background.mp3" autoPlay loop />

      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        {/* We can show a progress or something */}
        <p>{questionIndex <= 0 ? 0 : questionIndex - 1}/7</p>

        <div className="max-w-md w-full bg-white/80 p-4 rounded-lg shadow-md text-black text-[10px] md:text-sm lg:text-base">
          {/* If user has answered, show guru lines; else show question text */}
          {isAnswered && guruResponseMessages.length > 0 ? (
            <MessageCard speaker="guru">
              <TypeAnimation
                key={`guru-${questionIndex}-${currentAnswerIndex}`}
                sequence={[guruResponseMessages.join("\n"), () => onNextQuestion()]}
                style={{ whiteSpace: "pre-line" }}
                repeat={0}
                speed={TEXT_SPEED}
              />
            </MessageCard>
          ) : (
            <MessageCard speaker="guru">
              <TypeAnimation
                key={`question-${questionIndex}`}
                sequence={[
                  currentDialog.questions,
                  () => setShowAnswer(true), // then show answers
                ]}
                style={{ whiteSpace: "pre-line" }}
                repeat={0}
                speed={TEXT_SPEED}
              />
            </MessageCard>
          )}

          {/* Answer buttons */}
          {showAnswer && !hideAnswerButtons && (
            <div className="mt-4 flex flex-col gap-2">
              {currentDialog.answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onPlayClickSound();
                    onAnswerSelected(idx);
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded py-2 px-4 text-[10px] md:text-sm lg:text-base text-left"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          )}

          {/* User's lines (once they've selected an answer) */}
          {currentAnswerIndex !== null && !isAnswered && (
            <MessageCard speaker="user">
              <TypeAnimation
                key={`answer-${questionIndex}-${currentAnswerIndex}`}
                sequence={[userResponseMessages.join("\n"), () => handleUserAnswered()]}
                style={{ whiteSpace: "pre-line" }}
                repeat={0}
                speed={TEXT_SPEED}
              />
            </MessageCard>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center px-4 py-2 sm:py-4 fixed top-0 left-0 w-screen text-[8px] md:text-sm bg-yellow-500">
        <a href="https://github.com/KhayKhun/socsona" target="_blank" className="flex items-center gap-2 text-[8px] md:text-[10px]"><img src="/github.svg" className="h-auto w-[15px] md:w-[30px]" /> https://github.com/KhayKhun/socsona</a>
      </div>
    </div>
  );
};
