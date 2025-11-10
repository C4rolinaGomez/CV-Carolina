import SuccessMessage from "@/components/common/SuccessMessage";
import { getAccount } from "@/services/account.service";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const AddMoneySuccessPage = async () => {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);

  return (
    <SuccessMessage
    accountData={accountData} 
    operationType="addMoney" />
  );
};

export default AddMoneySuccessPage;
