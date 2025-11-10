export function formatDated(fecha: string | Date): string {
    const date = new Date(fecha);
  
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    const fechaHora = date.toLocaleString('es-AR', opciones);
  
    // Reemplaza la coma por " a" y agrega "hs" al final
    return fechaHora.replace(',', ' a las') + ' hs.';
  }