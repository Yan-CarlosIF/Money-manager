import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styled";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

/**
 * Memo:
 * 0. Hooks Changed or Props Changed? (deep comparison)
 *
 * obs: Essa deep comparison, dependendo do componente, pode ser mais lenta do que a re-renderização normal dele
 * só utilize o use memo quando for um componente complexo, um HTML muito grande, ou um componente com muitos hooks
 *
 * 0.1 Comparar as versões anteriores dos hooks e props
 * 0.2 SE mudou algo, ele vai permitir a nova renderização (Se não mudou nada, ele não entra no fluxo de renderização)
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

const SearchForm = () => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};

export default SearchForm;
