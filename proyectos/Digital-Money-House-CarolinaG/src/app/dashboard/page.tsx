import Actions from "@/components/dashboard/home/Actions";
import Balance from "@/components/dashboard/home/Balance";
import TransactionsList from "@/components/dashboard/activity/TransactionsList";
import { getAccount } from "@/services/account.service";
import { getAllTransactions } from "@/services/transactions.service";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

export default async function DashboardPage() {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const transactionsList = await getAllTransactions(token, accountData.id);

  // TRUE cuando esta en true la lista de transacciones tiene paginacion y filtros.
  // FALSE cuando esta en false la lista de transacciones se reduce a las 10 ultimas y boton de "ver toda tu actividad"

  const showActivityPage = false; // Lista de las últimas 10 transacciones.
  const orderLatestTransactions = transactionsList.toReversed().slice(0, 10); // Últimas 10

  return (
    <>
      <Balance available_amount={accountData.available_amount} />
      <Actions />
      <TransactionsList
        transactionsList={orderLatestTransactions}
        showActivityPage={showActivityPage}
      />
    </>
  );
}
