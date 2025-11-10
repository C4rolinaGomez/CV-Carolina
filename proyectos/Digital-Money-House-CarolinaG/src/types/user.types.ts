export type RegisterFormType = {
  firstname: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export type RegisterBodyType = {
	dni: number,
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  phone: string,
}

export type RegisterResponseType = {
  account_id: number;
  email: string;
  user_id: number;
  error?: string;
};

export type UserDataType = {
  id: number;
  firstname: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  phone: string;
};


export type UserEditDataType = {
  id: string;
  dni: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
};





