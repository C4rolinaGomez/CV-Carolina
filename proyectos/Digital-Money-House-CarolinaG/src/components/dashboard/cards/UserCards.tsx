"use client";
import InputRadio from "@/components/common/form/InputRadio";
import { deleteCardId } from "@/services/cards.service";
import { CardType } from "@/types/card.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSelectCard } from "@/context/moneyContext";
import CustomToaster from "@/components/common/CustomToaster";

type CardsListProps = {
  cardsList: CardType[];
  accountId: number;
  showAddMoneyPage?: boolean;
  token: string;
};
const UserCards = ({
  cardsList,
  accountId,
  showAddMoneyPage,
  token,
}: CardsListProps) => {
  const [cards, setCards] = useState(cardsList);
  const { cardId, setCardId } = useSelectCard();
  const router = useRouter();

  const handleSelectCard = (card: CardType) => {
    setCardId(card.id);
    toast.success(
      `Se selecciono la tarjeta terminada en: ${card.number_id
        .toString()
        .slice(-4)}`
    );
  };

  const handleDeleteCard = async (card_id: number) => {
    try {
      console.log("Intentando eliminar tarjeta con ID:", card_id);
      await deleteCardId(accountId, card_id, token);

      // Filtramos la tarjeta eliminada del estado
      setCards((prevCards) => prevCards.filter((card) => card.id !== card_id));
      router.refresh();
      toast.success("Tarjeta eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
      toast.error("Error al eliminar la tarjeta");
    }
  };

  return (
    <section className="w-full justify-start items-start p-6 md:py-10 md:px-8 flex flex-col rounded-[10px] bg-white text-dark1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  xl:px-12">
      <h2 className="w-full text-base md:text-lg font-bold border-b border-dark1/30 md:border-dark1 pb-3 md:pb-4">
        Tus tarjetas
      </h2>
      {cards.length === 0 ? (
        <p className="text-gray-500 mt-4">No tienes tarjetas asociadas.</p>
      ) : (
        <>
      <CustomToaster />

          <ul className="w-full">
            {cards.map((card) => (
              <li
                className="w-full flex flex-row justify-between items-center border-b border-dark1/30 md:border-dark1 py-4"
                key={card.id}
              >
                <div className="flex flex-row gap-3 md:gap-4 items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-green rounded-full" />
                  <h4 className="text-sm md:text-base text-dark1">
                    {" "}
                    Terminada en {card.number_id.toString().slice(-4)}{" "}
                  </h4>
                </div>

                {!showAddMoneyPage && (
                  <div className="flex flex-col gap-0  items-end text-dark1">
                    <button
                      onClick={() => {
                        toast.custom(
                          (t) => (
                            <div className="w-[300px] flex flex-col gap-1 md:gap-2 bg-white text-dark1">
                              <p className="font-bold text-sm md:text-lg ">¿Estás seguro?</p>
                              <p className="text-xs md:text-base font-semibold">
                                Vas a eliminar la tarjeta terminada en{" "}
                                {card.number_id.toString().slice(-4)}
                              </p>
                              <div className="flex items-center gap-2 mt-2 ">
                                <button
                                  className="text-xs md:text-sm px-3 py-1 font-semibold rounded-md bg-gray1 border border-dark1 text-dark1 hover:font-bold"
                                  onClick={() => toast.dismiss(t)}
                                >
                                  Cancelar
                                </button>
                                <button
                                  className="text-xs md:text-sm px-3 py-1 font-semibold rounded-md bg-green border border-dark1 text-dark1 hover:font-bold"
                                  onClick={async () => {
                                    toast.dismiss(t);
                                    await handleDeleteCard(card.id);
                                  }}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ),
                          { duration: Infinity, className:"" }
                         
                        );
                      }}
                    >
                      <span className="text-[12px] font-bold md:text-base">
                        Eliminar
                      </span>
                    </button>
                  </div>
                )}

                {showAddMoneyPage && (
                  <InputRadio
                    type="radio"
                    name="card_id"
                    value={card.id.toString()}
                    checked={cardId === card.id}
                    onChange={() => handleSelectCard(card)}
                    inputClassName=""
                    wrappedClassName="flex items-center relative"
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default UserCards;
