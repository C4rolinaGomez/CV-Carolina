"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordScheme } from "@/schemes/login.scheme";
import InputText from "@/components/common/form/InputText";
import SubmitButton from "@/components/common/form/SubmitButton";
import { useState } from "react";
import { useRouter } from "../../../../node_modules/next/navigation";
import { useEmail } from "@/context/emailContext";
import { PasswordType } from "@/types/auth.types";
import { login } from "@/services/auth.service";
import Link from "../../../../node_modules/next/link";
import Cookies from "js-cookie";
import { toast } from "sonner";
import CustomToaster from "@/components/common/CustomToaster";
import BackIcon from "@/components/common/Icons/BackIcon";

export const FormPassword = () => {
  const { email } = useEmail();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm({
    resolver: yupResolver(PasswordScheme),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: PasswordType) => {
    setServerError(null);
    const body = { email, password: data.password };

    const promise = login(body).then((res) => {
      if (!res || res.error || !res.token) {
        throw new Error("Credenciales incorrectas. Intente nuevamente.");
      }

      Cookies.set("authToken", res.token, { expires: 1 / 24 });
      localStorage.setItem("authToken", res.token);
      router.push("/dashboard");
      return "¡Bienvenido! Redirigiendo...";
    });

    toast.promise(promise, {
      loading: "Cargando...",
      success: (msg) => msg,
      error: () => {
        setServerError("Credenciales incorrectas. Intente nuevamente."); // actualiza el error en pantalla
        return "¡Error! Revise los datos.";
      },
    });
  };

  return (
    <>
      <CustomToaster />
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col "
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText
            inputClassName=""
            placeholder="Correo electrónico"
            fieldName="email"
            type="email"
            defaultValue={email}
            style={{ display: "none" }}
          />
          <InputText
            inputClassName=""
            type="password"
            placeholder="Contraseña"
            fieldName="password"
            errorText={errors?.password?.message || ""}
          />

          <SubmitButton
            className="w-full bg-green focus:outline-2 focus:outline-black mt-5"
            text={"Continuar"}
            isLoading={isSubmitting}
          />
          {serverError && (
            <Link
              href={"/login"}
              className="w-full cursor-pointer flex items-center mt-2 gap-2 p-2"
            >
              <span> <BackIcon className="w-[20px] h-[20px] fill-error1"/> </span>
              <p className="w-full max-w-[300px] md:max-w-[360px] text-sm text-center italic text-error1 font-semibold">
                {serverError}
              </p>
            </Link>
          )}
        </form>
      </FormProvider>
    </>
  );
};
