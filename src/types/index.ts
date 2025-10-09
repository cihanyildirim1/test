export interface Question {
  number: number;
  question_en: string;
  answer_en: string[];
  question_tr: string;
  answer_tr: string[];
}

export interface Category {
  [subcategory: string]: Question[];
}

export interface QuestionData {
  [category: string]: Category;
}

export interface QuestionState {
  currentQuestion: number;
  score: number;
  answeredQuestions: number[];
  showTranslation: boolean;
  showAnswers: boolean;
  showNavigator: boolean;
}
