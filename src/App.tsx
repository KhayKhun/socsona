import React from "react";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { useQuiz } from "./hooks/useQuiz";

import clickMusic from "/click.mp3";

const App: React.FC = () => {
  const {
    isStarted,
    isFinished,
    finalCode,
    questionIndex,
    isAnswered,
    showAnswer,
    hideAnswerButtons,
    currentAnswerIndex,
    currentDialog,
    handleStart,
    handleAnswerSelected,
    userAnswered,
    nextQuestion,
    handleRestart,
    setShowAnswer,
  } = useQuiz();

  function playClickSound() {
    new Audio(clickMusic).play();
  }

  // 1) If quiz not started and no final code
  if (!isStarted && !isFinished) {
    return <StartScreen onStart={handleStart} onPlayClickSound={playClickSound} />;
  }

  // 2) If quiz is finished and we have final code
  if (isFinished && finalCode) {
    return (
      <ResultScreen
        finalCode={finalCode}
        onRestart={handleRestart}
        onPlayClickSound={playClickSound}
      />
    );
  }

  // 3) Otherwise, we are in the quiz
  return (
    <QuizScreen
      questionIndex={questionIndex}
      isAnswered={isAnswered}
      showAnswer={showAnswer}
      hideAnswerButtons={hideAnswerButtons}
      currentAnswerIndex={currentAnswerIndex}
      currentDialog={currentDialog}
      onAnswerSelected={handleAnswerSelected}
      onUserAnswered={userAnswered}
      onNextQuestion={nextQuestion}
      onPlayClickSound={playClickSound}
      setShowAnswer={setShowAnswer}
    />
  );
};

export default App;
