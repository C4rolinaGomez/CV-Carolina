export type TransactionType = {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
};

export type NewTransactionType = {
  amount: number;
  dated: string;
  description: string;
};

