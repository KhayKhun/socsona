import { useEffect, useState } from "react";
import { dialogs } from "../data/dialogs";
import { getGroupCode } from "../utils/quizUtils";
import type { TraitKey } from "../data/dialogs";

export function useQuiz() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalCode, setFinalCode] = useState("");

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

  // If localStorage has a saved code, we can skip the quiz and show that result.
  useEffect(() => {
    const savedCode = localStorage.getItem("myQuizCode");
    if (savedCode) {
      setFinalCode(savedCode);
      setIsFinished(true);
    }
  }, []);

  // Once we reach the finished screen, figure out code and store in localStorage
  useEffect(() => {
    if (isFinished && !finalCode) {
      const code = getGroupCode(scores);
      setFinalCode(code);
      localStorage.setItem("myQuizCode", code);
    }
  }, [isFinished, finalCode, scores]);

  function handleStart() {
    setIsStarted(true);
  }

  // Called when user selects an answer
  function handleAnswerSelected(answerIndex: number) {
    const chosen = dialogs[questionIndex].answers[answerIndex];

    const newScores = { ...scores };
    for (const [trait, val] of Object.entries(chosen.scores)) {
      if (val && trait in newScores) {
        newScores[trait as TraitKey] += val;
      }
    }
    setScores(newScores);

    setCurrentAnswerIndex(answerIndex);
    setHideAnswerButtons(true);
  }

  function userAnswered() {
    setTimeout(() => {
      setIsAnswered(true);
    }, 200);
  }

  function nextQuestion() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= dialogs.length) {
      alert("Now I know your personality. Ready to see?");
      setIsFinished(true);
    } else {
      setTimeout(() => {
        setIsAnswered(false);
        setHideAnswerButtons(false);
        setCurrentAnswerIndex(null);
        setShowAnswer(false);
        setQuestionIndex(nextIndex);
      }, 1000);
    }
  }

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

  return {
    // states
    isStarted,
    isFinished,
    finalCode,
    questionIndex,
    isAnswered,
    showAnswer,
    hideAnswerButtons,
    currentAnswerIndex,
    scores,

    // data
    dialogs,
    currentDialog: dialogs[questionIndex],

    // methods
    handleStart,
    handleAnswerSelected,
    userAnswered,
    nextQuestion,
    handleRestart,
    setShowAnswer,
  };
}
