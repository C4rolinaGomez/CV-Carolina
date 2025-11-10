import * as yup from "yup";

export const RegisterScheme = yup
  .object({
    firstname: yup
      .string()
      .required("El campo es requerido")
      .min(3, "El campo debe tener al menos 3 caracteres")
      .matches(/^(?! )[A-Za-z\s]+$/, "El campo solo puede contener letras"),
    lastname: yup
      .string()
      .required("El campo es requerido")
      .min(3, "El campo debe tener al menos 3 caracteres")
      .matches(/^(?! )[A-Za-z\s]+$/, "El campo solo puede contener letras"),
    dni: yup
      .string()
      .required("El campo es requerido")
      .matches(/^[0-9]{8}$/, "El campo solo puede contener números"),
    email: yup
      .string()
      .required("El campo es requerido")
      .email("Correo inválido"),
     // .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido"),
     //  .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,"Ingresa un correo electrónico válido"

    password: yup
      .string()
      .required("El campo es requerido")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/,
        "Contraseña inválida"
      ),
    confirmPassword: yup
      .string()
      .required("El campo es requerido")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
    phone: yup.string().required("El campo es requerido"),
  })
  .required();
