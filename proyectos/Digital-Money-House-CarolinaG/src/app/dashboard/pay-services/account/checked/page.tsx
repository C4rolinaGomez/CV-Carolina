import SelectCard from "@/components/common/SelectCard";
import DetailService from "@/components/dashboard/payServices/DetailService";
import { getAccount } from "@/services/account.service";
import { getAllCards } from "@/services/cards.service";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";


const PaymentServicePage = async () => {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const accountId = accountData.id;
  const cardsList = await getAllCards(accountId, token);

  // TRUE cuando esta en true se muestran todas las tarjetas con un select.
  // FALSE cuando esta en false se muestran todas las tarjetas con un delete.
  const showPayServicePage = true;
  const showAddMoneyPage = true;

  return (
    <>
          <DetailService />
          <SelectCard
            accountId={accountId}
            cardsList={cardsList}
            showPayServicePage={showPayServicePage}
            showAddMoneyPage={showAddMoneyPage}
            token={token}
          />
    </>
  );
};

export default PaymentServicePage;
