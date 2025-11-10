
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getAccount } from "@/services/account.service";
import SuccessMessage from "@/components/common/SuccessMessage";

const PayServicesSuccessPage = async () => {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);

  return <SuccessMessage accountData={accountData} operationType="payService" />;
};

export default PayServicesSuccessPage