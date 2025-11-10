import { NewTransactionType, TransactionType } from "@/types/transaction.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api";

//GET all transactions, and if there are any, return an empty array.

export const getAllTransactions = async (
  token: string,
  account_id: number
): Promise<TransactionType[]> => {
  try {
    if (!token || !account_id) {
      throw new Error("Token o account_id no válidos");
    }

    const response = await fetch(`${BASE_URL}/accounts/${account_id}/activity`, {
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

    const transactions = await response.json();
    return Array.isArray(transactions) ? transactions : [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cards:", error.message);
    } else {
      console.error("Error desconocido al obtener tarjetas:", error);
    }
    return [];
  }
}

// GET transaction by Id

export const getTransactionId = async (
  token: string,
  account_id: number,
  transaction_id: number
): Promise<TransactionType> => {
  try {
    if (!token || !account_id) {
      throw new Error("Token o account_id no válidos");
    }

    const response = await fetch(`${BASE_URL}/accounts/${account_id}/transactions/${transaction_id}`, {
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

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
}


// POST new transaction

export const newTransaction = async (
  token: string,
  account_id: number,
  data: NewTransactionType,
 
): Promise<TransactionType> => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${account_id}/transactions`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear transacción");
    }

    const transaction: TransactionType = await response.json();
    return transaction;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
};


