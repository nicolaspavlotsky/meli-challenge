import { create } from "zustand";

import { createAppSlice, type AppSlice } from "./appSlice";

type StoreInterface = AppSlice;

const useStore = create<StoreInterface>()((set, get, store) => ({
  ...createAppSlice(set, get, store),
}));

export default useStore;
