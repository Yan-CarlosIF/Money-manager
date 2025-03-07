export enum TypeTransaction {
  INCOME = "income",
  OUTCOME = "outcome",
}

export interface Transaction {
  id: number;
  description: string;
  type: TypeTransaction;
  category: string;
  price: number;
  created_at: string;
}
