export const convertDateFormat = (dateExpiry: string): string => {
    const [month, year] = dateExpiry.split("/");
    const fullYear = year.length === 2 ? `20${year}` : year; // Agregar '20' si el año es de 2 dígitos
    return `${month}/${fullYear}`;
  };