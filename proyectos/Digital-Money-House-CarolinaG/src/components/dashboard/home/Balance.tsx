
import React from "react";
import Link from "../../../../node_modules/next/link";


type BalanceProps = {
  available_amount: number;
}


const Balance = ( {available_amount}: BalanceProps ) => {

  const formattedSaldo = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(available_amount);

  return (
    <>
      {/* Accesos a tarjetas y cvu */}
      <section className="w-full flex flex-col bg-dark1 px-5 pt-5 pb-10  md:px-8 xl:px-12 gap-5 md:gap-10 justify-between rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="w-full flex flex-row gap-4  justify-end ">
          <Link href="/dashboard/cards" className="font-semibold text-xs md:text-base underline decoration-1 hover:decoration-2">
            Ver tarjetas
          </Link>
          <Link href="/dashboard/profile" className="font-semibold text-xs md:text-base underline decoration-1 hover:decoration-2 ">
            Ver CVU
          </Link>
        </div>
        {/* Saldo disponible */}
        <div className="w-full flex flex-col gap-2  md:gap-3">
          <h3 className="w-full text-white text-normal text-base pl-2 md:font-bold md:pl-5">
            Dinero disponible:{" "}
          </h3>
          <span className="w-fit border md:border-2 text-2xl border-green text-white rounded-full py-2 px-4 md:p-4 md:text-4xl font-bold">
            {formattedSaldo}
          </span>
        </div>
      </section>
    </>
  );
};

export default Balance;
