import { getAllTransactions } from "@/services/transactions.service";
import TransactionsList from "@/components/dashboard/activity/TransactionsList";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getAccount } from "@/services/account.service";


const ActivityPage = async () => {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const transactionsList = await getAllTransactions(token, accountData.id);

  const showActivityPage = true; // Modo lista completa
  const orderAllTransactions = transactionsList.toReversed()

  return (
    <>
      <TransactionsList
        transactionsList={orderAllTransactions}
        showActivityPage={showActivityPage}
      />
    </>
  );
};

export default ActivityPage;
