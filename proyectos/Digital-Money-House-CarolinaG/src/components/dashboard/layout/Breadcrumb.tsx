"use client";
import Link from "next/link";
import clsx from "clsx";
import {usePathname} from "next/navigation";
import ArrowIcon from "@/components/common/Icons/ArrowIcon";

const Breadcrumb = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Actividad", path: "/dashboard/activity" },
    { label: "Actividad", path: "/dashboard/activity/detail" },
    { label: "Tu perfil", path: "/dashboard/profile" },
    { label: "Cargar dinero", path: "/dashboard/add-money" },
    { label: "Cargar dinero", path: "/dashboard/add-money/bank" },
    { label: "Cargar dinero", path: "/dashboard/add-money/card" },
    { label: "Cargar dinero", path: "/dashboard/add-money/card/amount" },
    { label: "Cargar dinero", path: "/dashboard/add-money/card/amount/checked" },
    { label: "Cargar dinero", path: "/dashboard/add-money/card/amount/checked/success" },
    { label: "Pagar servicios", path: "/dashboard/pay-services" },
    { label: "Pagar servicios", path: "/dashboard/pay-services/account" },
    { label: "Pagar servicios", path: "/dashboard/pay-services/account/ckecked" },
    { label: "Pagar servicios", path: "/dashboard/pay-services/account/ckecked/success" },
    { label: "Tarjetas", path: "/dashboard/cards" },
    { label: "Tarjetas", path: "/dashboard/cards/new-card" },
  ];

  return (
    <div className=" w-full font-semibold flex flex-col text-left items-start">
      {menuItems &&
        menuItems.map((item, index) => (
          <Link
            key={`${item.label}-${index}`}
            href={item.path}
            className={clsx(" flex flex-row gap-2", {
              "block": pathname === item.path || pathname.includes(item.path),
              "hidden": pathname !== item.path,
            })}
          >
               <ArrowIcon className="fill-black/70 w-4" />
               <p className="underline decoration-1 text-base text-dark1 font-semibold ">    {item.label}</p>
         

          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
