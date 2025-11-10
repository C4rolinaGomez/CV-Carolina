import RegisterForm from "@/components/auth/register/RegisterForm";
import Navbar from "@/components/layout/Navbar";

const buttonsLinks = [
  { href: "/login", text: "Iniciar sesión", solid: true, outline: false },
];

const RegisterPage = () => {
  return (
    <>
      <Navbar
        logoLink="/"
        navbarClassName="bg-green"
        logoClassName="fill-dark1"
        buttonsLinks={buttonsLinks}
      />
      <main className="w-full flex flex-col gap-4 p-10 md:p-14 xl:w-1/2 xl:mx-auto xl:px-0 items-center justify-center relative grow">
        <div>
          <h1 className="w-full text-center text-xl font-bold ">
            Crear Cuenta
          </h1>
        </div>

        <RegisterForm />
      </main>
    </>
  );
};

export default RegisterPage;