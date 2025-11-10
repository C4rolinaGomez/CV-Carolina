"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { EmailScheme } from "@/schemes/login.scheme";
import InputText from "@/components/common/form/InputText";
import SubmitButton from "@/components/common/form/SubmitButton";
import { useRouter } from "next/navigation";
import { useEmail } from "@/context/emailContext";
import Cookies from "js-cookie";
import { EMailType } from "@/types/auth.types";

export const FormEmail = () => {
  const isRegisterSuccess = Cookies.get("isRegisterSuccess");
  const router = useRouter();
  const { setEmail } = useEmail();
  const methods = useForm({
    resolver: yupResolver(EmailScheme),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitEmail = (data: EMailType) => {
    setEmail(data.email); // Guardamos el correo en el estado global
    localStorage.setItem("email", data.email);
    router.push("/login/password");
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full flex flex-col gap-5 "
        onSubmit={handleSubmit(onSubmitEmail)}
      >
        <InputText
          inputClassName=""
          type="email"
          placeholder="Correo electrónico"
          fieldName="email"
          errorText={errors?.email?.message || ""}
        />

        <SubmitButton
          className="w-full bg-green focus:outline-2 focus:outline-black"
          text={"Continuar"}
        />
        {!isRegisterSuccess && (
          <Link
            href={"/register"}
            className="w-full p-3  font-bold text-center text-black bg-button1 md:p-5 rounded-[10px] "
          >
            Crear cuenta
          </Link>
        )}
      </form>
    </FormProvider>
  );
};
