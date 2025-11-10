"use client";

import EditUserIcon from "@/components/common/Icons/EditUserIcon";
import { UserDataType } from "@/types/user.types";
import { useState } from "react";
import { updateUser } from "@/services/user.service";
import { toast } from "sonner";

type ProfileProps = {
  userData: UserDataType;
  token: string;
};

const Profile = ({ userData, token }: ProfileProps) => {
  const [editableField, setEditableField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    dni: userData.dni,
    phone: userData.phone,
    password: userData.password,
  });

  const handleToggleEdit = (field: string) => {
    if (editableField === field) {
      saveChanges(field);
    } else {
      setEditableField(field);
    }
  };

  const saveChanges = async (field: string) => {
    console.log(field);
    try {
      const payload: Partial<UserDataType> = {
        ...formValues,
      };
      await updateUser(userData.id, payload, token);
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      toast.error("Error al actualizar los datos");
      console.error(error);
    } finally {
      setEditableField(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.key === "Enter") {
      saveChanges(field);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <section className="w-full justify-start items-start px-5 pt-5 pb-8 md:px-8 md:pt-6 xl:px-10 flex flex-col  rounded-[10px] bg-white text-dark1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <h2 className="w-full text-xl font-bold text-dark1 pb-4 md:pb-2 border-b border-dark1/30 md:border-dark1/0">
        Tus datos
      </h2>
      {/* CAMPOS */}
      {[
        { label: "Email", field: "email" },
        { label: "Nombre y Apellido", field: "fullname" },
        { label: "CUIT", field: "dni" },
        { label: "Teléfono", field: "phone" },
        { label: "Contraseña", field: "password" },
      ].map(({ label, field }) => (
        <div
          key={field}
          className="w-full flex flex-col md:flex-row justify-between items-start md:gap-5 md:items-center py-1 xl:py-1.5  border-b border-dark1/30"
        >
          <h3 className="font-medium text-[16px] text-dark1 w-full flex md:flex-row md:w-2/6 xl:w-1/5">
            {label}
          </h3>

          <div className="w-full md:w-2/3 flex justify-between items-center">
            {editableField === field ? (
              <input
                type={field === "password" ? "password" : "text"}
                value={
                  field === "fullname"
                    ? `${formValues.firstname} ${formValues.lastname}`
                    : formValues[field as keyof typeof formValues] || ""
                }
                onChange={(e) => {
                  if (field === "fullname") {
                    const [first, ...rest] = e.target.value.split(" ");
                    const last = rest.join(" ");
                    setFormValues((prev) => ({
                      ...prev,
                      firstname: first,
                      lastname: last,
                    }));
                  } else {
                    handleChange(e, field);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className="text-base text-black w-full outline-none"
                autoFocus
              />
            ) : (
              <span className="text-black/40 w-full ">
                {field === "fullname"
                  ? `${formValues.firstname} ${formValues.lastname}`
                  : field === "password"
                  ? "********"
                  : formValues[field as keyof typeof formValues]}
              </span>
            )}

            {/* Icon */}
            {field !== "email" && field !== "dni" && (
              <div className="w-5.5 h-5.5  items-center ml-3">
                <EditUserIcon
                  onClick={() => handleToggleEdit(field)}
                  className={`cursor-pointer items-center ${
                    editableField === field ? "fill-green" : "fill-button1"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Profile;
