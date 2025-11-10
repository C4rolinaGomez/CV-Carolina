// context/transactionContext.ts
import { create } from "zustand";
import { TransactionType } from "@/types/transaction.types";

type TransactionStore = {
  transaction: TransactionType | null;
  setTransaction: (tx: TransactionType) => void;
  clearTransaction: () => void;
};

export const useTransaction = create<TransactionStore>((set) => ({
  transaction: null,
  setTransaction: (tx) => set({ transaction: tx }),
  clearTransaction: () => set({ transaction: null }),
}));
