import { useState, useEffect } from "react";
import questionsData from "./questions.json";
import { flattenQuestions } from "./utils/questionUtils";
import type { QuestionState } from "./types";
import { Progress } from "./components/Progress";
import { QuestionsList } from "./components/QuestionsList";
import { LandingPage } from "./components/LandingPage";
import { useSpeech } from "./hooks/useSpeech";
import "./App.css";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const questions = flattenQuestions(questionsData);

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [state, setState] = useState<QuestionState>({
    currentQuestion: 0,
    score: 0,
    answeredQuestions: [],
    showTranslation: true,
    showAnswers: false,
    showNavigator: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const { speak } = useSpeech();

  const currentQuestion = questions[state.currentQuestion];

  useEffect(() => {
    // Ensure the landing page is shown when the app first mounts (e.g. on refresh)
    setShowLanding(true);
  }, []);

  if (showLanding) {
    return (
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <LandingPage onStart={() => setShowLanding(false)} />
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <header>
        <h1>
          US Citizenship Test • Question {currentQuestion.number} of{" "}
          {questions.length}
        </h1>
        <div className='header-controls'>
          <div className='question-navigator'>
            <button
              className='navigator-toggle'
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  showNavigator: !prev.showNavigator,
                }))
              }
            >
              📑 Questions List
            </button>
            {state.showNavigator && (
              <QuestionsList
                questionsData={questionsData}
                state={state}
                setState={setState}
                truncateText={truncateText}
              />
            )}
          </div>
          <button
            className='theme-toggle'
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className='content'>
        <div className='main-container'>
          <div className='question-section'>
            <div className='question-container'>
              <div
                className={`question-english ${
                  state.showAnswers ? "show-answers" : ""
                }`}
              >
                <div className='question-content'>
                  <h2>Question {currentQuestion.number}</h2>
                  <div className='question-text'>
                    <p>{currentQuestion.question_en}</p>
                    <button
                      className='speak-button'
                      onClick={() =>
                        speak(currentQuestion.question_en, "en-US")
                      }
                      title='Listen to the question'
                    >
                      🔊
                    </button>
                  </div>
                </div>
                <div className='answers'>
                  <h3>Answers:</h3>
                  <ul>
                    {currentQuestion.answer_en.map((answer, index) => (
                      <li key={index}>{answer}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {state.showTranslation && (
                <div
                  className={`question-turkish ${
                    state.showAnswers ? "show-answers" : ""
                  }`}
                >
                  <div className='question-content'>
                    <h2>Soru {currentQuestion.number}</h2>
                    <div className='question-text'>
                      <p>{currentQuestion.question_tr}</p>
                    </div>
                  </div>
                  <div className='answers'>
                    <h3>Cevaplar:</h3>
                    <ul>
                      {currentQuestion.answer_tr.map((answer, index) => (
                        <li key={index}>{answer}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className='controls'>
              <div className='navigation-buttons'>
                <button
                  disabled={state.currentQuestion === 0}
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      currentQuestion: prev.currentQuestion - 1,
                    }))
                  }
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      showAnswers: !prev.showAnswers,
                    }))
                  }
                  data-active={state.showAnswers}
                >
                  {state.showAnswers ? "Hide" : "Show"} Answers
                </button>
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      showTranslation: !prev.showTranslation,
                    }))
                  }
                  data-active={state.showTranslation}
                >
                  {state.showTranslation ? "Hide" : "Show"} Translation
                </button>
                <button
                  disabled={state.currentQuestion === questions.length - 1}
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      currentQuestion: prev.currentQuestion + 1,
                    }))
                  }
                >
                  Next
                </button>
              </div>
              {state.currentQuestion === questions.length - 1 && (
                <>
                  <div className='congratulations'>
                    🎉 Congratulations! You've completed all questions! 🎉
                  </div>
                  <button
                    className='restart-button'
                    onClick={() =>
                      setState({
                        currentQuestion: 0,
                        score: 0,
                        answeredQuestions: [],
                        showTranslation: true,
                        showAnswers: false,
                        showNavigator: false,
                      })
                    }
                  >
                    Start New Practice
                  </button>
                </>
              )}
            </div>
          </div>

          <Progress
            currentQuestion={state.currentQuestion}
            totalQuestions={questions.length}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
