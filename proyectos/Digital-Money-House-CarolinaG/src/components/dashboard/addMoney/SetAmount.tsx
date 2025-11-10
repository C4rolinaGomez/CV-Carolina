"use client";
import CustomToaster from "@/components/common/CustomToaster";
import { useSetAmount } from "@/context/moneyContext";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SetAmount = () => {
  const router = useRouter();
  const {amount, setAmount}  = useSetAmount()
 
  const checkAddAmount = () => {
      const amountNumber = Number(amount);
      if (!amountNumber || amountNumber <= 0 ) {
        toast.error("Ingrese un importe mayor a $0");
        return;
      } 
      if (amountNumber > 1000000 ) {
        toast.error("El máximo permitido es $1000000.");
        return;
      } 
      else {
        redirectCheckAddMoneyPage(amountNumber);
      }
      ;
    };

    const redirectCheckAddMoneyPage = (amountNumber: number) => {
      if (amountNumber > 0) {
        setAmount(amountNumber)
        router.push(`/dashboard/add-money/card/amount/checked`);
      }
    };

  const onChangeSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setAmount(value);
  };



  return (
    <>
  <CustomToaster />

    <section className="flex flex-col gap-5">
     
     <div className="bg-dark1 flex flex-col gap-3 rounded-[8px] px-6 py-4 md:px-8 md:gap-6 md:py-6 xl:py-8 xl:px-12">
       <h2 className="font-bold text-xl text-green w-3/4 md:w-full md:pr-2 pb-3 md:pt-5 xl:pt-0 md:text-2xl">
         ¿Cuánto quieres ingresar a la cuenta?
       </h2>

       <form>
         <input
         name="amount"
           type="number"
          
           min={1}
           max={1000000}
           placeholder="$0.00"
           onChange={onChangeSetAmount}
           className="w-full h-[50px] md:h-[64px] xl:w-[360px] p-5 text-left items-center text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]"
         />
       </form>

       <div className="md:flex md:flex-col xl:flex-row md:gap-3 md:justify-between md:items-start xl:items-center">
         <div className="hidden md:w-full md:flex  md:h-[64px]  xl:justify-end md:items-center ">
           <button
             onClick={checkAddAmount}
             className={clsx(
               "hidden md:block p-5 bg-button1 md:w-full xl:w-[233px] font-bold text-center items-center text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]",
               {
                 "bg-green border-green ": amount,
                 "bg-button1 border-button1 cursor-not-allowed": !amount,
               }
             )}
           >
             Continuar
           </button>
         </div>
       </div>
     </div>

     <div className="w-full h-[50px] flex justify-end md:hidden  ">
       <button
         onClick={checkAddAmount}
         className={clsx(
           "w-[165px] h-[50px] flex p-5 font-bold text-center text-dark1 items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] justify-center",
           {
             "bg-green border-green ": amount,
             "bg-button1 border-button1 cursor-not-allowed": !amount,
           }
         )}
       >
         Continuar
       </button>
     </div>
   </section>
    </>
   
  
  );
};

export default SetAmount;
