import { SummaryCard, SummaryConteiner } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { formatPrice } from "@/helpers/formatter";
import { useSummary } from "@/hooks/useSummary";

const Summary = () => {
  const summary = useSummary();

  return (
    <SummaryConteiner>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{formatPrice(summary.entradas)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{formatPrice(summary.saidas)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{formatPrice(summary.total)}</strong>
      </SummaryCard>
    </SummaryConteiner>
  );
};

export default Summary;
