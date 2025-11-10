import { ServiceType } from "@/types/service.types";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

//GET all services, and if there are any, return an empty array.

  export const getAllServices = async (): Promise<ServiceType[]> => {
    try {
      const response = await fetch(`${BASE_URL}/service`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const text = await response.text(); // Leer una sola vez
  
      if (!response.ok) {
        let errorMessage = text;
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // no es JSON, usamos el texto crudo
        }
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }
  
      const data = JSON.parse(text);
      return Array.isArray(data) ? data : [];
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching cards:", error.message);
      } else {
        console.error("Error desconocido al obtener tarjetas:", error);
      }
      return [];
    }
  };



  // GET card by Id. Get a single service with id, name, date and invoice value
  export const getServiceId = async (id: string): Promise<ServiceType> => {
    try {
      const response = await fetch(`${BASE_URL}/service/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("⚠️ Error en la respuesta de la API:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || "No se pudo seleccionar la tarjeta"}`);
      }
      return response.json(); 

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error mensaje:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
  
  };

  