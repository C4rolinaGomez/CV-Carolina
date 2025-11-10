"use client";

import { useTransaction } from "@/context/transactionContext";
import { AccountType } from "@/types/account.types";
import { formatDated } from "@/utils/formatDated";

type ReceiptOperationProps = {
  accountData: AccountType;
};

const ReceiptOperation = ({ accountData }: ReceiptOperationProps) => {
  const { transaction } = useTransaction();

  if (!transaction) return null;

  const formattedAmount = transaction.amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <div
      id="receipt-content"
      style={{
        width: "600px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#151817",
        backgroundColor: "#1E1E20",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          backgroundColor: "#C5FF1D",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "22px", marginRight: "10px" }}>DIGITAL</h1>
        <span
          style={{
            background: "#151817",
            color: "white",
            fontWeight: "bold",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "20px",
          }}
        >
          MONEY HOUSE
        </span>
      </div>

      {/* Fecha y título */}
      <div style={{ padding: "16px 20px" }}>
        <h2 style={{ color: "#C5FF1D", fontSize: "18px", marginBottom: "4px" }}>
          Comprobante de transferencia
        </h2>
        <p style={{ fontSize: "14px" }}>{formatDated(transaction.dated)}</p>
      </div>

      {/* Caja principal */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          margin: "0 20px 20px 20px",
        }}
      >
        <h3 style={{ color: "#444", fontSize: "14px", marginBottom: "4px" }}>Transferencia</h3>
        <p style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "16px" }}>
          {formattedAmount}
        </p>

        <hr />

        {/* Origen */}
        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "#444", fontSize: "14px", marginBottom: "4px" }}>De</p>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            {accountData.alias} {transaction.origin}{transaction.destination}
          </p>
          <p style={{ fontSize: "13px", marginBottom: "2px" }}>
            CVU: {accountData.cvu}
          </p>
          <p style={{ fontSize: "13px" }}>Cuenta Digital House Money</p>
        </div>

        {/* Destino */}
        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "#444", fontSize: "14px", marginBottom: "4px" }}>Para</p>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>{transaction.description}</p>
          <p style={{ fontSize: "13px" }}>Banco Galicia</p>
          <p style={{ fontSize: "13px" }}>CUIT/CUIL: 000013912847500027631</p>
          <p style={{ fontSize: "13px" }}>Caja de ahorro</p>
        </div>

        {/* Motivo */}
        <div style={{ marginTop: "16px" }}>
          <hr />
          <p style={{ fontSize: "13px", marginTop: "6px" }}>
            <strong>Motivo:</strong> Varios
          </p>
        </div>

        {/* Código */}
        <div style={{ marginTop: "10px" }}>
          <hr />
          <p style={{ fontSize: "13px", marginTop: "6px" }}>
            <strong>Código de transferencia:</strong> {transaction.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptOperation;
