import { TransactionType } from "@/types/transaction.types";
import { NewDepositType } from "@/types/transference.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// POST 

export const newTransference = async () => {
}

// POST  deposit

export const newDeposit = async (token: string, account_id: number, data: NewDepositType) => {
    try {
        if (!token || !account_id) {
          throw new Error("Token o account_id no válidos");
        }
    
        const response = await fetch(`${BASE_URL}/accounts/${account_id}/deposits`, {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("⚠️ Error en la respuesta de la API:", errorData);
          throw new Error(`Error ${response.status}: ${errorData.message || "No se pudo realizar el deposito"}`);
        }
        const deposit: TransactionType = await response.json();
        return deposit;
    
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

// GET

export const getAllTransferences = async () => {
}


