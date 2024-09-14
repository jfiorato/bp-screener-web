import { create } from 'zustand'
import { ScreenerStore } from './types';
import { fetchScreener, fetchScreenerResults } from './api';


export const useScreenerStore = create<ScreenerStore>((set) => ({
  screener: null,
  screenerLoading: false,
  results: [],
  resultsLoading: false,
  currentQuestionIdx: 0,
  userAnswers: new Map<string, number>(),
  loadScreener: async () => {
    try {
      set({ screenerLoading: true });
      const screenerData = await fetchScreener();
      set({ screener: screenerData });
    } finally {
      set({ screenerLoading: false });
    }
  },
  updateCurrentQuestionIndex: (index: number) => { set({ currentQuestionIdx: index }) },
  updateUserAnswers: (question_id: string, value: number) => {
    set((state) => ({ userAnswers: new Map<string, number>(state.userAnswers).set(question_id, value) }));
  },
  incrementQuestionIndex: (by: number) => { set((state) => ({currentQuestionIdx: state.currentQuestionIdx + by}) )},
  getResults: async (answers: Map<string, number>) => {
    try {
      set({ resultsLoading: true });
      const resultData = await fetchScreenerResults(answers);
      set({ results: resultData });
    } finally {
      set({ resultsLoading: false });
    }
  }
}));
