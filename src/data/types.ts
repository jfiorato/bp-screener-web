export type ScreenerAnswerOption = {
  title: string,
  value: number,
}

export type ScreenerQuestion = {
  question_id: string,
  title: string,
}

export type ScreenerSection = {
  type: string,
  title: string,
  answers: ScreenerAnswerOption[],
  questions: ScreenerQuestion[],
}

export type ScreenerContent = {
  display_name: string,
  sections: ScreenerSection[],
}

export type Screener = {
  id: string,
  name: string,
  disorder: string,
  full_name: string,
  content: ScreenerContent,
}

export type ScreenerStore = {
  screener: Screener | null,
  screenerLoading: boolean,
  results: string[],
  resultsLoading: boolean,
  currentQuestionIdx: number,
  userAnswers: Map<string, number>,
  loadScreener: () => Promise<void>,
  updateCurrentQuestionIndex: (index: number) => void,
  updateUserAnswers: (question_id: string, value: number) => void,
  incrementQuestionIndex: (by: number) => void,
  getResults: (answers: Map<string, number>) => Promise<void>,
}
