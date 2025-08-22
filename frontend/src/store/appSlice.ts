import type { StateCreator } from "zustand";

interface State {
  searchQuery: string;
}

interface Actions {
  setSearchQuery: (searchQuery: string) => void;
}

export interface AppSlice extends Actions, State {}

const initialState: State = {
  searchQuery: "",
};

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  ...initialState,
  setSearchQuery: (searchQuery: string) => set(() => ({ searchQuery })),
});
