import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContext } from "react";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const SummaryInfo = {
    entradas: 0,
    saidas: 0,
    total: 0,
  };

  const summary = transactions.reduce((summaryInfo, transactions) => {
    if (transactions.type === "income") {
      summaryInfo.entradas += transactions.price;
      summaryInfo.total += transactions.price;
    } else {
      summaryInfo.saidas += transactions.price;
      summaryInfo.total -= transactions.price;
    }

    return summaryInfo;
  }, SummaryInfo);

  return summary;
}
