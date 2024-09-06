export const formatDNI = (dni: string | undefined) => {
  if (!dni) return "N/A"; // Si el DNI es undefined o null, devolvemos "N/A"

  // Remover caracteres no numéricos
  const cleaned = dni.replace(/\D/g, "");

  // Aplicar formato 000-0000000-0
  const match = cleaned.match(/^(\d{3})(\d{7})(\d{1})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return dni; // Retorna el DNI original si no coincide con el formato esperado
};
