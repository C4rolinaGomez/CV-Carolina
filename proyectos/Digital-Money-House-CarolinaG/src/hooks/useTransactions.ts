"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TransactionType } from "@/types/transaction.types";

const ITEMS_PER_PAGE = 10;

const useTransactions = (
  allTransactions: TransactionType[],
  showActivityPage: boolean
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState<string>(""); 
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionType[]
  >([]);

  const isWithinPeriod = (dateString: string, periodValue: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    const oneDay = 86400000;

    switch (periodValue) {
      case "today":
        return date.toDateString() === today.toDateString();
      case "yesterday":
        const yesterday = new Date(today.getTime() - oneDay);
        return date.toDateString() === yesterday.toDateString();
      case "week":
        return date > new Date(today.getTime() - 7 * oneDay);
      case "15days":
        return date > new Date(today.getTime() - 15 * oneDay);
      case "month":
        return date > new Date(today.getTime() - 30 * oneDay);
      case "year":
        return date > new Date(today.getTime() - 365 * oneDay);
      default:
        return true;
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setSearchTerm(searchQuery);

    let result = allTransactions;

    if (showActivityPage) {
      result = allTransactions.filter((t) =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (period) {
        result = result.filter((t) => isWithinPeriod(t.dated, period));
      }
    }

    setFilteredTransactions(result);
    setCurrentPage(1); // volver a la página 1 al aplicar filtro
  }, [searchParams, allTransactions, showActivityPage, period]);

  // Calcular páginas
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  

  // Handlers para búsqueda
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reinicia la paginación en búsquedas en tiempo real

    if (showActivityPage) {
      router.push(`/dashboard/activity?search=${value}`);
    }
  };

  
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      redirectToActivityPage();
    }
  };

  const redirectToActivityPage = () => {
    if (searchTerm.trim().length > 0) {
      router.push(`/dashboard/activity?search=${searchTerm}`);
    }
  };

  const applyPeriodFilter = (value: string) => {
    setPeriod(value);
  };

  const clearFilters = () => {
    setPeriod("");
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearchKeyDown,
    handleSearchChange,
    currentPage,
    changePage,
    paginatedTransactions,
    totalPages,
    applyPeriodFilter,
    clearFilters,
    period,
  };
};

export default useTransactions;
