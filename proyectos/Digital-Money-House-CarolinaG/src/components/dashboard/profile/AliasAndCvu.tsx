"use client"
import CopyToClipboard from "@/components/common/Icons/CopyToClipboard";
import { AccountType } from "@/types/account.types";



type AccountDataProps = {
	accountData: AccountType;
}


const AliasAndCvu = ( {accountData}: AccountDataProps ) => {
  return (
    <section className="w-full flex flex-col bg-dark1 px-6 pt-5 pb-8 md:p-8 xl:p-10 gap-6 md:gap-5 justify-between rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <h4 className="w-full text-gray1 md:text-white text-sm md:text-[16px] md:font-bold leading-snug">
        Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta
      </h4>
      {/* CVU */}
      <div className="w-full flex flex-row justify-between items-start md:items-center md:pb-4 xl:py-2 ">
        <div className="w-full flex flex-col items-start">
          <span className="text-green text-xl font-bold leading-normal">
            CVU
          </span>
          <span className="text-gray1 text-base leading-[18.83px]">
          {accountData.cvu}
          </span>
        </div>

        <div className="w-8 h-8 flex items-center justify-center">
          <CopyToClipboard className="w-6 h-6" copyText={accountData.cvu} />
        </div>
      </div>

      <div className="w-full md:hidden  border border-gray1"></div>


         {/* ALIAS */}
         <div className="w-full flex flex-row justify-between items-start md:items-center md:pb-4 xl:py-2 ">
        <div className="w-full flex flex-col items-start">
          <span className="text-green text-xl font-bold leading-normal">
            ALIAS
          </span>
          <span className="text-gray1 text-base leading-[18.83px]">
          {accountData.alias}
          </span>
        </div>

        <div className="w-8 h-8 flex items-center justify-center">
          <CopyToClipboard className="w-6 h-6" copyText={accountData.alias} />
        </div>
      </div>

    </section>
  );
};

export default AliasAndCvu;
