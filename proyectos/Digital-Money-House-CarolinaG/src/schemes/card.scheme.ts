
import * as yup from "yup";

const isValidMonth = (value?: string) => {
  if (!value) return false;
  const [monthStr] = value.split("/");
  const month = parseInt(monthStr, 10);
  return month >= 1 && month <= 12;
};

const isFutureDate = (value?: string) => {
  if (!value || !/^\d{2}\/\d{2}$/.test(value)) return false;

  const [monthStr, yearStr] = value.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(`20${yearStr}`, 10);

  if (isNaN(month) || isNaN(year)) return false;

  const today = new Date();
  const inputDate = new Date(year, month - 1);

  return inputDate >= new Date(today.getFullYear(), today.getMonth() + 1);
};

export const CardScheme = yup
  .object({
    numberCard: yup
      .string()
      .required("El campo es requerido.")
      .matches(/^[0-9]+$/,"Debe ser un número.")
      .test("exact-length", "Debe tener exactamente 16 dígitos", (val) => val?.length === 16),  
    nameTitular: yup
      .string()
      .required("El campo es requerido.")
      .matches(/^(?! )[A-Za-z\s]+$/, "El campo solo puede contener letras.")
      .min(3, "El campo debe tener al menos 3 caracteres."),  
     expirationDate: yup
    .string()
    .required("El campo es requerido.")
    .matches(/^\d{2}\/\d{2}$/, "Formato inválido. Usá MM/AA")
    .test("valid-month", "El mes debe estar entre 01 y 12", isValidMonth)
    .test("is-future-date", "La fecha debe ser posterior a la actual", isFutureDate),

      securityCode: yup
      .string()
      .required("El campo es requerido.")
      .matches(/^[0-9]+$/,"Debe ser un número.")
      .test("exact-length", "Debe tener exactamente 3 dígitos.",(val) => val?.toString().length === 3)
     
  })

  .required();







