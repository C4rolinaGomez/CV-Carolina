import React from "react";
import Link from "../../../../node_modules/next/link";

const Actions = () => {
  return (
    <>
      {/* Acciones */}
      <section className="w-full flex flex-col xl:flex-row gap-5">
        <Link
          href={"/dashboard/add-money"}
          className="md:w-full md:h-20 xl:h-[100px]  p-5 bg-green rounded-[10px] text-dark1 md:text-2xl font-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center inline-flex"
        >
            Ingresar dinero
          
        </Link>
        <Link
          href="dashboard/pay-services"
          className="md:w-full md:h-20 xl:h-[100px]  p-5  bg-green rounded-[10px] text-dark1 md:text-2xl font-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center inline-flex"
        >
          Pagar servicios
        </Link>
      </section>
    </>
  );
};

export default Actions;
