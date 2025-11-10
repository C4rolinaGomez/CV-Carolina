import { AccountType } from "@/types/account.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// GET Find acoount by user_id in the token.

export const getAccount = async (token: string): Promise<AccountType> => {
    try {
      const response = await fetch(`${BASE_URL}/account`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error ${response.status}: ${errorDetails.message}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
