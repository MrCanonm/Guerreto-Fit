import { pdf } from "@react-pdf/renderer";
import { MembershipReceiptPDF } from "../Customer/GenerateReceiptPDF";
import { Customer } from "../Customer/customerInterfaces";

export const generatePDF = async (data: Customer) => {
  // Función para eliminar espacios y poner el texto en minúsculas
  const formatName = (str: string) => str.toLowerCase().replace(/\s+/g, "_");

  // Aplicamos la transformación al nombre y apellido
  const formattedName = formatName(data.name);
  const formattedSureName = formatName(data.sureName);

  const pdfBlob = await pdf(
    <MembershipReceiptPDF customerData={data} />
  ).toBlob();

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");

  // Creamos el nombre del archivo con los nombres formateados
  link.href = url;
  link.download = `recibo_${formattedName}_${formattedSureName}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
