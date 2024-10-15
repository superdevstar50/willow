import { Message } from "@/types";
import { create } from "zustand";

interface StoreState {
  ideas: string[];
  messages: Message[];

  setMessages: (messages: Message[]) => void;
  setIdeas: (ideas: string[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  ideas: [],
  messages: [],

  setMessages: (messages: Message[]) => set(() => ({ messages })),
  setIdeas: (ideas: string[]) => set(() => ({ ideas })),
}));
