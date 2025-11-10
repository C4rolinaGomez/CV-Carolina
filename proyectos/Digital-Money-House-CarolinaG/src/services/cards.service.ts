import { CardBodyType, CardType } from "@/types/card.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// GET all cards by account_id

export const getAllCards = async (
  account_id: number,
  token: string
): Promise<CardType[]> => {
  try {
    if (!token || !account_id) {
      throw new Error("Token o account_id no válidos");
    }

    const response = await fetch(`${BASE_URL}/accounts/${account_id}/cards`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error ${response.status}: ${errorDetails.message}`);
    }

    const cards = await response.json();
    return Array.isArray(cards) ? cards : [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cards:", error.message);
    } else {
      console.error("Error desconocido al obtener tarjetas:", error);
    }
    return [];
  }
};

export const getCardId = async (
  account_id: number,
  card_id: number,
  token: string
): Promise<CardType> => {
  try {
    if (!token || !account_id) {
      throw new Error("Token o account_id no válidos");
    }

    const response = await fetch(
      `${BASE_URL}/accounts/${account_id}/cards/${card_id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "No se pudo seleccionar la tarjeta"
        }`
      );
    }

    return await response.json();
  }  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
};

export const newCard = async (
    account_id: number,
    token: string,
    data: CardBodyType
  ): Promise<CardType> => {
    try {
      if (!token || !account_id) {
        throw new Error("Token o account_id no válidos");
      }
  
      const response = await fetch(`${BASE_URL}/accounts/${account_id}/cards`, {
        method: 'POST',
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || "No se pudo agregar la tarjeta"}`);
      }
  
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error mensaje:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      // según el caso, podés lanzar o devolver algo
      throw error;
    }
    
  }

export const deleteCardId = async (
    account_id: number,
    card_id: number,
    token: string
  ): Promise<void> => {
    try {
      if (!token || !account_id) {
        throw new Error("Token o account_id no válidos");
      }
  
      const response = await fetch(`${BASE_URL}/accounts/${account_id}/cards/${card_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || "No se pudo eliminar la tarjeta"}`);
      }
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error mensaje:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      // según el caso, podés lanzar o devolver algo
      throw error;
    }
    
  }
  