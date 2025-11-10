import { RegisterBodyType, RegisterResponseType, UserDataType } from "@/types/user.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// GET user email, firstname, lastname, phone, and dni from a specific user.

export const getUser = async (
  token: string,
  user_id: number
): Promise<UserDataType> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error ${response.status}: ${errorDetails.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
};

// POST new user

export const newUser = async (
  data: RegisterBodyType
): Promise<RegisterResponseType> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

   // const responseData: RegisterResponseType = await response.json();
    //console.log(responseData);

    if (response.status === 409) {
      throw new Error("Error: El email ya se encuentra registrado.");
    }

    if (!response.ok ) {
      const errorData = await response.json().catch(()=>({}))
      throw new Error(errorData.error|| "Error al crear la cuenta");
    }

    const responseData: RegisterResponseType = await response.json();
    console.log(responseData);

    return responseData;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
      throw error;
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error inesperado")
    }
   
  }
  
};

// PUT 

export const updateUser = async (user_id: number, updatedData: Partial<UserDataType>, token: string) => {
  const response = await fetch(`${BASE_URL}/users/${user_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Error ${response.status}`);
  }

  return response.json(); // Devuelve el usuario actualizado
};
