import Summary from "@/components/Summary";
import Header from "@/components/Header";
import {
  PriceHighlight,
  TransactionsConteiner,
  TransactionsTable,
} from "./styles";
import SearchForm from "./components/SearchForm";
import { Transaction } from "../../@types/transactions.d";
import { formatPrice, formatDate } from "@/helpers/formatter";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const Transactions = () => {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsConteiner>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction: Transaction) => {
              return (
                <tr key={transaction.created_at}>
                  <td width={"50%"}>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {formatPrice(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDate(new Date(transaction.created_at))}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsConteiner>
    </div>
  );
};

export default Transactions;
