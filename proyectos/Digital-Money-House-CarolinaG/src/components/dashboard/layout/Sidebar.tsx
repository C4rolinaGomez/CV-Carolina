"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import clsx from "clsx";
import {usePathname, useRouter} from "next/navigation";

type SidebarProps = {
  setIsOpen?: (value: boolean) => void; // solo mobile
};


const Sidebar = ({ setIsOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Inicio", path: "/dashboard" },
    { name: "Actividad", path: "/dashboard/activity" },
    { name: "Tu perfil", path: "/dashboard/profile" },
    { name: "Cargar dinero", path: "/dashboard/add-money" },
    { name: "Pagar servicios", path: "/dashboard/pay-services" },
    { name: "Tarjetas", path: "/dashboard/cards" },
  ];

  const logoutHandle = () => {
    localStorage.removeItem("authToken");
    Cookies.remove("authToken");
    if (setIsOpen) setIsOpen(false); // cerrar sidebar
    router.push("/");
  };

  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false); // cerrar sidebar al navegar
  };

  return (
    <nav className="w-full pl-8 py-4 md:pt-12 md:px-10 flex flex-col grow bg-green gap-3 items-start">
      {menuItems && menuItems.map((item, index) => (
        <Link
          key={`${item.name}-${index}`}
          href={item.path}
          onClick={handleLinkClick}
          className={clsx("text-[17px] text-dark1 hover:font-bold md:hover:font-extrabold ", {
            "font-bold md:font-extrabold": pathname === item.path && pathname.includes(item.path),
            "font-normal md:font-semibold": pathname !== item.path,
          })}
        >
          {item.name}
        </Link>
      ))}

      <button
        onClick={logoutHandle}
        className="text-[17px] font-normal md:font-semibold text-dark1/50 hover:font-bold md:hover:font-extrabold"
      >
        Cerrar sesion
      </button>
    </nav>
  );
};

export default Sidebar;
