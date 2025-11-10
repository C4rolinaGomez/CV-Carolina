import * as yup from "yup";

// Esquema de validación para el email
export const EmailScheme = yup
	.object({
		email: yup
			.string()
			.required("Por favor, complete su email.")
			.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido."),
	})
	.required();

// Esquema de validación para la password
export const PasswordScheme = yup
	.object({
		password: yup
			.string()
			.required("Por favor, complete su contraseña.")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/,
				"Contraseña inválida."
			),
	})
	.required();
