"use client";
import InputText from "@/components/common/form/InputText";
import { RegisterScheme } from "@/schemes/register.scheme";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterBodyType, RegisterFormType } from "@/types/user.types";
import { useState } from "react";
import { useRouter } from "../../../../node_modules/next/navigation";
import SubmitButton from "@/components/common/form/SubmitButton";
import Cookies from "js-cookie";
import { newUser } from "@/services/user.service";
import CustomToaster from "@/components/common/CustomToaster";
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const RegisterFormMethods = useForm({
    resolver: yupResolver(RegisterScheme),
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = RegisterFormMethods;

  const onSubmitRegister = async (data: RegisterFormType) => {
    setServerError(null);
    const requestBody: RegisterBodyType = {
      ...data,
      dni: Number(data.dni),
    };
  
    const registerPromise = newUser(requestBody);
  
    toast.promise(registerPromise, {
      loading: "Creando cuenta...",
      success: () => {
        Cookies.set("isRegisterSuccess", "true", { expires: 1 / 24 });
        router.push("/register/success");
        return "Cuenta creada con éxito.";
      },
      error: (err) => {
        if (err instanceof Error) {
          setServerError(err.message);
          return err.message;
        }
        setServerError("Error desconocido");
        return "Error al registrar usuario.";
      },
    });
  
    reset();
  };
  


  return (
    <>
      <CustomToaster />
      <FormProvider {...RegisterFormMethods}>
      <form
        className="w-full flex flex-col"
        onSubmit={handleSubmit(onSubmitRegister)}
      >
        <div className="grid md:grid-cols-2 gap-5 md:gap-x-10 md:gap-y-8">
          {/* Nombre */}
          <div className="">
            <InputText
              type="text"
              fieldName="firstname"
              errorText={errors.firstname?.message}
              placeholder="Nombre*"
            />
          </div>

          {/* Apellido */}
          <div>
            <InputText
              type="text"
              fieldName="lastname"
              errorText={errors.lastname?.message}
              placeholder="Apellido*"
            />
          </div>

          {/* DNI */}
          <div>
            <InputText
              type="text"
              fieldName="dni"
              errorText={errors.dni?.message}
              placeholder="DNI*"
              autoComplete={"off"}
            />
          </div>

          {/* Email */}
          <div>
            <InputText
              type="text"
              fieldName="email"
              errorText={errors.email?.message}
              placeholder="Correo electronico*"
            />
          </div>
        </div>

        {/* Formato contraseña */}
        <div className=" text-start mb-3 mt-5">
          <p className="text-xs md:tracking-tight text-gray1 md:text-sm xl:text-[14.6px]">
            Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
            carácter especial, una mayúscula y un número).
          </p>
        </div>

        <div className=" grid md:grid-cols-2 gap-5 md:gap-x-10 md:gap-y-8">
          {/* Contraseña */}
          <div>
            <InputText
              type="password"
              fieldName="password"
              errorText={errors.password?.message}
              placeholder="Contraseña*"
            />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <InputText
              type="password"
              fieldName="confirmPassword"
              errorText={errors.confirmPassword?.message}
              placeholder="Confirmar contraseña*"
            />
          </div>

          {/* Telefono */}
          <div>
            <InputText
              type="text"
              fieldName="phone"
              errorText={errors.phone?.message}
              placeholder="Teléfono*"
            />
          </div>

          {/* Boton crear cuenta */}
          <div>
            <SubmitButton
              className="w-full mt-2 md:mt-0 bg-green focus:outline-2 focus:outline-black"
              text={"Crear cuenta"}
            />
          </div>
        </div>

           {/* Mensaje de error del servidor. */}
           {serverError && (
             <div className="flex items-center">
                           <p className="w-full  font-semibold flex flex-col text-sm italic text-error1 text-center mt-6">{serverError}</p>

             </div>
            
          )}
      </form>
    </FormProvider>
    </>

  );
};

export default RegisterForm;
