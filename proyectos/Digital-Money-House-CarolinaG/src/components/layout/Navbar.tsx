"use client";
import Link from "../../../node_modules/next/link";
import { clsx } from "clsx";
import LogoSimbolo from "../common/Logos/LogoSimbolo";
import HamburguesaIcon from "../common/Icons/HamburguesaIcon";
import { useState } from "react";
import { CloseIcon } from "../common/Icons/CloseIcon";
import Sidebar from "../dashboard/layout/Sidebar";
import { UserDataType } from "@/types/user.types";

type Link = {
  href: string;
  text: string;
  outline?: boolean;
  solid?: boolean;
};

interface NavbarProps {
  logoClassName: string;
  logoLink: string;
  navbarClassName?: string;
  buttonsLinks?: Link[];
  isLogged?: boolean;
  userName?: string;
  userData?: UserDataType;
}

export default function Navbar({
  logoClassName,
  logoLink,
  navbarClassName,
  buttonsLinks,
  isLogged,
  userName,
  userData,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMobileMenu = () => {
    setIsOpen(true);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={clsx(
          "p-5 h-[64px] flex flex-row justify-between items-center",
          navbarClassName
        )}
      >
        <div className="w-[67px] h-[25px] md:w-[87px] md:h-[33px]  ">
          <LogoSimbolo className={logoClassName} href={logoLink} />
        </div>

        <div className="flex flex-row gap-5">
          {buttonsLinks &&
            buttonsLinks.map((link, index) => (
              <Link
                key={`${link.text}-${index}`}
                href={link.href}
                className={clsx(
                  " border-2 px-3 py-1.5 md:px-5  md:py-2 rounded-[5px] font-bold text-sm text-center",
                  {
                    "bg-green text-black border border-green": !link.outline,
                    "border-green text-green": link.outline,
                    "bg-secondary text-white": link.solid,
                  }
                )}
              >
                {link.text}
              </Link>
            ))}
          {isLogged && userName && (
            <div className="flex flex-row justify-center items-center gap-3">
              <div className="flex items-center justify-center p-1.5 bg-green rounded-[12px]">
                <span className="text-base md:text-xl font-bold text-dark1">
                  {userData?.firstname.charAt(0)}{userData?.lastname.charAt(0)}
                </span>
              </div>
              <Link href="/dashboard" className="hidden md:block">
                <p className="text-center text-white text-base font-bold md:pl-2 ">
                  {" "}
                  Hola, {userName}
                </p>
              </Link>
              <div className="flex items-center justify-center block md:hidden">
                <button onClick={openMobileMenu}>
                  <HamburguesaIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {isOpen && (
        <>
         <div
          onClick={() => setIsOpen(false)}
          className=
            "fixed inset-0 z-30 bg-black/50 transition-opacity duration-500"
          
        />
    
          <div className="md:hidden  absolute h-full flex flex-col justify-evelyn grow top-0 right-0 w-[55%] z-40">
            <div className="flex flex-col gap-5 bg-dark2 pl-8 py-6 pr-5">
              <button
                onClick={closeMobileMenu}
                className=" flex justify-end items-end"
              >
                <CloseIcon />
              </button>
              <p className="text-start items-start  text-green font-bold ">
                {" "}
                Hola,
                <br />
                {userName}
              </p>
            </div>
            <aside className="flex flex-col grow ">
              <Sidebar
              setIsOpen={setIsOpen}
             />
            </aside>
          </div>
        </>
      )}
    </>
  );
}
