import { FormEmail } from "@/components/auth/login/FormEmail";
import Navbar from "@/components/layout/Navbar";

const LoginEmailPage = () => {
  return (
    <>
      <Navbar
        logoLink="/"
        logoClassName="fill-dark1"
        navbarClassName="bg-green"
      />
      <main className="w-full md:w-2/5 md:mx-auto xl:w-1/4 md:px-0 flex flex-col p-10 gap-5 items-center justify-center relative grow ">
        <div>
          <h1 className="w-full p-3 text-white text-center text-[20px] font-bold">
            ¡Hola! Ingresá tu e-mail
          </h1>
        </div>{" "}
        <FormEmail />
      </main>
    </>
  );
};

export default LoginEmailPage;
