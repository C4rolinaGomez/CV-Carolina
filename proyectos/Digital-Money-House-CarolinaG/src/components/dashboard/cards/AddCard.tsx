"use client";
import InputText from "@/components/common/form/InputText";
import SubmitButton from "@/components/common/form/SubmitButton";
import { CardScheme } from "@/schemes/card.scheme";
import { newCard } from "@/services/cards.service";
import { CardBodyType} from "@/types/card.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ImageCard from "./ImageCard";
import { toast } from "sonner";
import clsx from "clsx";
import { convertDateFormat } from "@/utils/convertDateFormat";
import CustomToaster from "@/components/common/CustomToaster";

type AddCardProps = {
  account_id: number;
  token: string;
};

type CardFormData = {
  numberCard: string;
  nameTitular: string;
  expirationDate: string;
  securityCode: string;
};

const AddCard = ({ token, account_id }: AddCardProps) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const CardFormMethods = useForm<CardFormData>({
    resolver: yupResolver(CardScheme),
    defaultValues: {
      numberCard: "",
      nameTitular: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = CardFormMethods;

  const cardValues = watch();

  const onSubmitAddCard = async (data: CardFormData) => {
    try {
      const requestBody: CardBodyType = {
        cod: Number(data.securityCode),
        expiration_date: convertDateFormat(data.expirationDate),
        first_last_name: data.nameTitular,
        number_id: Number(data.numberCard),
      };

      await newCard(account_id, token, requestBody);
      reset();
      toast.success("Tarjeta agregada con éxito");
      router.push("/dashboard/cards");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
        toast.error("Error al crear la tarjeta");
      } else {
        setServerError("Error desconocido al crear la tarjeta");
        toast.error("Error al crear la tarjeta");
      }
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-5 rounded-[10px] p-6  md:p-8 xl:px-28 xl:py-8  bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <ImageCard
        number={cardValues.numberCard || ""}
        name={cardValues.nameTitular || ""}
        expiry={cardValues.expirationDate || ""}
        cvc={cardValues.securityCode || ""}
      />
      <CustomToaster />

      <FormProvider {...CardFormMethods}>
        <form
          className="w-[300px] md:w-[360px] lg:w-full flex flex-col lg:grid lg:grid-cols-2 items-center justify-between gap-5 md:gap-4 lg:gap-6 "
          onSubmit={handleSubmit(onSubmitAddCard)}
        >
          <div className="w-full flex  flex-col gap-5  md:gap-4 lg:col-span-1">
            {/* Numero Tarjeta */}
            <div className="h-[70px] md:h-[84px]">
              <InputText
                fieldName="numberCard"
                placeholder="Número de la tarjeta*"
                errorText={errors.numberCard?.message}
                maxLength={16}
              />
            </div>

            {/* Nombre Titular */}
            <div className="h-[70px] md:h-[84px]">
              <InputText
                fieldName="nameTitular"
                type="text"
                placeholder="Nombre y apellido*"
                errorText={errors.nameTitular?.message}
                inputClassName=""
                autoComplete={"off"}
              />
            </div>
          </div>

          <div className="w-full flex  flex-col gap-5  md:gap-4 md:flex-row lg:flex-col  lg:col-span-1">
            {/* Fecha de vencimiento */}
            <div className="h-[70px] md:h-[84px]">
              <Controller
                name="expirationDate"
                control={CardFormMethods.control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    fieldName="expirationDate"
                    placeholder="Fecha de vencimiento*"
                    maxLength={5}
                    errorText={errors.expirationDate?.message}
                    inputClassName="md:leading-6 md:placeholder:whitespace-normal md:placeholder:break-words md:pt-5 lg:pt-5"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length >= 3) {
                        value = value.slice(0, 2) + "/" + value.slice(2, 4);
                      }
                      field.onChange(value.slice(0, 5)); // Actualiza el valor en RHF
                    }}
                  />
                )}
              />
            </div>

            {/* Codigo de seguridad */}
            <div className=" h-[70px] md:h-[84px]">
              {" "}
              <InputText
                fieldName="securityCode"
                placeholder="Código de seguridad*"
                errorText={errors.securityCode?.message}
                maxLength={3}
                inputClassName="md:leading-6 md:placeholder:whitespace-normal md:placeholder:break-words  md:pt-5 lg:pt-5"
              />
            </div>
          </div>

          {/* Disabled hasta que se validen los campos */}
          <div className="w-full lg:col-span-1 lg:col-start-2 md:mt-5 lg:mt-0 ">
            <SubmitButton
              className={clsx("transition-all duration-300", {
                "bg-green border-green cursor-pointer text-dark1": isValid,
                "bg-button1 border-button1 text-dark1/50 cursor-not-allowed":
                  !isValid,
              })}
              text="Continuar"
            />
          </div>
          
          {/* Mensaje de error del servidor. */}
          {serverError && (
            <p className="w-[300px] md:w-[360px]  font-semibold flex flex-col text-sm md:text-base italic text-error1 text-center mt-4">
              {serverError}
            </p>
          )}
        </form>
      </FormProvider>
    </section>
  );
};

export default AddCard;
