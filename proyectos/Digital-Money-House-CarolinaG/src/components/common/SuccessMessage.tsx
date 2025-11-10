"use client";
import CheckIcon from "@/components/common/Icons/CheckIcon";
import { useSelectCard } from "@/context/moneyContext";
import { useTransaction } from "@/context/transactionContext";
import { operationTexts } from "@/data/successContent";
import { AccountType } from "@/types/account.types";
import { formatDated } from "@/utils/formatDated";
import { useRouter } from "next/navigation";

type SuccessMessageProps = {
  accountData: AccountType;
  operationType: "addMoney" | "payService";
};

const SuccessMessage = ({
  accountData,
  operationType,
}: SuccessMessageProps) => {
  const router = useRouter();
  const { cardId } = useSelectCard();
  const { transaction } = useTransaction();

  if (!transaction) return null;

  const handlePushToDashboard = () => {
    router.push("/dashboard");
  };

  const handleDownloadReceipt = () => {
    console.log("✅ Descargando comprobante...");
    //downloadReceiptPDF("receipt-content");
  };

  const formattedAmount = transaction?.amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3 items-center justify-center bg-green py-4 md:py-5 rounded-[8px]">
          <CheckIcon className="fill-black w-16" />
          <h2 className="font-bold text-base md:text-2xl text-black">
            {operationType === "addMoney"
              ? operationTexts.addMoney.title
              : operationTexts.payService.title}
          </h2>
        </div>

        <div className="bg-dark1 flex flex-col gap-3 rounded-[8px] p-6 md:px-8 md:gap-6 xl:gap-0 md:py-8">
          <div className="flex flex-col gap-6 mb-4 mt-2 xl:mt-4 md:ml-6">
            <div className="flex flex-col gap-1">
              <p className="font-normal text-xs">
                {formatDated(transaction.dated)}
              </p>
              <p className="font-bold text-xl text-green">{formattedAmount}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-normal text-base">Para</p>
              <p className="font-bold text-xl text-green">
                {operationType === "addMoney"
                  ? operationTexts.addMoney.destination
                  : operationTexts.payService.destination(
                      transaction.description
                    )}
              </p>
            </div>

            {operationType === "payService" ? (
              <div className="flex flex-col gap-1">
                <p className="font-normal text-base">
                  {operationTexts.payService.origin}
                </p>
                <p className="font-normal text-xs">
                  {cardId !== null
                    ? operationTexts.payService.description(cardId)
                    : "Tarjeta no disponible"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="font-normal text-base">
                  {operationTexts.addMoney.origin}
                </p>
                <p className="font-normal text-xs">
                  {operationTexts.addMoney.description(accountData)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="w-full md:justify-items-stretch xl:justify-items-end flex-col gap-5 flex md:flex-row-reverse">
          <button
            onClick={handleDownloadReceipt}
            className="w-full h-[50px] md:h-[64px] xl:w-[233px] bg-green text-dark1 font-bold py-3 rounded-[10px] shadow"
          >
            Descargar comprobante
          </button>
          <button
            onClick={handlePushToDashboard}
            className="w-full h-[50px] md:h-[64px] xl:w-[233px] bg-button1 text-dark1 font-bold py-3 rounded-[10px] shadow"
          >
            Ir al inicio
          </button>
        </div>

        {/* HTML OCULTO PARA PDF */}
{/* 
        <div
          id="receipt-content"
          style={{
            position: "absolute",
            top: 100,
            left: "10px",
            zIndex: -1,
          }}
        >
          <ReceiptOperation accountData={accountData} />
        </div> */}
      </section>
    </>
  );
};

export default SuccessMessage;
