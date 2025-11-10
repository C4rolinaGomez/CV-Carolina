"use client";
import CustomToaster from "@/components/common/CustomToaster";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


const ACCOUNT = 37289701912;

const SetAccount = () => {
  const router = useRouter();
  const [account, setAccount] = useState<string>("");

  const checkAddNumberAccount = () => {
    if (!account || account.trim() === "") {
      toast.error("Por favor ingrese el número de cliente");
      return;
    }
  
    // Validar que no haya espacios
    if (/\s/.test(account)) {
      toast.error("El número no debe contener espacios");
      return;
    }
  
    // Validar que sean exactamente 11 dígitos numéricos
    if (!/^\d{11}$/.test(account)) {
      toast.error("El número debe tener exactamente 11 dígitos numéricos.");
      toast.error("Agregá ceros adelante si tenés menos.");
      return;
    }
  
    // Validar que no comience con 2
    if (account.startsWith("2")) {
      toast.error("El número no debe comenzar con '2'");
      return;
    }
  
    const numberAccount = Number(account);
    if (numberAccount !== ACCOUNT) {
      handleErrorNumberAccount();
    } else {
      redirectPaymentServicePage(account);
    }
  };
  

  const handleErrorNumberAccount = () => {
    router.push(`/dashboard/pay-services/account/error`)
  };

  const redirectPaymentServicePage = (account: string) => {
    if (account || account.length === 11) {
      setAccount(account);;
      router.push(`/dashboard/pay-services/account/checked`);
    }
  };

  const onChangeSetAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAccount(value);
  };

  return (
    <>
   <CustomToaster />

      
        <section className="flex flex-col gap-5">
          <div className="bg-dark1 flex flex-col gap-3 rounded-[8px] px-6 pt-5 md:px-8 md:py-8 pb-16 md:gap-6 xl:px-12 xl:py-9">
            <h2 className="font-bold text-xl/6 text-green w-4/6   md:w-full md:pr-2 pb-3 md:pb-0 md:text-2xl">
              Número de cuenta sin el primer 2
            </h2>

            <form className="flex flex-col gap-3 xl:gap-4">
              <input
                name="account"
                type="text"
                value={account}
                maxLength={11}
                minLength={11}
                placeholder="37289701912"
                onChange={onChangeSetAccount}
                className="w-full h-[50px] md:h-[64px] xl:w-[475px] p-5 text-left items-center text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]"
              />
              <div className="hidden md:block">
                <p className="text-xs px-5 xl:px-1">
                  Son 11 números sin espacios, sin el “2” inicial. Agregá ceros
                  adelante si tenés menos.{" "}
                </p>
              </div>
            </form>

            <div className="md:flex md:flex-col xl:flex-row  md:justify-between md:items-start xl:items-center">
              <div className="hidden md:w-full md:flex  md:h-[64px]  xl:justify-end md:items-center ">
                <button
                  onClick={checkAddNumberAccount}
                  className={clsx(
                    "hidden md:block p-5 bg-button1 md:w-full xl:w-[233px] font-bold text-center items-center text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]",
                    {
                      "bg-green border-green ": account.length === 11,
                      "bg-button1 border-button1 cursor-not-allowed":
                        account.length != 11,
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
              onClick={checkAddNumberAccount}
              className={clsx(
                "w-[165px] h-[50px] flex p-5 font-bold text-center text-dark1 items-center rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] justify-center",
                {
                  "bg-green border-green ": account.length === 11,
                  "bg-button1 border-button1 cursor-not-allowed":
                    account.length != 11,
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

export default SetAccount;
