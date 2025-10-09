import { useEffect, useState } from "react";
import type { QuestionState } from "../types";

interface QuestionsListProps {
  questionsData: any;
  state: QuestionState;
  setState: (value: React.SetStateAction<QuestionState>) => void;
  truncateText: (text: string, maxLength: number) => string;
}

export function QuestionsList({
  questionsData,
  state,
  setState,
  truncateText,
}: QuestionsListProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Reset exit state when opening
    if (state.showNavigator) {
      setIsExiting(false);
    }
  }, [state.showNavigator]);

  const closeNavigator = () => {
    setIsExiting(true);
    setTimeout(() => {
      setState((prev) => ({ ...prev, showNavigator: false }));
      setIsExiting(false);
    }, 200); // Match animation duration
  };

  const handleQuestionSelect = (questionNumber: number) => {
    setIsExiting(true);
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentQuestion: questionNumber - 1,
        showNavigator: false,
      }));
      setIsExiting(false);
    }, 200);
  };

  if (!state.showNavigator) {
    return null;
  }

  return (
    <>
      <div
        className={`questions-overlay ${!isExiting ? "entering" : "exiting"}`}
        onClick={closeNavigator}
      />
      <div
        className={`questions-dropdown ${!isExiting ? "entering" : "exiting"}`}
      >
        <div className='questions-dropdown-header'>
          <span className='questions-dropdown-title'>
            US Citizenship Test Questions
          </span>
          <button
            className='close-button'
            onClick={closeNavigator}
            aria-label='Close questions list'
          >
            ✕
          </button>
        </div>
        <div className='questions-list'>
          {Object.entries(questionsData).map(
            ([category, categoryData]: [string, any]) => (
              <div key={category}>
                <div className='category-header'>{category}</div>
                {Object.entries(categoryData).map(
                  ([subcategory, questions]: [string, any]) => (
                    <div key={subcategory}>
                      {questions.map((q: any) => {
                        const index = q.number - 1;
                        const categoryClass = `category-${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        const subcategoryClass = `subcategory-${subcategory
                          .split(":")[0]
                          .trim()
                          .toLowerCase()}`;

                        return (
                          <button
                            key={q.number}
                            className={`question-item ${categoryClass} ${subcategoryClass} ${
                              index === state.currentQuestion ? "active" : ""
                            }`}
                            onClick={() => handleQuestionSelect(q.number)}
                          >
                            <span className='question-number'>#{q.number}</span>
                            <span className='question-preview'>
                              <small style={{ opacity: 0.7 }}>
                                {subcategory.split(":")[1]?.trim()} •{" "}
                              </small>
                              {truncateText(q.question_en, 40)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
