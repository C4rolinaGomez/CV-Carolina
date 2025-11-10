import { AccountType } from "@/types/account.types";

export const operationTexts = {
  addMoney: {
    title: "Ya cargamos el dinero en tu cuenta",
    destination: "Cuenta propia",
    origin: "Digital Money House",
    description: (account: AccountType) => account.cvu,
  },
  payService: {
    title: "Ya realizaste tu pago",
    destination: (desc: string) => desc,
    origin: "Tarjeta",
    description: (cardId: number) => `Tarjeta terminada en ${cardId.toString().slice(-4)}`,
  },
};
