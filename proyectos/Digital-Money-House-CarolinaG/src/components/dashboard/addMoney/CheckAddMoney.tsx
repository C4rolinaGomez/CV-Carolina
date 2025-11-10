"use client";
import EditAmountIcon from "@/components/common/Icons/EditAmountIcon";
import { useSetAmount } from "@/context/moneyContext";
import { AccountType } from "@/types/account.types";
import { useRouter } from "next/navigation";
import { newDeposit } from "@/services/transferences.service";
import { useTransaction } from "@/context/transactionContext";

type CheckAddMoneyProps = {
  accountData: AccountType;
  token: string;
};

const CheckAddMoney = ({ accountData, token }: CheckAddMoneyProps) => {
  const router = useRouter();
  const { amount } = useSetAmount();
  const {setTransaction} = useTransaction();

  const handleEditAmount = () => {
    router.push(`/dashboard/add-money/card/amount`);
  };

  const handleSuccessAddMoney = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
      const body = {
        amount: Number(amount),
        dated: new Date().toISOString(),
        origin: "Cuenta propia",
        destination: "Digital Money House",
      } ;  

      if(body) {
        const transaction = await newDeposit(token, accountData.id, body);
        setTransaction(transaction);
        router.push(`/dashboard/add-money/card/amount/checked/success`);
      }
     
  };

  return (
    <>

    <section className="flex flex-col gap-5">
      <div className="bg-dark1 flex flex-col gap-3 rounded-[8px] p-6 md:px-8 md:gap-6 xl:gap-0 md:py-8">
        <h2 className="font-bold text-xl text-green pb-3 md:pb-0 md:text-2xl md:ml-6">
          Revisá que está todo bien
        </h2>

        <div className="w-full md:hidden border-b border-gray1"></div>

        <div className="flex flex-col gap-6 mb-4 mt-2 xl:mt-4 md:ml-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <p className="font-normal text-base">Vas a transferir</p>
              <EditAmountIcon
                className="cursor-pointer"
                onClick={handleEditAmount}
              />
            </div>
            <p className="font-bold text-base">
              {amount.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-normal text-xs">Para</p>
            <p className="font-bold text-lg">Cuenta propia</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-normal text-base">Digital Money House </p>
            <p className="font-normal text-xs">CVU {accountData.cvu}</p>
          </div>
        </div>

        <div className="md:flex md:flex-col xl:flex-row md:gap-3 md:justify-between md:items-start xl:items-center">
          <div className="hidden md:w-full md:flex  md:h-[64px]  xl:justify-end md:items-center ">
            <button className="bg-green border-green hidden md:block p-5 bg-button1 md:w-full xl:w-[233px] font-bold text-center items-center text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]"
            onClick={handleSuccessAddMoney}>
              Continuar
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[50px] flex justify-end md:hidden  ">
        <button
        onClick={handleSuccessAddMoney}
         className="bg-green border-green w-1/2 h-[50px] flex p-5 font-bold text-center text-dark1 items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] justify-center">
          Continuar
        </button>
      </div>
    </section>
    </>
 
  );
};

export default CheckAddMoney;
