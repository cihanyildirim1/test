import type { Question, QuestionData } from "../types";

export const flattenQuestions = (data: QuestionData): Question[] => {
  const questions: Question[] = [];

  Object.values(data).forEach((category) => {
    Object.values(category).forEach((subcategory) => {
      questions.push(...subcategory);
    });
  });

  return questions.sort((a, b) => a.number - b.number);
};

export const getTotalQuestions = (questions: Question[]): number => {
  return questions.length;
};
