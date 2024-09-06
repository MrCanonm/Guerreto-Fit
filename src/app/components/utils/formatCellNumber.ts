export const formatPhoneNumber = (phone: string | undefined) => {
  if (!phone) return "N/A"; // Si el teléfono es undefined o null, devolvemos "N/A"

  const cleaned = phone.replace(/\D/g, ""); // Remover caracteres no numéricos
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]})-${match[2]}-${match[3]}`;
  }
  return phone; // Retorna el número original si no coincide con el formato esperado
};
