import { FormPassword } from "@/components/auth/login/FormPassword";
import CustomToaster from "@/components/common/CustomToaster";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const LoginPasswordPage = () => {
  return (
    <>
      <Navbar
        logoLink="/"
        logoClassName="fill-dark1"
        navbarClassName="bg-green"
      />
      <main className="w-full md:w-2/5 md:mx-auto xl:w-1/4 md:px-0 flex flex-col p-10 gap-3 items-center justify-center relative grow ">
        <div>
          <h1 className="w-full text-white text-center text-[20px] font-bold">
            Ingresá tu contraseña
          </h1>
        </div>
        <CustomToaster />
        <FormPassword />
      </main>
    </>
  );
};

export default LoginPasswordPage;
