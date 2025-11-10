"use client";
import SearchIcon from "@/components/common/Icons/SearchIcon";
import Link from "next/link";
import ArrowIcon from "@/components/common/Icons/ArrowIcon";
import { TransactionType } from "@/types/transaction.types";
import useTransactions from "@/hooks/useTransactions";
import ButtonFilter from "./ButtonFilter";
import { useState } from "react";
import BackIcon from "@/components/common/Icons/BackIcon";

type TransactionsListProps = {
  transactionsList: TransactionType[];
  showActivityPage: boolean;
};

const TransactionsList = ({
  transactionsList,
  showActivityPage,
}: TransactionsListProps) => {
  const {
    searchTerm,
    handleSearchKeyDown,
    handleSearchChange,
    currentPage,
    changePage,
    paginatedTransactions,
    totalPages,
    applyPeriodFilter,
    clearFilters,
  } = useTransactions(transactionsList, showActivityPage);

  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const getWeekday = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  return (
    <>
      <section className="w-full flex items-center gap-5">
        <div className="w-full flex items-center gap-5 p-5 md:px-8 md:gap-8 xl:px-12 bg-white border border-gray1 rounded-[10px] shadow-md">
          <SearchIcon />
          <input
            className="text-dark1 text-base w-full outline-none md:text-[18px]"
            type="text"
            placeholder="Buscar en tu actividad"
            defaultValue={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {showActivityPage && (
          <div className="hidden md:block">
            <ButtonFilter
              onClick={() => setShowFilterPanel((prev) => !prev)}
              showFilterPanel={showFilterPanel}
              onApply={applyPeriodFilter}
              onClear={clearFilters}
              setShowFilterPanel={setShowFilterPanel}
            />
          </div>
        )}
      </section>

      <section className="w-full justify-start items-start p-5 md:py-10 md:px-8 xl:px-12 flex flex-col rounded-[10px] bg-white text-dark1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  ">
        <div className="w-full flex justify-between items-center pb-5  border-b border-button1 md:border-dark1/30 ">
          <h2 className="w-full text-base font-bold">Tu actividad</h2>
          {showActivityPage && (
            <div className="md:hidden">
              <ButtonFilter
                onClick={() => setShowFilterPanel((prev) => !prev)}
                showFilterPanel={showFilterPanel}
                onApply={applyPeriodFilter}
                onClear={clearFilters}
                setShowFilterPanel={setShowFilterPanel}
              />
            </div>
          )}
        </div>

        {paginatedTransactions.length === 0 ? (
          <p className="text-gray-500 mt-4">No hay movimientos en tu cuenta.</p>
        ) : (
          <div className="w-full">
            {paginatedTransactions.map((transaction) => (
              <Link
              href={`/dashboard/activity/detail?id=${transaction.id}`}
                className="w-full flex flex-row justify-between items-start md:items-center border-b border-button1 md:border-dark1/30 py-3 md:py-4 hover:"
                key={transaction.id}
              >
                <div className="flex flex-row gap-2.5 md:gap-4 items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-green rounded-full" />
                  <h4 className="text-sm md:text-base text-dark1">
                    {transaction.description}
                  </h4>
                </div>

                <div className="flex flex-col gap-0  items-end ">
                  <span className="text-sm md:text-[16px] break-words text-dark1">
                    {transaction.amount.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </span>
                  <span className=" text-xs md:text-sm text-dark2 opacity-40 ">
                    {getWeekday(transaction.dated)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!showActivityPage && (
          <Link
            href="/dashboard/activity"
            className=" w-full flex flex-row justify-between mt-7"
          >
            <p className="text-xs md:text-base text-dark1 font-bold">
              Ver toda tu actividad
            </p>
            <ArrowIcon className="fill-black/70 w-4" />
          </Link>
        )}

        {showActivityPage && totalPages > 1 && (
          <>
            {/* Mobile */}
            <div className="w-full flex justify-center gap-4 mt-5 md:hidden">
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="text-dark1 font-bold px-3 py-1 disabled:opacity-50"
              >
                <BackIcon className="w-4 h-4 fill-dark1" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="text-dark1 font-bold px-3 py-1 disabled:opacity-50"
              >
                <ArrowIcon className="w-4 h-4 fill-dark1" />
              </button>
            </div>

            {/*Tablet y Desktop */}
            <div className="w-full justify-center mt-8 gap-5 hidden md:flex">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`text-base text-dark1 font-bold transition-all px-3 py-1.5 ${
                      page === currentPage
                        ? "bg-button1 rounded-[8px]"
                        : "bg-white"
                    }`}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default TransactionsList;
