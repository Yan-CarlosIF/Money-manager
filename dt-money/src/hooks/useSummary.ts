import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (summaryInfo, transactions) => {
        if (transactions.type === "income") {
          summaryInfo.entradas += transactions.price;
          summaryInfo.total += transactions.price;
        } else {
          summaryInfo.saidas += transactions.price;
          summaryInfo.total -= transactions.price;
        }

        return summaryInfo;
      },
      {
        entradas: 0,
        saidas: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
