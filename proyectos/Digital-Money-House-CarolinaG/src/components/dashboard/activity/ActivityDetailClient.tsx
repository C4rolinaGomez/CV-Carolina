"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getTransactionId } from "@/services/transactions.service";
import { getAccount } from "@/services/account.service";
import Cookies from "js-cookie";
import ActivityDetail from "./ActivityDetail";
import { TransactionType } from "@/types/transaction.types";

const ActivityDetailClient = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [transaction, setTransaction] = useState<TransactionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken");
        if (!token || !id) {
          setError("Falta el token o el ID de transacción.");
          return;
        }

        const accountData = await getAccount(token);
        const trx = await getTransactionId(token, accountData.id, Number(id));
        setTransaction(trx);
      } catch (err) {
          console.log(err)
        setError("Error al cargar la transacción.");
      }
    };

    fetchData();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!transaction) return <p>Cargando...</p>;

  return <ActivityDetail transaction={transaction} />;
};

export default ActivityDetailClient;
