import { useEffect, useState } from "react";
import { Transaction } from "../@types/transactions.d";
import {
  CreateTransactionInput,
  TransactionsContext,
} from "./TransactionsContext";
import { API } from "@/lib/axios";

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await API.get("/transactions", {
      params: {
        description: query,
      },
    });

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await API.post("/transactions", {
      description,
      price,
      category,
      type,
    });

    const newTransaction = response.data[0];

    setTransactions((prev) => [newTransaction, ...prev]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
